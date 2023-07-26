import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LinkLogo from "../Components/Linklogo";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SendCV() {
  const initialValues = {
    name: "",
    position: "",
    cvImage: null,
    status: "Inprogress",
  };

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!formValues.name || !formValues.position || !formValues.cvImage) {
      toast.error("Please fill all required fields.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Create FormData and append form data to it
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("position", formValues.position);
    formData.append("cvImage", formValues.cvImage);
    formData.append("status", formValues.status);

    axios
      .post("http://localhost:3001/cvDetails", formData)
      .then((response) => {
        toast.success("Successfully sent your CV.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/");
          },
        });
        setFormValues(initialValues);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send your CV.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "cvImage") {
      const file = files[0];
      setFormValues({ ...formValues, cvImage: file });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  return (
    <div style={{ marginLeft: "30%", marginRight: "10%" }}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <br />
      <br />
      <LinkLogo />
      <br />
      <Container
        fluid
        className="container-sendcv"
        style={{ paddingBottom: "90px" }}
      >
        <Row className="">
          <Col lg="9" className="col">
            <br />
            <Card
              style={{
                border: "2px",
                borderColor: "#007D34",
                padding: "30px 20px 20px 20px",
                borderStyle: "solid",
                backgroundColor: "#e6faf3",
              }}
            >
              <Card.Body className="">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Enter your name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />

                <hr className="hr" />
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.position}
                  name="position"
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="labour">Labour</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="executive">Executive</option>
                  <option value="manager">Manager</option>
                </Form.Control>
                <hr className="hr" />
                <Form.Label>Upload CV</Form.Label>
                <Form.Control
                  type="file"
                  size="lg"
                  onChange={handleChange}
                  name="cvImage"
                />
                <div className="msg00">
                  Upload your CV/Resume or any other relevant file. Max file
                  size 50 MB
                </div>

                <hr className="hr" />
                <div style={{ paddingLeft: "200px" }}>
                  <Button className="btn-sendcv" size="lg" onClick={onSubmit}>
                    Send Application
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SendCV;
