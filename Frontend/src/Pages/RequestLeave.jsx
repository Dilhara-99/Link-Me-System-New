import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import Details from "../Components/Details";
import BackButton from "../Components/BackButton";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

export default function RequestLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [coveringPerson, setCoveringPerson] = useState("");
  const [remainingLeaveBalance, setRemainingLeaveBalance] = useState(0);

  useEffect(() => {
    // Calculate remaining leave balance after leave request
    setRemainingLeaveBalance(leaveBalance - parseFloat(numberOfDays));
  }, [leaveBalance, numberOfDays]);

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);

    if (event.target.value === "annual") {
      setLeaveBalance(14);
    } else if (event.target.value === "casual") {
      setLeaveBalance(7);
    } else {
      setLeaveBalance(0);
    }
    setRemainingLeaveBalance(leaveBalance);
    if (numberOfDays > leaveBalance) {
      setNumberOfDays("");
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
    const selectedNumberOfDays = event.target.value;

    // Update number of days if it doesn't exceed the leave balance
    if (selectedNumberOfDays <= leaveBalance) {
      setNumberOfDays(selectedNumberOfDays);
    }
  };

  const handleCoveringPersonChange = (event) => {
    setCoveringPerson(event.target.value);
  };

  const handleCancel = () => {
    setLeaveType("");
    setLeaveBalance(0);
    setFromDate("");
    setToDate("");
    setNumberOfDays("");
    setCoveringPerson("");
  };

  const handleSubmit = () => {
    if (
      !leaveType ||
      !fromDate ||
      !toDate ||
      !numberOfDays ||
      !coveringPerson
    ) {
      toast.error("Please fill in all the required fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Calculate the updated leave balance
    const updatedLeaveBalance = leaveBalance - parseFloat(numberOfDays);
    console.log("Updated Leave Balance:", updatedLeaveBalance);

    // Check if the remaining leave balance is valid (not negative)
    if (updatedLeaveBalance < 0) {
      toast.error("Insufficient leave balance for this request", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    const decodedToken = jwt_decode(accessToken);
    const userId = decodedToken.id;

    const requestBody = {
      leaveType: leaveType,
      leaveBalance: updatedLeaveBalance,
      fromDate: fromDate,
      toDate: toDate,
      numberOfDays: numberOfDays,
      coveringPerson: coveringPerson,
    };
    const data = {
      ...requestBody,
      UserId: userId,
    };
    console.log(data);
    Axios.post("http://localhost:3001/leave", data, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        setLeaveBalance(updatedLeaveBalance);
        handleCancel();
        toast.success("Leave Request Submitted Successfully", {
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
        toast.error("You already have been submitted.", {
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
  };

  const today = new Date().toISOString().split("T")[0]; // Get the current date

  return (
    <div style={{backgroundColor:'#f7f7f5'}}>
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
        <Details />
      </div>
      <div
        style={{
          marginTop:'15px',
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
            <p>Leave Balance: {remainingLeaveBalance}</p>
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
                max={leaveBalance}
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
                <option value="Mr.A">Mr.A</option>
                <option value="Mr.B">Mr.B</option>
                <option value="Mr.C">Mr.C</option>
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
