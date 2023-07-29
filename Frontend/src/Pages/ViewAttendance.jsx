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
import BackButton from "../Components/BackButton";

function ViewAttendance() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [epf, setEPF] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { addendanceId } = useParams();

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
  }, [epf, fromDate, toDate]);

  const handleSearch = () => {
    // Call the backend API with the selected dates
    axios
      .get(`http://localhost:3001/attendance/attendance-details/${epf}`, {
        params: {
          fromDate,
          toDate,
        },
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance details:", error);
      });
  };

  return (
    <div className="fluid" style={{ backgroundColor: "#f7f7f5" }}>
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
          backgroundColor: "white",
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
      <br />
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <div>
          <br />
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
      </div>
      <br />
      <div
        className=""
        style={{
          marginTop: "10px",
          marginLeft: "15%",
          marginRight: "15%",
          padding: "20px 40px 30px 40px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row>
          <Col style={{ padding: "30px 100px 30px 50px" }}>
            <Form.Group style={{ display: "flex" }}>
              <Form.Label>From:&nbsp;</Form.Label>
              <Form.Control
                style={{ paddingTop: "0" }}
                type="date"
                value={fromDate}
                max={maxDate}
                onChange={handleFromDateChange}
              />
            </Form.Group>
          </Col>
          <Col style={{ padding: "30px 0 0 0" }}>
            <Form.Group style={{ display: "flex" }}>
              <Form.Label>To:&nbsp;</Form.Label>
              <Form.Control
                style={{ paddingTop: "0" }}
                type="date"
                value={toDate}
                max={maxDate}
                onChange={handleToDateChange}
              />
            </Form.Group>
          </Col>
          <Col style={{ padding: "30px 0 0 40px" }}>
            {/* Call the handleSearch function on button click */}
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {(searchResults.length > 0 ? searchResults : attendanceData)
              .length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "#b6b8b2" }}>No attendance details found.</p>
              </div>
            ) : (
              <Card
                className="card-plain table-plain-bg"
                style={{ backgroundColor: "white" }}
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
                      {(searchResults.length > 0
                        ? searchResults
                        : attendanceData
                      ).map((entry) => (
                        <tr key={entry.epf}>
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
