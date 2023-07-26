import React, { useState } from "react";
import Navibar from "../Components/Navibar";
import { Card, Form, Row, Col, Table, Button, Modal } from "react-bootstrap";

export default function RequestOT() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [fromDateTime, setFromDateTime] = useState(null);
  const [toDateTime, setToDateTime] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Function to handle the radio button change event
  const handleRadioChange = (e) => {
    if (e.target.value === "department") {
      // Code to retrieve department employee list from the database
      // Set the retrieved employee list to state variable
    } else if (e.target.value === "all") {
      // Code to retrieve all employees from the database
      // Set the retrieved employee list to state variable
    }
  };

  // Function to handle employee selection
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  // Function to handle submit button click
  const handleFormSubmit = () => {
    // Code to handle form submission
    // Use the selectedEmployee, fromDateTime, and toDateTime values
    // Show success message or perform other actions as needed
    handleCloseModal();
  };

  // Function to handle cancel button click
  const handleFormCancel = () => {
    // Code to handle cancellation
    handleCloseModal();
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setFromDateTime(null);
    setToDateTime(null);
    setShowModal(false);
  };

  return (
    <div>
      <Navibar />
      <div>
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
            Request OverTime
          </h1>
        </div>
        <div
          style={{
            border: "2px",
            borderColor: "#bbdff2",
            borderStyle: "solid",
            marginLeft: "18%",
            marginRight: "18%",
            padding: "20px 40px 50px 40px",
            backgroundColor: "#e6faf3",
          }}
        >
          <Card style={{ marginLeft: "10%", marginRight: "10%" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <Form.Group>
                <Row className="justify-content-center">
                  <Col>
                    <Form.Check
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="department"
                      label="Department employees"
                      defaultChecked
                      onChange={handleRadioChange}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="all"
                      label="All employees"
                      onChange={handleRadioChange}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter EPF number"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              {selectedEmployee && (
                <div>
                  <Table striped bordered hover className="mt-3">
                    <thead>
                      <tr>
                        <th>EPF</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        onClick={() => handleEmployeeSelect(selectedEmployee)}
                      >
                        <td>{selectedEmployee.epf}</td>
                        <td>{selectedEmployee.name}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Select Dates
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fromDateTime}
              onChange={(e) => setFromDateTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="datetime-local"
              value={toDateTime}
              onChange={(e) => setToDateTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
