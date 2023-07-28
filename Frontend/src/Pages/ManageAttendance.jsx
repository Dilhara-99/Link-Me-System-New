import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Table, Form, Col, FormControl } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";

export default function ManageAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editedInTime, setEditedInTime] = useState({});
  const [editedOutTime, setEditedOutTime] = useState({});
  const [epf, setEpf] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleInTimeChange = (event, entry) => {
    const { value } = event.target;
    setEditedInTime((prevEditedInTime) => ({
      ...prevEditedInTime,
      [entry.attendanceId]: value,
    }));
  };

  const handleOutTimeChange = (event, entry) => {
    const { value } = event.target;
    setEditedOutTime((prevEditedOutTime) => ({
      ...prevEditedOutTime,
      [entry.attendanceId]: value,
    }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/attendance/attendance-details-to-manage/${epf}/${selectedDate}`
      );
      setAttendanceData([response.data]);
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Loop through each attendance entry and update inTime and outTime
      for (const entry of attendanceData) {
        const { attendanceId, inTime, outTime } = entry;
console.log(inTime);
console.log(outTime);
        // Make a PUT request to update inTime and outTime for each entry
        await axios.put(`http://localhost:3001/attendance/update/${attendanceId}`, {
          inTime: editedInTime[attendanceId] || inTime,
          outTime: editedOutTime[attendanceId] || outTime,
        });
      }

      // After updating all entries, show a success message
      alert("Attendance details saved successfully!");
    } catch (error) {
      console.error("Error saving attendance details:", error);
      alert("Error saving attendance details.");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f7f7f5", paddingBottom: "300px" }}>
        <Navibar />
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
            Manage Attendance
          </h1>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "300px",
            marginRight: "300px",
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
            <Form style={{ display: "flex" }} onSubmit={handleSearch}>
              <Form.Group
                controlId="searchForm"
                style={{ paddingRight: "50px" }}
              >
                <Form.Control
                  type="text"
                  name="epf"
                  placeholder="Enter EPF"
                  value={epf}
                  onChange={(e) => setEpf(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="" style={{ paddingRight: "60px" }}>
                <Form.Control
                  type="date"
                  name="date"
                  style={{ width: "160px" }}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </div>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "250px",
            marginRight: "250px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "30px 50px 10px 50px",
          }}
        >
          <Col md="12">
            {attendanceData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "#b6b8b2" }}>No attendance details found.</p>
              </div>
            ) : (
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
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>In time</th>
                        <th style={{ textAlign: "center" }}>Out time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((entry) => (
                        <tr key={entry.id}>
                          <td style={{ textAlign: "center" }}>{entry.date}</td>
                          <td style={{ paddingLeft: "160px" }}>
                            <FormControl
                              type="time"
                              value={editedInTime[entry.attendanceId] || entry.inTime}
                              onChange={(event) =>
                                handleInTimeChange(event, entry)
                              }
                              style={{ width: "50%" }}
                            />
                          </td>
                          <td style={{ paddingLeft: "160px" }}>
                            <FormControl
                              type="time"
                              value={editedOutTime[entry.attendanceId] || entry.outTime}
                              onChange={(event) =>
                                handleOutTimeChange(event, entry)
                              }
                              style={{ width: "50%" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
            <div
              style={{
                display: "flex",
                paddingTop: "30px",
                paddingBottom: "20px",
              }}
            >
              <div style={{ paddingLeft: "150px", width: "190%" }}>
                <Button
                  variant="success"
                  style={{ width: "20%" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
              <div style={{ paddingRight: "1px", width: "240%" }}>
                <BackButton />
              </div>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}
