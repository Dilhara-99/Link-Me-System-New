import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Table, Form, Col, FormControl } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";

export default function ManageAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
 
  const [editedInTime, setEditedInTime] = useState({});
  const [editedOutTime, setEditedOutTime] = useState({});
  const [searchedEPFNumber, setSearchedEPFNumber] = useState("");
  const [suggestedEPFNumbers, setSuggestedEPFNumbers] = useState([]);


  const handleInTimeChange = (event, entry) => {
    const { value } = event.target;
    setEditedInTime((prevEditedInTime) => ({
      ...prevEditedInTime,
      [entry.id]: value,
    }));
  };

 
  const handleOutTimeChange = (event, entry) => {
    const { value } = event.target;
    setEditedOutTime((prevEditedOutTime) => ({
      ...prevEditedOutTime,
      [entry.id]: value,
    }));
  };

 
  const handleSave = () => {
    
    console.log("Edited inTime:", editedInTime);
    console.log("Edited outTime:", editedOutTime);
  };
  const fetchSuggestedEPFNumbers = () => {
    
    axios
      .get(`http://localhost:3001/addDetails/suggested-epf-numbers`, {
        params: {
          input: searchedEPFNumber,
        },
      })
      .then((response) => {
      
        console.log("Suggested EPF numbers:", response.data);

     
        setSuggestedEPFNumbers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggested EPF numbers:", error);
     
      });
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
          Manage Attendance
        </h1>
      </div>
      <br />
      <div
        style={{
          backgroundColor: "#f7f7f5",
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
          <Form style={{ display: "flex" }}>
            <Form.Group controlId="searchForm" style={{ paddingRight: "50px" }}>
              <Form.Control
                type="text"
                placeholder="Enter EPF"
                value={searchedEPFNumber}
                onChange={(event) => {
                  setSearchedEPFNumber(event.target.value);
                  fetchSuggestedEPFNumbers(); // Fetch suggested EPF numbers on input change
                }}
                list="suggestedEPFNumbersList" // Associate with the datalist
              />
              <datalist id="suggestedEPFNumbersList">
                {suggestedEPFNumbers.map((item) => (
                  <option
                    key={item.epf}
                    value={`${item.epf}`}
                  />
                ))}
              </datalist>
            </Form.Group>
            <Form.Group controlId="" style={{ paddingRight: "60px" }}>
              <Form.Control type="date" name="" style={{ width: "160px" }} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </div>
      </div>
      <br />
      <br />
      <div
        style={{
          backgroundColor: "#f7f7f5",
          marginLeft: "200px",
          marginRight: "200px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px 0 10px 0",
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
                backgroundColor: "#f7f7f5",
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
                            value={editedInTime[entry.id] || entry.inTime}
                            onChange={(event) =>
                              handleInTimeChange(event, entry)
                            }
                            style={{ width: "50%" }}
                          />
                        </td>
                        <td style={{ paddingLeft: "160px" }}>
                          <FormControl
                            type="time"
                            value={editedOutTime[entry.id] || entry.outTime}
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
            <div style={{ paddingLeft: "220px", width: "100%" }}>
              <Button
                variant="success"
                style={{ width: "20%" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
            <div style={{ paddingRight: "50px", width: "120%" }}>
              <BackButton />
            </div>
          </div>
        </Col>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
