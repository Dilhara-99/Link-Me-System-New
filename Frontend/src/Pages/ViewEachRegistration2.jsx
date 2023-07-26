import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormLabel,
  Button,
  Modal,
} from "react-bootstrap";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";

function ViewEachRegistration2() {
  const [enrolment, setEnrolment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addDetails/get-each/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        setEnrolment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
          Registration Form
        </h1>
      </div>

      <Row>
        <Col style={{ paddingBottom: "10px", textAlign: "center" }}>
          <FormLabel>
            <h5>Submitted by: &nbsp;&nbsp;&nbsp;</h5>
          </FormLabel>
          <FormLabel className="left-align">
            <h4 style={{ fontFamily: "serif", color: "#0785a8" }}>
              <strong>{enrolment.nameWithInitials}</strong>
            </h4>
          </FormLabel>
        </Col>
      </Row>

      <Container style={{ marginTop: "2%", padding: "0 150px 0 150px" }}>
        <Card
          style={{
            border: "1px",
            borderRadius: "20px",
            borderColor: "black",
            borderStyle: "solid",
            padding: "60px 80px 30px 80px",
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
                  <Form.Control type="text" value={enrolment.gender} readOnly />
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
        </Card>
      </Container>

      <div style={{ marginTop: "50px", marginBottom: "80px" }}>
        {/* <div style={{ flex: '1' ,paddingLeft:'350px'}}>
          <BackButton />
        </div> */}
      </div>
    </div>
  );
}

export default ViewEachRegistration2;
