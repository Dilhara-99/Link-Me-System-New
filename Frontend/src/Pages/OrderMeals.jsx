import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Navibar from "../Components/Navibar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BackButton from "../Components/BackButton";
import { BsSendPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderMeals() {
  const [key, setKey] = useState("Breakfast");
  const [selectedBreakfast, setSelectedBreakfast] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState([]);
  const [showSelectedMeals, setShowSelectedMeals] = useState(false);
  const [meals, setMeals] = useState([]);
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [epf, setEPF] = useState("");

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/user-details", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setNameWithInitials(response.data.nameWithInitials);
        setEPF(response.data.epf);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleAdd = (name, mealType) => {
    const selectedMeal = meals.find((meal) => meal.mealCode === name);

    if (!selectedMeal) {
      console.error(`Meal with name ${name} not found.`);
      return;
    }

    const newMeal = {
      mealCode: selectedMeal.mealCode,
      name: selectedMeal.mealName,
      quantity: 1,
    };

    if (mealType === "Breakfast") {
      const breakfastMeal = selectedBreakfast.find(
        (meal) => meal.mealCode === selectedMeal.mealCode
      );
      if (breakfastMeal) {
        const updatedBreakfast = selectedBreakfast.map((meal) =>
          meal.mealCode === selectedMeal.mealCode
            ? { ...meal, quantity: meal.quantity + 1 }
            : meal
        );
        setSelectedBreakfast(updatedBreakfast);
      } else {
        setSelectedBreakfast([...selectedBreakfast, newMeal]);
      }
    } else if (mealType === "Lunch") {
      const lunchMeal = selectedLunch.find(
        (meal) => meal.mealCode === selectedMeal.mealCode
      );
      if (lunchMeal) {
        const updatedLunch = selectedLunch.map((meal) =>
          meal.mealCode === selectedMeal.mealCode
            ? { ...meal, quantity: meal.quantity + 1 }
            : meal
        );
        setSelectedLunch(updatedLunch);
      } else {
        setSelectedLunch([...selectedLunch, newMeal]);
      }
    }

    setShowSelectedMeals(true);
  };

  const handleQuantityChange = (name, quantity, mealType) => {
    if (mealType === "Breakfast") {
      const updatedMeals = selectedBreakfast.map((meal) => {
        if (meal.mealName === name) {
          return {
            ...meal,
            quantity: quantity,
          };
        }
        return meal;
      });
      setSelectedBreakfast(updatedMeals);
    } else if (mealType === "Lunch") {
      const updatedMeals = selectedLunch.map((meal) => {
        if (meal.mealName === name) {
          return {
            ...meal,
            quantity: quantity,
          };
        }
        return meal;
      });
      setSelectedLunch(updatedMeals);
    }
  };

  const handleSubmit = () => {
    const selectedMeals = [...selectedBreakfast, ...selectedLunch];

    const dataToSubmit = selectedMeals.map((meal) => ({
      mealCode: meal.mealCode,
      quantity: meal.quantity,
    }));

    const dataWithEPF = {
      epf: epf,
      meals: dataToSubmit,
    };

    axios
      .post("http://localhost:3001/orderedMeals", dataWithEPF, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("Selected meal details stored successfully.");
        toast.success("Successfully pleaced you meal order", {
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
        console.log("Error storing selected meal details:", error);
        toast.error("You already has requested this meal", {
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

  const handleTabSelect = (k) => {
    setKey(k);
    if (k === "Breakfast") {
      setSelectedLunch([]);
    } else if (k === "Lunch") {
      setSelectedBreakfast([]);
    }
  };

  return (
    <div style={{ backgroundColor: "#f7f7f5" }}>
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
      <br />
      <div
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "98%",
          marginLeft: "20px",
          marginTop: "10px",
          backgroundColor: "white",
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
          Order Meals
        </h1>
      </div>
      <br />
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <div className="sub-header" style={{ fontSize: "20px" }}>
          <div className="row">
            <h5
              className="Row"
              style={{
                paddingLeft: "250px",
                paddingTop: "10px",
                fontFamily: "serif",
              }}
            >
              Name :&nbsp;&nbsp;{nameWithInitials}
            </h5>
            <h5
              className="Row"
              style={{
                paddingLeft: "250px",
                paddingTop: "10px",
                paddingBottom: "20px",
                fontFamily: "serif",
              }}
            >
              EPF&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;{epf}
            </h5>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div
        className=""
        style={{
          marginLeft: "15%",
          marginRight: "15%",
          padding: "25px 10px 50px 0",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={handleTabSelect}
          className="mb-3"
          style={{ marginLeft: "10%", marginRight: "10%", fontSize: "18px" }}
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
                      <td>Rs. {meal.price}</td>
                      <td>
                        <Button
                          className="btn btn-success"
                          style={{ width: "150px" }}
                          onClick={() => handleAdd(meal.mealCode, "Breakfast")}
                        >
                          Add
                          <BsSendPlus
                            style={{ fontSize: "30px", paddingLeft: "15px" }}
                          />
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
                      <td>Rs. {meal.price}</td>
                      <td>
                        <Button
                          className="btn btn-success"
                          style={{ width: "150px" }}
                          onClick={() => handleAdd(meal.mealCode, "Lunch")}
                        >
                          Add
                          <BsSendPlus
                            style={{ fontSize: "30px", paddingLeft: "15px" }}
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab>
        </Tabs>
        <br />

        <div
          className="ordered-meals"
          style={{ marginTop: "20px", marginLeft: "10%", marginRight: "10%" }}
        >
          {showSelectedMeals && (
            <div>
              <h4>Selected Meals:</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Meal Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>{" "}
                  </tr>
                </thead>
                <tbody>
                  {key === "Breakfast" &&
                    selectedBreakfast.map((meal) => (
                      <tr key={meal.mealCode}>
                        <td>{meal.mealCode}</td>
                        <td>{meal.name}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            name="quantity"
                            value={meal.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                meal.name,
                                parseInt(e.target.value),
                                "Breakfast"
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  {key === "Lunch" &&
                    selectedLunch.map((meal) => (
                      <tr key={meal.mealCode}>
                        <td>{meal.mealCode}</td>
                        <td>{meal.name}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            name="quantity"
                            value={meal.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                meal.name,
                                parseInt(e.target.value),
                                "Lunch"
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <br />
              <hr style={{ width: "80%", marginLeft: "10%" }} />
              <br />
              <div style={{ paddingLeft: "300px" }}>
                <Button
                  variant="primary"
                  style={{ width: "200px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <div style={{ marginRight: "0" }}>
        <BackButton />
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default OrderMeals;
