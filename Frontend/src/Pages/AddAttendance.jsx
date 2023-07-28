import React, { useState } from "react";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

function AddAttendance() {
  const [attendanceData, setAttendanceData] = useState({
    epf: "",
    date: "",
    inTime: "",
    outTime: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setAttendanceData("");

    axios
      .post("http://localhost:3001/attendance", attendanceData)
      .then((response) => {
        console.log("Attendance added successfully!");
        // Handle any further actions or notifications
      })
      .catch((error) => {
        console.error("Error adding attendance:", error);
        // Handle error case
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttendanceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navibar />
      <div>
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
            Add Attendance
          </h1>
        </div>
        <div className="abc" style={{ paddingTop: "30px" }}>
          <div style={{ paddingTop: "50px" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 d-flex justify-content-center align-items-center"
                controlId="usernameControl"
              >
                <Form.Label style={{ paddingRight: "15px" }}>
                  EPF :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="epf"
                  style={{ width: "200px" }}
                  required
                  value={attendanceData.epf}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-center align-items-center"
                controlId="dateControl"
              >
                <Form.Label style={{ paddingRight: "15px" }}>Date :</Form.Label>
                <DatePicker
                  name="date"
                  dateFormat="yyyy-MM-dd"
                  required
                  className="form-control"
                  style={{ width: "200px" }}
                  selected={attendanceData.date}
                  onChange={(date) =>
                    setAttendanceData((prevState) => ({ ...prevState, date }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-center align-items-center"
                controlId="inTimeControl"
              >
                <Form.Label style={{ paddingRight: "10px" }}>
                  In Time :
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <TimePicker
                    name="inTime"
                    className="form-control"
                    style={{ width: "100%" }}
                    value={attendanceData.inTime}
                    onChange={(inTime) =>
                      setAttendanceData((prevState) => ({
                        ...prevState,
                        inTime,
                      }))
                    }
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-center align-items-center"
                controlId="outTimeControl"
              >
                <Form.Label style={{ paddingRight: "10px" }}>
                  Out Time :
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <TimePicker
                    name="outTime"
                    className="form-control"
                    style={{ width: "100%" }}
                    value={attendanceData.outTime}
                    onChange={(outTime) =>
                      setAttendanceData((prevState) => ({
                        ...prevState,
                        outTime,
                      }))
                    }
                  />
                </div>
              </Form.Group>
              <div style={{ paddingLeft: "750px" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: "10%" }}
                >
                  Add
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttendance;
