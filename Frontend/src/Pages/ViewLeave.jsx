import React from "react";
import Navibar from "../Components/Navibar";
import { Button, Form, Tabs, Tab, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";

export default function ViewLeave() {
  const [listOfLeaves, setListOfLeaves] = useState([]);
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [epf, setEPF] = useState("");

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
  }, [epf]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/leave/list/all/${epf}`)
      .then((response) => {
        setListOfLeaves(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [epf]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f2ee11";
      case "Approved":
        return "#13eb5b";
      case "Rejected":
        return "#f0372e";
      default:
        return "";
    }
  };

  const getCurrentYearLeaves = () => {
    const currentYear = new Date().getFullYear();
    return listOfLeaves.filter(
      (leave) => new Date(leave.fromDate).getFullYear() === currentYear
    );
  };

  return (
    <div>
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
          View Leaves
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
      <div style={{ marginTop: "40px" }}>
        {listOfLeaves.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: "#b6b8b2" }}>No Leaves.</p>
          </div>
        ) : (
          <center>
            <Table striped bordered hover style={{ width: "90%" }}>
              <thead>
                <tr>
                  <th style={{ width: "120px", textAlign: "center" }}>
                    Leave Type
                  </th>
                  <th style={{ width: "140px", textAlign: "center" }}>
                    Start Date
                  </th>
                  <th style={{ width: "140px", textAlign: "center" }}>
                    End Date
                  </th>
                  <th style={{ width: "10px", textAlign: "center" }}>
                    # Dates
                  </th>
                  <th style={{ width: "40px", textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              {getCurrentYearLeaves().map((employee) => (
                <tbody>
                  <tr key={employee.leaveId}>
                    <td style={{ width: "120px", textAlign: "center" }}>
                      {employee.leaveType}
                    </td>
                    <td style={{ width: "140px", textAlign: "center" }}>
                      {employee.fromDate}
                    </td>
                    <td style={{ width: "140px", textAlign: "center" }}>
                      {employee.toDate}
                    </td>
                    <td style={{ width: "30px", textAlign: "center" }}>
                      {employee.numberOfDays}
                    </td>
                    <td
                      style={{
                        width: "40px",
                        textAlign: "center",
                        backgroundColor: getStatusColor(employee.status),
                      }}
                    >
                      {employee.status}
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </center>
        )}
      </div>
      <div  style={{marginTop:'90px'}}>
        <BackButton />
      </div>
    </div>
  );
}
