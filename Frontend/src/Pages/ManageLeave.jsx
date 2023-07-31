import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Table, Form, Col, FormControl } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageLeave() {
  const [epf, setEpf] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [updatedAnnualBalance, setUpdatedAnnualBalance] = useState(null);
  const [updatedCasualBalance, setUpdatedCasualBalance] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/leaveBalance/leavebalance/${epf}`
      );
      const leaveBalanceData = response.data;
      setLeaveBalance(leaveBalanceData);
    } catch (error) {
      console.error("Error fetching leave balance details:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (
        updatedAnnualBalance < 0 ||
        updatedAnnualBalance > 14 ||
        updatedCasualBalance < 0 ||
        updatedCasualBalance > 7
      ) {
        toast.error("Please check leave balance within valis range.", {
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
      await axios
        .put(`http://localhost:3001/leaveBalance/updateLeaveBalance/${epf}`, {
          annualBalance: updatedAnnualBalance,
          casualBalance: updatedCasualBalance,
        })
        .then((response) => {
          console.log("Leave balances updated successfully!");
          setLeaveBalance({
            ...leaveBalance,
            annualBalance: updatedAnnualBalance,
            casualBalance: updatedCasualBalance,
          });
          toast.success("Successfully update leave details", {
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
          console.error("Error updating leave balances:", error);
          toast.error("Error updating leave details", {
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
    } catch (error) {
      console.error("Error updating leave balances:", error);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navibar />
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
          Manage Leave
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "white",
          marginLeft: "300px",
          marginRight: "600px",
          marginTop: "50px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px 0 10px 0",
        }}
      >
        <div
          style={{
            marginLeft: "100px",
            marginRight: "200px",
            padding: "20px 0 20px 0",
          }}
        >
          <Form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <Form.Group controlId="searchForm" style={{ paddingRight: "50px" }}>
              <Form.Control
                type="text"
                name="epf"
                value={epf}
                onChange={(e) => setEpf(e.target.value)}
                placeholder="Enter EPF"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </div>
      </div>
      {leaveBalance && (
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "45px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h5 style={{ textAlign: "center" }}>Leave Balance</h5>
          <div>
            <Card
              className="card-plain table-plain-bg"
              style={{
                backgroundColor: "white",
                paddingRight: "25px",
                paddingLeft: "25px",
              }}
            >
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center", width: "40px" }}>
                        EPF
                      </th>
                      <th style={{ textAlign: "center", width: "20px" }}>
                        Annual Balance
                      </th>
                      <th style={{ textAlign: "center", width: "20px" }}>
                        Casual Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center", width: "40px" }}>
                        {leaveBalance.epf}
                      </td>
                      <td style={{ textAlign: "center", width: "20px" }}>
                        <FormControl
                          type="number"
                          value={
                            updatedAnnualBalance !== null
                              ? updatedAnnualBalance
                              : leaveBalance.annualBalance
                          }
                          onChange={(e) =>
                            setUpdatedAnnualBalance(e.target.value)
                          }
                        />
                      </td>
                        <td style={{ textAlign: "center", width: "20px" }}>
                          <FormControl
                            type="number"
                            value={
                              updatedCasualBalance !== null
                                ? updatedCasualBalance
                                : leaveBalance.casualBalance
                            }
                            onChange={(e) =>
                              setUpdatedCasualBalance(e.target.value)
                            }
                          />
                        </td>
                      
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        <Button variant="success" onClick={handleUpdate}>
                          Update
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
