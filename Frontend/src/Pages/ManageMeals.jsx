import React, { useState } from "react";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { Button, Form, Tabs, Tab, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsSendPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageMeals() {
  const [key, setKey] = useState("");
  const [selectedBreakfast, setSelectedBreakfast] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState([]);
  const [meals, setMeals] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/meals/list", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const initialValues = {
    mealCode: "",
    mealType: "",
    mealName: "",
    price: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/meals", formValues, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(formValues);
        setFormValues(initialValues);
        toast.success("Successfully Added a meal.", {
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
        toast.error("You already have been added this meal.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const HandleDelete = (mealCode) => {
    setIdToDelete(mealCode);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3001/meals/list/${idToDelete}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setShowModal(false);
        setMeals((prevList) =>
          prevList.filter((item) => item.mealCode !== idToDelete)
        );
        toast.success("Successfully Delete a meal.", {
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

  const HandleEdit = (mealCode) => {
    const meal = meals.find((meal) => meal.mealCode === mealCode);
    setSelectedMeal({ ...meal });
    setIdToEdit(mealCode);
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const confirmEdit = () => {
    axios
      .put(
        `http://localhost:3001/meals/list/edit/${idToEdit}`,
        {
          price: selectedMeal.price,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setShowModalEdit(false);
        toast.success("Successfully Update a meal details.", {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTabSelect = (k) => {
    setKey(k);
    if (k === "Breakfast") {
      setSelectedLunch([]);
    } else if (k === "Lunch") {
      setSelectedBreakfast([]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
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
            Manage Meals
          </h1>
        </div>
        <div className="abc" style={{ paddingTop: "30px" }}>
          <Tabs
            defaultActiveKey="addMeals"
            id="employeeTabs"
            className="justify-content-center"
          >
            <Tab eventKey="addMeals" title="Add Meals">
              <div style={{ paddingTop: "80px" }}>
                <Form onSubmit={onSubmit}>
                  <table style={{ marginLeft: "210px" }}>
                    <tbody>
                      <tr>
                        <th
                          style={{
                            paddingRight: "15px",
                            marginLeft: "25%",
                            width: "40px",
                          }}
                        >
                          <Form.Label>Meal Type</Form.Label>
                        </th>
                        <td>:</td>
                        <td>
                          <Form.Group
                            className="mb-3 d-flex "
                            controlId="mealTypeControl"
                            style={{ paddingLeft: "30px", paddingTop: "21px" }}
                          >
                            <Form.Control
                              as="select"
                              value={formValues.mealType}
                              name="mealType"
                              style={{ width: "200px" }}
                              onChange={handleChange}
                            >
                              <option value="">-- Select --</option>
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                            </Form.Control>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{
                            paddingRight: "15px",
                            marginLeft: "25%",
                            width: "120px",
                          }}
                        >
                          <Form.Label>Meal Code</Form.Label>
                        </th>
                        <td>:</td>
                        <td>
                          <Form.Group
                            className="mb-3 d-flex"
                            controlId="mealIControl"
                            style={{ paddingLeft: "30px", paddingTop: "21px" }}
                          >
                            <Form.Control
                              type="text"
                              name="mealCode"
                              style={{ width: "700px" }}
                              value={formValues.mealCode}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{
                            paddingRight: "15px",
                            marginLeft: "25%",
                            width: "120px",
                          }}
                        >
                          <Form.Label>Meal Name</Form.Label>
                        </th>
                        <td>:</td>
                        <td>
                          <Form.Group
                            className="mb-3 d-flex"
                            controlId="mealNameControl"
                            style={{ paddingLeft: "30px", paddingTop: "21px" }}
                          >
                            <Form.Control
                              type="text"
                              name="mealName"
                              style={{ width: "700px", paddingLeft: "30px" }}
                              value={formValues.mealName}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{
                            paddingRight: "15px",
                            marginLeft: "25%",
                            width: "120px",
                          }}
                        >
                          <Form.Label>Unit Price</Form.Label>
                        </th>
                        <td>:</td>
                        <td>
                          <Form.Group
                            className="mb-3 d-flex"
                            controlId="priceControl"
                            style={{ paddingLeft: "30px", paddingTop: "21px" }}
                          >
                            <Form.Control
                              type="text"
                              name="price"
                              style={{ width: "700px" }}
                              value={formValues.price}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex">
                    <div style={{ paddingLeft: "600px", paddingTop: "60px" }}>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "150%" }}
                      >
                        Add
                        <BsSendPlus
                          style={{ fontSize: "25px", paddingLeft: "10px" }}
                        />
                      </Button>
                    </div>
                    <div style={{ paddingLeft: "80px", paddingTop: "60px" }}>
                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "180%", height: "43px" }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Tab>
            <Tab eventKey="editMeals" title="Edit Meals">
              <div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={handleTabSelect}
                  className="mb-3"
                  style={{
                    marginLeft: "10%",
                    marginRight: "10%",
                    fontSize: "18px",
                    paddingTop: "40px",
                  }}
                >
                  <Tab eventKey="Breakfast" title="Breakfast">
                    <table
                      className="table table-hover"
                      style={{ width: "80%", marginLeft: "10%" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "25%" }}>
                            Meal Code
                          </th>
                          <th scope="col" style={{ width: "50%" }}>
                            Meal Name
                          </th>
                          <th scope="col" style={{ width: "65%" }}>
                            Price
                          </th>
                          <th scope="col" style={{ width: "25%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {meals
                          .filter((meal) => {
                            return meal.mealType === "Breakfast";
                          })
                          .map((meal) => (
                            <tr key={meal.mealCode}>
                              <td>{meal.mealCode}</td>
                              <td>{meal.mealName}</td>
                              <td>Rs. {meal.price}.00</td>
                              <td>
                                <Button
                                  className="btn btn-secondary"
                                  style={{ width: "150px" }}
                                  onClick={() => HandleEdit(meal.mealCode)}
                                >
                                  <BsPencilSquare
                                    style={{
                                      paddingRight: "10px",
                                      fontSize: "25px",
                                    }}
                                  />
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Tab>
                  <Tab eventKey="Lunch" title="Lunch">
                    <table
                      className="table table-hover"
                      style={{ width: "80%", marginLeft: "10%" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "25%" }}>
                            Meal Code
                          </th>
                          <th scope="col" style={{ width: "50%" }}>
                            Meal Name
                          </th>
                          <th scope="col" style={{ width: "65%" }}>
                            Price
                          </th>
                          <th scope="col" style={{ width: "25%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {meals
                          .filter((meal) => {
                            return meal.mealType === "Lunch";
                          })
                          .map((meal) => (
                            <tr key={meal.mealCode}>
                              <td>{meal.mealCode}</td>
                              <td>{meal.mealName}</td>
                              <td>Rs. {meal.price}.00</td>
                              <td>
                                <Button
                                  className="btn btn-secondary"
                                  style={{ width: "150px" }}
                                  onClick={() => HandleEdit(meal.mealCode)}
                                >
                                  <BsPencilSquare
                                    style={{
                                      paddingRight: "10px",
                                      fontSize: "25px",
                                    }}
                                  />
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="deleteMeals" title="Delete Meals">
              <div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={handleTabSelect}
                  className="mb-3"
                  style={{
                    marginLeft: "10%",
                    marginRight: "10%",
                    fontSize: "18px",
                    paddingTop: "40px",
                  }}
                >
                  <Tab eventKey="Breakfast" title="Breakfast">
                    <table
                      className="table table-hover"
                      style={{ width: "80%", marginLeft: "10%" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "25%" }}>
                            Meal Code
                          </th>
                          <th scope="col" style={{ width: "50%" }}>
                            Meal Name
                          </th>
                          <th scope="col" style={{ width: "65%" }}>
                            Price
                          </th>
                          <th scope="col" style={{ width: "25%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {meals
                          .filter((meal) => {
                            return meal.mealType === "Breakfast";
                          })
                          .map((meal) => (
                            <tr key={meal.mealCode}>
                              <td>{meal.mealCode}</td>
                              <td>{meal.mealName}</td>
                              <td>Rs. {meal.price}.00</td>
                              <td>
                                <Button
                                  className="btn btn-danger"
                                  style={{ width: "150px" }}
                                  onClick={() => HandleDelete(meal.mealCode)}
                                >
                                  <BsFillTrashFill
                                    style={{
                                      paddingRight: "10px",
                                      fontSize: "25px",
                                    }}
                                  />
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Tab>
                  <Tab eventKey="Lunch" title="Lunch">
                    <table
                      className="table table-hover"
                      style={{ width: "80%", marginLeft: "10%" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "25%" }}>
                            Meal Code
                          </th>
                          <th scope="col" style={{ width: "50%" }}>
                            Meal Name
                          </th>
                          <th scope="col" style={{ width: "65%" }}>
                            Price
                          </th>
                          <th scope="col" style={{ width: "25%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {meals
                          .filter((meal) => {
                            return meal.mealType === "Lunch";
                          })
                          .map((meal) => (
                            <tr key={meal.mealCode}>
                              <td>{meal.mealCode}</td>
                              <td>{meal.mealName}</td>
                              <td>Rs. {meal.price}.00</td>
                              <td>
                                <Button
                                  className="btn btn-danger"
                                  style={{ width: "150px" }}
                                  onClick={() => HandleDelete(meal.mealCode)}
                                >
                                  <BsFillTrashFill
                                    style={{
                                      paddingRight: "10px",
                                      fontSize: "25px",
                                    }}
                                  />
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Tab>
                </Tabs>
              </div>
            </Tab>
          </Tabs>
        </div>
        <br />
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this particular meal?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalEdit} onHide={handleCloseModalEdit} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Meal Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-4">
              <Form.Label>Meal Code</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={selectedMeal.mealCode}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Meal Type</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={selectedMeal.mealType}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Meal Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={selectedMeal.mealName}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                size="sm"
                value={selectedMeal.price}
                onChange={(event) =>
                  setSelectedMeal({
                    ...selectedMeal,
                    price: event.target.value,
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
  );
}
export default ManageMeals;
