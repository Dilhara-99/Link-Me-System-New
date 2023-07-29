import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Carousel,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { FcBiohazard } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Advertisement from "../Components/Advertisement";

function Prelogin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameErrorSignin, setUsernameErrorSignin] = useState("");
  const [passwordErrorSignin, setPasswordErrorSignin] = useState("");

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setUsername("");
    setPassword("");
    setShowModal(false);
    setPasswordError(false);
    setUsernameError(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModalReset = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowModalReset(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // setUsername('');
    // setPassword("");

    const usernameRegex = /^\d{4}$/;
    const passwordRegex = /^\d{4}$/;
    let hasError = false;

    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required.");
      hasError = true;
    } else if (!usernameRegex.test(username)) {
      setUsernameError("Username should contain 4 numbers.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password should contain 4 numbers.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const data = { username: username, password: password };

    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log(response.data.userId);
        localStorage.setItem("user",response.data.userId)
        if (response.status === 404) {
          toast.error("This user does not exist.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (
          response.status === 401 &&
          response.data.error === "Invalid username or password"
        ) {
          toast.error("Your password is incorrect.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (
          response.status === 401 &&
          response.data.error === "You are already registered"
        ) {
          toast.error("You are already registered.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success("Successfully signed up!", {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              navigate("/registration");
            },
          });
          
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 401) {
          if (error.response.data.error === "Invalid username or password") {
            toast.error("Your password is incorrect.", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (
            error.response.data.error === "You are already registered"
          ) {
            toast.error("You are already registered.", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } else if (error.response.status === 404) {
          toast.error("This user does not exist.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.status === 500) {
        }
      });
  };

  const data = { username: username, password: password };
  const handleSignin = (e) => {
    e.preventDefault();

    // setUsername("");
    // setPassword("");

    const usernameRegexSignin = /^\d{4}$/;
    const passwordRegexSignin = /^\d{4}$/;
    let hasErrorSignin = false;

    setUsernameErrorSignin("");
    setPasswordErrorSignin("");

    if (!username) {
      setUsernameErrorSignin("Username is required.");
      hasErrorSignin = true;
    } else if (!usernameRegexSignin.test(username)) {
      setUsernameError("Username should contain 4 numbers.");
      hasErrorSignin = true;
    }

    if (!password) {
      setPasswordErrorSignin("Password is required.");
      hasErrorSignin = true;
    } else if (!passwordRegexSignin.test(password)) {
      setPasswordErrorSignin("Password should contain 4 numbers.");
      hasErrorSignin = true;
    }

    if (hasErrorSignin) {
      return;
    }

    axios
      .post("http://localhost:3001/auth/password-reset-modal", data)
      .then((response) => {
        console.log(response.data);
        if (response.status === 404) {
          toast.error("This user does not exist.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (
          response.status === 401 &&
          response.data.error === "Invalid password"
        ) {
          toast.error("Your password is incorrect.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setShowModalReset(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .post("http://localhost:3001/auth/login/dashboard", data, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          toast.success("Successfully signed in!", {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
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

    const data = { username: username, password: newPassword, tempid: "0000" };

    axios
      .put(`http://localhost:3001/auth/login/password-update/${username}`, data)
      .then((response) => {
        console.log(response.data);
        handleCloseModalReset();
        toast.success("Password reset successful!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/dashboard");
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Container className="my-5">
        <Advertisement />
        <br />
        <Card>
          <Row className="g-0">
            <Col md="6">
              <Carousel style={{ height: "100%" }}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2014/06/Products.jpg"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2015/04/Link-Samahan.jpg"
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2015/04/Swastha-Thripala.jpg"
                    alt="Fourth slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2015/04/papsanguwa.jpg"
                    alt="Fifth slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2015/04/Link-Sudantha.jpg"
                    alt="Sixth slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://linknaturalproducts.com/wp-content/uploads/2015/04/Kesha-packs-e1475817712265.jpg"
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col md="6">
              <Card.Body
                className="d-flex flex-column"
                style={{ paddingTop: "10px", backgroundColor: "#CFD8DC" }}
              >
                <div
                  className="d-flex flex-row mt-2"
                  style={{ paddingTop: "40px" }}
                >
                  <div
                    className="d-flex flex-row"
                    style={{ paddingLeft: "180px" }}
                  >
                    <FcBiohazard style={{ width: "80px", height: "80px" }} />
                  </div>
                  <h2
                    className=""
                    style={{
                      letterSpacing: "1px",
                      fontFamily: "serif",
                      paddingLeft: "10px",
                      fontWeight: "bolder",
                      paddingTop: "40px",
                    }}
                  >
                    LinkMe
                  </h2>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{
                    letterSpacing: "1px",
                    paddingLeft: "30px",
                    paddingTop: "20px",
                  }}
                >
                  Sign-in into your account
                </h5>
                <div
                  className="main-login"
                  style={{ padding: "10px 100px 10px 100px" }}
                >
                  <Form.Group className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={username}
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameErrorSignin && (
                      <p className="text-danger">{usernameErrorSignin}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      size="sm"
                      value={password}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordErrorSignin && (
                      <p className="text-danger">{passwordErrorSignin}</p>
                    )}
                  </Form.Group>
                </div>
                <div style={{ paddingLeft: "180px" }}>
                  <Button
                    className=""
                    variant="primary"
                    size="sm"
                    style={{ width: "50%" }}
                    onClick={handleSignin}
                  >
                    Sign in
                  </Button>
                </div>
                <br />
                <div style={{ display: "flex", paddingLeft: "230px" }}>
                  <a className="small text-muted" href="">
                    Forgot password?
                  </a>
                </div>
                <br />
                <p className="" style={{ color: "#393f81" }}>
                  If you are a new employee?{" "}
                  <a
                    href="#!"
                    style={{
                      color: "#393f81",
                      fontWeight: "bold",
                      fontFamily: "serif",
                      color: "red",
                    }}
                    onClick={handleOpenModal}
                  >
                    Register Here
                  </a>
                </p>
                <div className="" style={{ paddingTop: "50px" }}>
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
      <div>
        <Footer />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-danger">{usernameError}</p>}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignup}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalReset} onHide={handleCloseModalReset}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Enter New Password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordReset}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCloseModalReset}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Prelogin;
