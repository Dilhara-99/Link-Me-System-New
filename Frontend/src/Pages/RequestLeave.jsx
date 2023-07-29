import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [coveringPerson, setCoveringPerson] = useState("");
  const [leaveBalance, setLeaveBalance] = useState("");
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [epf, setEPF] = useState("");
  const [managersAndSupervisors, setManagersAndSupervisors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/user-details", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setNameWithInitials(response.data.nameWithInitials);
        setEPF(response.data.epf);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/list-of-staff", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setManagersAndSupervisors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching managers and supervisors:", error);
      });
  }, []);

  const handleCoveringPersonChange = (event) => {
    setCoveringPerson(event.target.value);
  };

  const handleLeaveTypeChange = (event) => {
    event.persist();
    
    setLeaveType(event.target.value);
  
    if (event.target.value === "annual" || event.target.value === "casual") {
      axios
        .get(`http://localhost:3001/leaveBalance/balance/${epf}`, {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          const { annualBalance, casualBalance } = response.data;
          if (event.target.value === "annual") {
            setLeaveBalance(annualBalance);
            // Automatically set the number of days to the leave balance for annual leave
            setNumberOfDays(annualBalance);
          } else if (event.target.value === "casual") {
            setLeaveBalance(casualBalance);
            // Automatically set the number of days to the leave balance for casual leave
            setNumberOfDays(casualBalance);
          }
        })
        .catch((error) => {
          console.error("Error fetching leave balance:", error);
        });
    } else {
      setLeaveBalance("");
      setNumberOfDays(""); // Reset the number of days if the leave type is not annual or casual
    }
  };

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);

    if (selectedFromDate > toDate) {
      setToDate("");
      setNumberOfDays("");
    }
  };

  const handleToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setToDate(selectedToDate);

    if (selectedToDate < fromDate) {
      setNumberOfDays("");
    }
  };

  const handleNumberOfDaysChange = (event) => {
    const selectedNumberOfDays = parseFloat(event.target.value);
  
    // Limit the number of days to the leave balance
    if (selectedNumberOfDays > leaveBalance) {
      setNumberOfDays(leaveBalance);
    } else if (selectedNumberOfDays < 0.5) {
      setNumberOfDays(0.5);
    } else {
      // Round the selectedNumberOfDays to the nearest multiple of 0.5
      const roundedValue = Math.round(selectedNumberOfDays * 2) / 2;
      setNumberOfDays(roundedValue);
    }
  };

  const handleCancel = () => {
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setNumberOfDays("");
    setCoveringPerson("");
  };

  const handleSubmit = () => {
    if (
      (leaveType === "annual" && leaveBalance < numberOfDays) ||
      (leaveType === "casual" && leaveBalance < numberOfDays)
    ) {
      toast.error("Sorry. You do not have enough leave balance.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const diffInTime = toDateObj.getTime() - fromDateObj.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24) + 1;
  
    if (numberOfDays > diffInDays) {
      toast.error("Please enter valid number of date.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    const leaveData = {
      leaveType: leaveType,
      fromDate: fromDate,
      toDate: toDate,
      numberOfDays: numberOfDays,
      coveringPerson: coveringPerson,
      epf: epf,
      status:"Pending",
    };
  
    axios
      .post("http://localhost:3001/leave", leaveData, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        toast.success("You successfully requested a leave.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error submitting leave request:", error);
        toast.error("You already requested leave on this day.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  
    const leaveBalanceData = {
      leaveType: leaveType,
      numberOfDays: numberOfDays,
    };
  
    axios
      .put(
        `http://localhost:3001/leaveBalance/update-balance/${epf}`,
        leaveBalanceData,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating leave balance:", error);
      });
  };
  

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ backgroundColor: "#f7f7f5" }}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Navibar />
      </div>
      <br />
      <div
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "98%",
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        <h1
          style={{
            fontFamily: "serif",
            paddingTop: "15px",
            paddingBottom: "15px",
            textAlign: "center",
          }}
        >
          Request Leave
        </h1>
      </div>
      <br />
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <div className="sub-header" style={{ fontSize: "20px" }}>
          <div className="row">
            <h5
              className="Row"
              style={{
                paddingLeft: "250px",
                paddingTop: "10px",
                fontFamily: "serif",
              }}
            >
              Name :&nbsp;&nbsp;{nameWithInitials}
            </h5>
            <h5
              className="Row"
              style={{
                paddingLeft: "250px",
                paddingTop: "10px",
                paddingBottom: "20px",
                fontFamily: "serif",
              }}
            >
              EPF&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;{epf}
            </h5>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          marginLeft: "18%",
          marginRight: "18%",
          padding: "10px 40px 50px 40px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ padding: "20px 60px 20px 0", margin: "0 100px 0 130px" }}>
          <div style={{ paddingLeft: "220px" }}>
            <Form.Check
              inline
              label="Annual"
              type="radio"
              id="annual"
              checked={leaveType === "annual"}
              value="annual"
              onChange={handleLeaveTypeChange}
            />
            <Form.Check
              inline
              label="Casual"
              type="radio"
              id="casual"
              checked={leaveType === "casual"}
              value="casual"
              onChange={handleLeaveTypeChange}
            />
          </div>
          <div style={{ padding: "8px" }}></div>
          <div style={{ paddingLeft: "200px" }}>
            <p>Leave Balance: {leaveBalance}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Row>
              <Col style={{ padding: "0 150px 0 50px" }}>
                <Form.Group>
                  <Form.Label>From:</Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    min={leaveType === "casual" ? "" : today} // Disable future dates for casual leave
                    max={toDate}
                    onChange={handleFromDateChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>To:</Form.Label>
                  <Form.Control
                    type="date"
                    value={toDate}
                    min={fromDate || today}
                    onChange={handleToDateChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <br />
          <div>
            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Number of Days:</Form.Label>
              <Form.Control
                type="number"
                value={numberOfDays}
                onChange={handleNumberOfDaysChange}
                min={0.5}
                step={0.5}
              />
            </Form.Group>
          </div>
          <br />
          <div>
            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Covering Person:</Form.Label>
              <Form.Control
                as="select"
                value={coveringPerson}
                onChange={handleCoveringPersonChange}
              >
                <option value="">-- Select --</option>
                {managersAndSupervisors.map((person) => (
                  <option key={person.epf} value={person.nameWithInitials}>
                    {person.nameWithInitials}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <br />
          <br />
          <div>
            <center>
              <table>
                <tr>
                  <td>
                    <Button
                      variant="primary"
                      style={{ width: "150%" }}
                      onClick={handleSubmit}
                      disabled={
                        (leaveType === "annual" &&
                          leaveBalance < numberOfDays) ||
                        (leaveType === "casual" &&
                          leaveBalance < numberOfDays) ||
                        leaveBalance === 0
                      }
                    >
                      Submit
                    </Button>
                  </td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>
                    <Button
                      variant="secondary"
                      style={{ width: "150%" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              </table>
            </center>
          </div>
        </div>
      </div>
      <div style={{ marginRight: "200px", padding: "30px 0 30px 0" }}>
        <BackButton />
      </div>
    </div>
  );
}
