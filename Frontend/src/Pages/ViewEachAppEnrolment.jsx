import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";

function ViewEachAppEnrolment() {
  const [enrolment, setEnrolment] = useState({});
  const [epf, setEpf] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const { registrationId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addDetails/approved/all/${registrationId}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setEnrolment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [registrationId]);

  const handleUpdateData = () => {
    const updatedData = {};
    if (department) {
      updatedData.department = department;
    }
    if (designation) {
      updatedData.designation = designation;
    }
    if (epf && !enrolment.epf) {
      updatedData.epf = epf;
    }

    axios
      .put(`http://localhost:3001/addDetails/login/update/${registrationId}`, updatedData, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setEnrolment((prevEnrolment) => ({
          ...prevEnrolment,
          ...updatedData,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    // Update the tempid in the Users table

    if (epf && !enrolment.epf) {
      axios
        .post(
          `http://localhost:3001/addDetails/epf/${registrationId}`,
          { epf },
          {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setEnrolment((prevEnrolment) => ({
            ...prevEnrolment,
            epf,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    axios
    .put(`http://localhost:3001/auth/login/abc/${registrationId}`,{tempid:null} , {
      
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <Navibar />
      <Col
        className="regDetails"
        sm="8"
        style={{ width: "80%", paddingLeft: "190px" }}
      >
        <Container
          style={{
            marginTop: "2%",
            padding: "30px 10px 0 10px",
            marginLeft: "2%",
            marginRight: "20%",
          }}
        >
          <Card
            style={{
              border: "1px",
              borderRadius: "20px",
              padding: "60px 80px 30px 80px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card
              style={{
                border: "1px",
                borderRadius: "20px",
                borderColor: "black",
                borderStyle: "dashed",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h5>Personal Details</h5>
              <hr />
              <Form>
                <Form.Group
                  as={Row}
                  controlId="formFullName"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Full Name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.fullName}
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formNameWithInitials"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Name with Initials
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.nameWithInitials}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formAddress"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Address
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.address}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formnic"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    NIC Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control type="text" value={enrolment.nic} readOnly />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formgender"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Gender
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.gender}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formmaritalStatus"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Marital Status
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.maritalStatus}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formmobileNumber"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Mobile Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.mobileNumber}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formfixNumber"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Fixed Tel Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.fixNumber}
                      readOnly
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card>

            <Card
              style={{
                border: "1px",
                borderRadius: "20px",
                borderColor: "black",
                borderStyle: "dashed",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h5>Bank Details</h5>
              <hr />
              <Form>
                <Form.Group
                  as={Row}
                  controlId="formBankName"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Bank Name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.bankName}
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formBankBranch"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Bank Branch
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.bankBranch}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  controlId="formaccountNumer"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Account Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.accountNumber}
                      readOnly
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card>
            <Card
              style={{
                border: "1px",
                borderRadius: "20px",
                borderColor: "black",
                borderStyle: "dashed",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h5>Additional Information</h5>
              <hr />
              <Form>
                <Form.Group
                  as={Row}
                  controlId="formepf"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    EPF Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={enrolment.epf}
                      onChange={(e) => setEpf(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formdepartment"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Department
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value={enrolment.department}>
                        {enrolment.department}
                      </option>
                      <option value="HR">HR</option>
                      <option value="Accounts">Accounts</option>
                      <option value="Production">Production</option>
                      <option value="R&D">R&D</option>
                      <option value="QA">QA</option>
                      <option value="Stores">Stores</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Business Development">
                        Business Development
                      </option>
                      <option value="Suply Chain & procument">
                        Suply Chain & procument
                      </option>
                      <option value="Planing">Planing</option>
                      <option value="Service">Service</option>
                      <option value="Maintainance">Maintainance</option>
                      <option value="CSR">CSR</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formdesignation"
                  style={{ padding: "10px 0 15px 0" }}
                >
                  <Form.Label column sm="4">
                    Designation
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                      <option value={enrolment.designation}>
                        {enrolment.designation}
                      </option>
                      <option value="Worker">Worker</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Junior Executive">Junior Executive</option>
                      <option value="Senior Executive">Senior Executive</option>
                      <option value="Unit Manager">Unit Manager</option>
                      <option value="QA Manager">QA Manager</option>
                      <option value="Production Manager">
                        Production Manager
                      </option>
                      <option value="Sales Manager">Sales Manager</option>
                      <option value="HR Manager">HR Manager</option>
                      <option value="IT Manager">IT Manager</option>
                      <option value="CSR Manager">CSR Manager</option>
                      <option value="Service Manager">Service Manager</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </Card>
          </Card>
        </Container>
      </Col>
      <div>
        <div
          className="d-flex"
          style={{ marginTop: "50px", marginBottom: "80px", marginLeft: "30%" }}
        >
          <div>
            <Button
              style={{ width: "200%", fontWeight: "bold" }}
              onClick={handleUpdateData}
            >
              Save
            </Button>
          </div>
          <div style={{ width: "60%" }}>
            <BackButton style={{ width: "70%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEachAppEnrolment;
