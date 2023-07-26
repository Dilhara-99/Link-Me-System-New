import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import Linklogo from "../Components/Linklogo";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Navibar from "../Components/Navibar";

function AddEnrolments() {
  const initialValue = {
    fullName: "",
    nameWithInitials: "",
    address: "",
    nic: "",
    birthDate: null,
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    fixNumber: "",
    bankName: "",
    bankBranch: "",
    accountNumber: "",
    privacyPolicy: false,
    approveStatus: "Inprogress",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(formValues);
    if (Object.keys(errors).length === 0) {
      Axios.post("http://localhost:3001/addDetails", formValues).then(
        (response) => {
          console.log(formValues);
          setFormValues(initialValue);
          setShowModal(true);
        }
      );
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "birthDate") {
      setFormValues({ ...formValues, birthDate: value });
      return;
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsCheckboxChecked(checked);
  };

  const clearForm = () => {
    setFormValues(initialValue);
    setFormErrors({});
  };

  const validateForm = (values) => {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = "Full name is required";
    }

    if (!values.nameWithInitials) {
      errors.nameWithInitials = "Name with initials is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.nic) {
      errors.nic = "NIC number is required";
    }

    if (!values.birthDate) {
      errors.birthDate = "Birth date is required";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    if (!values.maritalStatus) {
      errors.maritalStatus = "Marital status is required";
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    }

    if (!values.bankName) {
      errors.bankName = "Bank name is required";
    }

    if (!values.bankBranch) {
      errors.bankBranch = "Bank branch is required";
    }

    if (!values.accountNumber) {
      errors.accountNumber = "Account number is required";
    }

    return errors;
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navibar />
      <Container fluid style={{ paddingBottom: "100px" }}>
        <Row className="justify-content-center mt-5">
          <div style={{ paddingBottom: "20px", paddingTop: "0px" }}>
            <div
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "98%",
              }}
            >
              <p style={{ paddingLeft: "20px" }}>
                We are Link Natural Products{" "}
                <strong>
                  <i>Human Resource Department</i>
                </strong>
                . Please feed your true and correct informations and upload
                clear documents. If we identified any incompatible or wrong
                informations,your enrolment will be rejected. Use{" "}
                <strong>
                  <i style={{ color: "red" }}>Block letters</i>
                </strong>{" "}
                for full name and name with initials.
              </p>
            </div>
          </div>

          <Col lg="8">
            <Card
              className="main"
              style={{
                backgroundColor: "#e6faf3",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <br />
              <div
                className="reg-link-logo"
                style={{
                  marginRight: "50%",
                  marginLeft: "40%",
                  paddingTop: "20px",
                }}
              >
                <div className="row">
                  <Linklogo />
                </div>
              </div>
              <Card.Body>
                <h1
                  className="mb-4"
                  style={{ fontFamily: "serif", paddingLeft: "330px" }}
                >
                  Registration Form
                </h1>
                <Form onSubmit={onSubmit} style={{ paddingRight: "10%" }}>
                  <h5
                    className="mb-3"
                    style={{ textAlign: "left", paddingLeft: "50px" }}
                  >
                    Personal Information :
                  </h5>
                  <Card
                    className="sub"
                    style={{
                      border: "1px",
                      borderColor: "black",
                      borderStyle: "dashed",
                      margin: "20px 50px 20px 50px",
                    }}
                  >
                    <Form.Group
                      controlId="fullName"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={formValues.fullName}
                        name="fullName"
                        onChange={handleChange}
                        isInvalid={!!formErrors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="nameWithInitials"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Name with Initials</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name with initials"
                        value={formValues.nameWithInitials}
                        name="nameWithInitials"
                        onChange={handleChange}
                        isInvalid={!!formErrors.nameWithInitials}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.nameWithInitials}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="address"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={formValues.address}
                        name="address"
                        onChange={handleChange}
                        isInvalid={!!formErrors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="nic"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>NIC Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="nic"
                        placeholder="Enter your NIC number"
                        value={formValues.nic}
                        onChange={handleChange}
                        isInvalid={!!formErrors.nic}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.nic}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="birthDate"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={formValues.birthDate}
                        onChange={handleChange}
                        isInvalid={!!formErrors.birthDate}
                        style={{ width: "160px" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.birthDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      controlId="gender"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        value={formValues.gender}
                        name="gender"
                        onChange={handleChange}
                        isInvalid={!!formErrors.gender}
                      >
                        <option value="">-- Select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="maritalStatus"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Marital Status</Form.Label>
                      <Form.Control
                        as="select"
                        value={formValues.maritalStatus}
                        name="maritalStatus"
                        onChange={handleChange}
                        isInvalid={!!formErrors.maritalStatus}
                      >
                        <option value="">-- Select --</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.maritalStatus}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="mobileNumber"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter your mobile number"
                        value={formValues.mobileNumber}
                        onChange={handleChange}
                        isInvalid={!!formErrors.mobileNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.mobileNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      controlId="fixNumber"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Fixed Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="fixNumber"
                        placeholder="Enter your Fixed Tel number"
                        value={formValues.fixNumber}
                        onChange={handleChange}
                        isInvalid={!!formErrors.fixNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.fixNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Card>

                  <h5
                    className="mb-3"
                    style={{
                      textAlign: "left",
                      paddingLeft: "50px",
                      marginTop: "30px",
                    }}
                  >
                    Banking Information :
                  </h5>
                  <Card
                    className="sub"
                    style={{
                      border: "1px",
                      borderColor: "black",
                      borderStyle: "dashed",
                      margin: "20px 50px 20px 50px",
                    }}
                  >
                    <Form.Group
                      controlId="maritalStatus"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Control
                        as="select"
                        value={formValues.bankName}
                        name="bankName"
                        onChange={handleChange}
                        isInvalid={!!formErrors.bankName}
                      >
                        <option value="">-- Select --</option>
                        <option value="Amana Bank PLC">Amana Bank PLC</option>
                        <option value="Bank of Ceylon">Bank of Ceylon</option>
                        <option value="Cargills Bank Ltd">
                          Cargills Bank Ltd
                        </option>
                        <option value="Citibank, N.A.">Citibank, N.A.</option>
                        <option value="Commercial Bank of Ceylon PLC">
                          Commercial Bank of Ceylon PLC
                        </option>
                        <option value="DFCC Bank PLC">DFCC Bank PLC</option>
                        <option value="Hatton National Bank PLC">
                          Hatton National Bank PLC
                        </option>
                        <option value="National Development Bank PLC">
                          National Development Bank PLC
                        </option>
                        <option value="Nations Trust Bank PLC">
                          Nations Trust Bank PLCn
                        </option>
                        <option value="Pan Asia Banking Corporation PLC">
                          Pan Asia Banking Corporation PLC
                        </option>
                        <option value="People's Bank">People's Bank</option>
                        <option value="Sampath Bank PLC">
                          Sampath Bank PLC
                        </option>
                        <option value="Seylan Bank PLC">Seylan Bank PLC</option>
                        <option value="Union Bank of Colombo PLC">
                          Union Bank of Colombo PLC
                        </option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.bankName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="bankBranch"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Bank Branch</Form.Label>
                      <Form.Control
                        type="text"
                        name="bankBranch"
                        placeholder="Enter bank branch"
                        value={formValues.bankBranch}
                        onChange={handleChange}
                        isInvalid={!!formErrors.bankBranch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.bankBranch}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="accountNumber"
                      style={{ textAlign: "left", padding: "20px 60px" }}
                    >
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountNumber"
                        placeholder="Enter account number"
                        value={formValues.accountNumber}
                        onChange={handleChange}
                        isInvalid={!!formErrors.accountNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.accountNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Card>

                  <Form.Group
                    controlId="privacyPolicyCheckbox"
                    style={{ textAlign: "left", paddingLeft: "50px" }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="I agree to the privacy policy"
                      checked={isCheckboxChecked}
                      onChange={handleCheckboxChange}
                    />
                  </Form.Group>

                  <div style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="primary"
                      style={{ margin: "20px" }}
                      disabled={!isCheckboxChecked}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      style={{ margin: "20px" }}
                      onClick={clearForm}
                    >
                      Clear
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          show={showModal}
          onHide={() => {}}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{
                  color: "#3968f3",
                  border: "2px solid #3968f3",
                  borderRadius: "50%",
                }}
              />
              &nbsp;&nbsp;Registration Successful
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "50px",
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "4px solid #1fe57f",
                  color: "#1fe57f",
                }}
              >
                <FontAwesomeIcon icon={faCheck} style={{ fontSize: "50px" }} />
              </div>
            </div>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "serif",
                fontSize: "20px",
              }}
            >
              Your registration has been successfully submitted.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default AddEnrolments;
