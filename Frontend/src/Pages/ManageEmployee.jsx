import React, { useState, useEffect } from "react";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { Button, Form, Tabs, Tab, Table, Modal } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageEmployee() {
  const initialValues = {
    tempid: "",
    username: "",
    password: "",
  };

  const validateForm = () => {
    const { tempid, username, password } = formValues;
    return tempid !== "" && username !== "" && password !== "";
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [listOfEmplyees, setListOfEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [idToEdit, setIdToEdit] = useState(null);

  const generateRandomValue = () => {
    const randomValue = Math.floor(Math.random() * 10000) + 1;
    setFormValues({ ...formValues, tempid: randomValue.toString() });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/login/users-data", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3001/auth", formValues, {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(formValues);
          setFormValues(initialValues);
          toast.success("Successfully added an employee.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error(error.response.data.message);
          toast.error(error.response.data.message, {
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
    } else {
      alert("All fields must be filled !!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteAnnouncement = (id) => {
    axios
      .delete(`http://localhost:3001/auth/login/delete-user/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        toast.success("Employee deleted successfully.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const HandleEdit = (id) => {
    const employee = listOfEmplyees.find((employee) => employee.id === id);
    setSelectedUser({ ...employee });
    setIdToEdit(id);
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const confirmEdit = (id) => {
    axios
      .put(
        `http://localhost:3001/auth/login/edit-login-details/${idToEdit}`,

        {
          tempid: selectedUser.tempid,
          username: selectedUser.username,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )

      .then((response) => {
        setShowModalEdit(false);
        toast.success("Successfully Update Employee's login details.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
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
            Manage Employee
          </h1>
        </div>
        <div className="abc" style={{ paddingTop: "30px" }}>
          <Tabs
            defaultActiveKey="addEmployee"
            id="employeeTabs"
            className="justify-content-center"
          >
            <Tab eventKey="addEmployee" title="Add Employee">
              <div style={{ paddingTop: "50px" }}>
                <Form onSubmit={onSubmit}>
                  <Form.Group
                    className="mb-3 d-flex justify-content-center align-items-center"
                    controlId="tempidControl"
                  >
                    <Form.Label
                      style={{ paddingRight: "15px", marginLeft: "7%" }}
                    >
                      Temp ID :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="tempid"
                      style={{ width: "200px" }}
                      value={formValues.tempid}
                      onChange={handleChange}
                      disabled
                      required
                    />
                    <Button
                      variant="secondary"
                      onClick={generateRandomValue}
                      style={{ marginLeft: "20px" }}
                    >
                      Generate
                    </Button>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-center align-items-center"
                    controlId="usernameControl"
                  >
                    <Form.Label style={{ paddingRight: "2px" }}>
                      Username :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      style={{ width: "200px" }}
                      value={formValues.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-center align-items-center"
                    controlId="passwordControl"
                  >
                    <Form.Label style={{ paddingRight: "10px" }}>
                      Password :
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      style={{ width: "200px" }}
                      value={formValues.password}
                      onChange={handleChange}
                      required
                    />
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
            </Tab>
            <Tab eventKey="editEmployee" title="Edit Employee">
              <div style={{ paddingTop: "40px" }}>
                <center>
                  <Table striped bordered hover style={{ width: "80%" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "160px" }}>Employee Id</th>
                        <th>Username</th>
                        <th>Temp Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfEmplyees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.username}</td>
                          <td>{employee.tempid}</td>
                          <td>
                            <center>
                              <Button
                                variant="secondary"
                                onClick={() => HandleEdit(employee.id)}
                              >
                                <BsPencilSquare
                                  style={{
                                    paddingRight: "10px",
                                    fontSize: "25px",
                                  }}
                                />
                                Edit
                              </Button>
                            </center>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </center>
              </div>
            </Tab>
            <Tab eventKey="deleteEmployee" title="Delete Employee">
              <div style={{ paddingTop: "40px" }}>
                <center>
                  <Table striped bordered hover style={{ width: "80%" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "160px" }}>Employee Id</th>
                        <th>Username</th>
                        <th>Temp Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfEmplyees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.username}</td>
                          <td>{employee.tempid}</td>
                          <td>
                            <center>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteClick(employee.id)}
                              >
                                <BsFillTrashFill
                                  style={{
                                    paddingRight: "10px",
                                    fontSize: "25px",
                                  }}
                                />
                                Delete
                              </Button>
                            </center>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </center>
              </div>
            </Tab>
          </Tabs>
          <Modal show={showDeleteModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this Employee?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => deleteAnnouncement(deleteId)}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModalEdit} onHide={handleCloseModalEdit} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Employee Login Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-4">
                <Form.Label>Tempid</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  name="tempid"
                  value={selectedUser.tempid}
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      tempid: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  name="username"
                  value={selectedUser.username}
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  name="password"
                  value={selectedUser.password}
                  disabled
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      password: event.target.value,
                    })
                  }
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={confirmEdit}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCloseModalEdit}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default ManageEmployee;
