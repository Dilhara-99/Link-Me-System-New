import React, { useState, useEffect } from "react";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Details from "../Components/Details";
import BackButton from "../Components/BackButton";

function ViewAttendance() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const { id } = useParams();

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);

    if (selectedFromDate < toDate) {
      setToDate("");
    }
  };

  const handleToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setToDate(selectedToDate);
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = toDate || today;

  useEffect(() => {
    axios
      .get("http://localhost:3001/attendance/attendance-details", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance details:", error);
      });
  }, []);

  return (
    <div className="fluid">
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
          View Attendance
        </h1>
      </div>
      <div
        className=""
        style={{
          border: "2px",
          borderColor: "#007D34",
          borderStyle: "solid",
          marginTop: "5%",
          marginLeft: "15%",
          marginRight: "15%",
          padding: "0 40px 50px 40px",
          backgroundColor: "#e6faf3",
        }}
      >
        <Row>
          <div>
            <Details />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Row>
              <Col style={{ padding: "30px 100px 30px 50px" }}>
                <Form.Group>
                  <Form.Label>From:</Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    max={maxDate}
                    onChange={handleFromDateChange}
                  />
                </Form.Group>
              </Col>
              <Col style={{ padding: "30px 0 0 0" }}>
                <Form.Group>
                  <Form.Label>To:</Form.Label>
                  <Form.Control
                    type="date"
                    value={toDate}
                    max={maxDate}
                    onChange={handleToDateChange}
                  />
                </Form.Group>
              </Col>
              <Col style={{ padding: "63px 0 0 40px" }}>
                <Button variant="primary">Search</Button>
              </Col>
            </Row>
          </div>
          <Col md="12">
            {attendanceData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{color:'#b6b8b2'}}>No attendance details found.</p>
              </div>
            ) : (
              <Card
                className="card-plain table-plain-bg"
                style={{ backgroundColor: "#e6faf3" }}
              >
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>In time</th>
                        <th style={{ textAlign: "center" }}>Out time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((entry) => (
                        <tr key={entry.id}>
                          <td style={{ textAlign: "center" }}>{entry.date}</td>
                          <td style={{ textAlign: "center" }}>
                            {entry.inTime}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {entry.outTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <div style={{ marginLeft: "250px", padding: "50px" }}>
        <BackButton />
      </div>
    </div>
  );
}

export default ViewAttendance;
