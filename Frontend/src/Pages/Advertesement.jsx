import React, { useState, useEffect } from "react";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { Button, Form, Tabs, Tab, Table, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPencilSquare } from "react-icons/bs";

function Advertesement() {
  const initialValue = {
    closingDate: null,
    position: "",
    status: "advertised",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [recruitments, setRecruitments] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedAdvertesement, setSelectedAdvertesement] = useState({});
  const [listOfAdvertesements, setListOfAdvertesements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/advertesement/advertised-data",
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        setRecruitments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/advertesement/advertised-data")
  //     .then((response) => {
  //       setListOfAdvertesements(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/advertesement", formValues, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        console.log(formValues);
        setFormValues(initialValue);
        toast.success("Advertisement created successfully.", {
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
  };

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteAnnouncement = (id) => {
    axios
      .delete(`http://localhost:3001/advertesement/remove-advertesement/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        toast.success("Advertesement deleted successfully.", {
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

  const handleEditClick = (id) => {
    const advertesement = listOfAdvertesements.find(
      (advertesement) => advertesement.id === id
    );
    setSelectedAdvertesement({ ...advertesement });
    setIdToEdit(id);
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const confirmEdit = (id) => {
    axios
      .put(
        `http://localhost:3001/advertesement/edit-advertesement-details/${idToEdit}`,
        {
          closingDate: selectedAdvertesement.closingDate,
          position: selectedAdvertesement.position,
        },{
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )

      .then((response) => {
        setShowModalEdit(false);
        toast.success("Successfully Update Advertesement details.", {
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
            Recruitment Announcement
          </h1>
        </div>
        <div className="abc" style={{ paddingTop: "30px" }}>
          <Tabs
            defaultActiveKey="addannouncement"
            id="announcementTabs"
            className="justify-content-center"
          >
            <Tab eventKey="addannouncement" title="Add announcement">
              <div style={{ paddingTop: "50px", paddingLeft: "400px" }}>
                <Form onSubmit={onSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Group controlId="closingDate">
                      <Form.Label>Closing Date</Form.Label>
                      <br />
                      <DatePicker
                        type="date"
                        name="closingDate"
                        selected={formValues.closingDate}
                        minDate={new Date()}
                        onChange={(date) => handleChange("closingDate", date)}
                        className="form-control"
                      />
                    </Form.Group>
                    <br />

                    <Form.Group controlId="position">
                      <Form.Label>Open Positions</Form.Label>
                      <Form.Control
                        placeholder="Enter positions one by one"
                        as="textarea"
                        rows={3}
                        name="position"
                        style={{ width: "50%" }}
                        value={formValues.position}
                        onChange={(event) =>
                          handleChange("position", event.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div style={{ paddingLeft: "250px" }}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            <Tab eventKey="editannouncement" title="Edit announcement">
              <br />
              <center>
                <Table striped bordered hover style={{ width: "80%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "160px" }}>Advertisement Id</th>
                      <th>Closing Date</th>
                      <th>Open Vacancies</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruitments.map((recruitment) => (
                      <tr key={recruitment.id}>
                        <td>{recruitment.id}</td>
                        <td>{recruitment.closingDate}</td>
                        <td>{recruitment.position}</td>
                        <td>{recruitment.status}</td>
                        <td>
                          <center>
                            <Button
                              variant="secondary"
                              onClick={() => handleEditClick(recruitment.id)}
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
            </Tab>
            <Tab eventKey="deleteannouncement" title="Delete announcement">
              <br />
              <center>
                <Table striped bordered hover style={{ width: "80%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "160px" }}>Advertisement Id</th>
                      <th>Closing Date</th>
                      <th>Open Vacancies</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruitments.map((recruitment) => (
                      <tr key={recruitment.id}>
                        <td>{recruitment.id}</td>
                        <td>{recruitment.closingDate}</td>
                        <td>{recruitment.position}</td>
                        <td>{recruitment.status}</td>
                        <td>
                          <center>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteClick(recruitment.id)}
                            >
                              Delete
                            </Button>
                          </center>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </center>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this announcement?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteAnnouncement(deleteId)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalEdit} onHide={handleCloseModalEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Advertesement Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              name="id"
              disabled
              value={selectedAdvertesement.id}
              onChange={(event) =>
                setSelectedAdvertesement({
                  ...selectedAdvertesement,
                  id: event.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>closing Date</Form.Label>
            <br />
            <DatePicker
              selected={new Date(selectedAdvertesement.closingDate)}
              onChange={(date) =>
                setSelectedAdvertesement({
                  ...selectedAdvertesement,
                  closingDate: date.toISOString(),
                })
              }
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Open Vacuncies</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              name="position"
              value={selectedAdvertesement.position}
              onChange={(event) =>
                setSelectedAdvertesement({
                  ...selectedAdvertesement,
                  position: event.target.value,
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
  );
}

export default Advertesement;
