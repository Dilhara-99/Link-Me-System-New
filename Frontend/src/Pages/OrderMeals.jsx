import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Navibar from "../Components/Navibar";
import { useEffect, useState } from "react";
import Details from "../Components/Details";
import axios from "axios";
import { Button } from "react-bootstrap";
import BackButton from "../Components/BackButton";
import { BsSendPlus } from "react-icons/bs";

function OrderMeals() {
  const [key, setKey] = useState("Breakfast");
  const [selectedBreakfast, setSelectedBreakfast] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState([]);
  const [showSelectedMeals, setShowSelectedMeals] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/meals/list",{
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const handleAdd = (name, mealType) => {
    if (mealType === "Breakfast") {
      const breakfastMeal = selectedBreakfast.find(
        (meal) => meal.name === name
      );
      if (breakfastMeal) {
        setSelectedBreakfast([...selectedBreakfast]);
      } else {
        const newMeal = {
          name: name,
          quantity: 1,
        };
        setSelectedBreakfast([...selectedBreakfast, newMeal]);
      }
    } else if (mealType === "Lunch") {
      const lunchMeal = selectedLunch.find((meal) => meal.name === name);
      if (lunchMeal) {
        setSelectedLunch([...selectedLunch]);
      } else {
        const newMeal = {
          name: name,
          quantity: 1,
        };
        setSelectedLunch([...selectedLunch, newMeal]);
      }
    }
    setShowSelectedMeals(true);
  };

  const handleQuantityChange = (name, quantity, mealType) => {
    if (mealType === "Breakfast") {
      const updatedMeals = selectedBreakfast.map((meal) => {
        if (meal.name === name) {
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
        if (meal.name === name) {
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
    console.log('Submitting meal request:', selectedMeals);
  
    // Prepare the data to be sent to the backend API
    const dataToSubmit = selectedMeals.map((meal) => ({
      mealId: meal.mealId, // Assuming the API returns the mealId from the backend
      quantity: meal.quantity,
      username: sessionStorage.getItem('username'), // Replace with how you store the username in sessionStorage
    }));
  
    // Make a POST request to the backend API to store the selected meal details
    axios
      .post('http://localhost:3001/orderedMeals/store', dataToSubmit, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        console.log(response.data.message);
        // You can perform any other actions upon successful storage here.
      })
      .catch((error) => {
        console.log('Error storing selected meal details:', error);
        // Handle any errors that occurred during the API call.
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
    <div>
      <Navibar />
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
          Order Meals
        </h1>
      </div>
      <br />
      <div
        className=""
        style={{
          border: "2px",
          borderColor: "#007D34",
          borderStyle: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          padding: "0 10px 50px 0",
          backgroundColor: "#e6faf3",
        }}
      >
        <div>
          <Details />
        </div>
        <hr style={{ width: "80%", marginLeft: "10%" }} />
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
                    Meal ID
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
                    console.log(meal.mealType);
                    return meal.mealType === "Breakfast";
                  })
                  .map((meal) => (
                    <tr key={meal.mealId}>
                      <td>{meal.mealId}</td>
                      <td>{meal.mealName}</td>
                      <td>Rs. {meal.price}</td>
                      <td>
                        <Button
                          className="btn btn-success"
                          style={{ width: "150px" }}
                          onClick={() => handleAdd(meal.mealName, "Breakfast")}
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
                    Meal ID
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
                    console.log(meal.mealType);
                    return meal.mealType === "Lunch";
                  })
                  .map((meal) => (
                    <tr key={meal.mealId}>
                      <td>{meal.mealId}</td>
                      <td>{meal.mealName}</td>
                      <td>Rs. {meal.price}</td>
                      <td>
                        <Button
                          className="btn btn-success"
                          style={{ width: "150px" }}
                          onClick={() => handleAdd(meal.mealName, "Lunch")}
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
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {key === "Breakfast" &&
                    selectedBreakfast.map((meal) => (
                      <tr key={meal.name}>
                        <td>{meal.name}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            max="5"
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
                      <tr key={meal.name}>
                        <td>{meal.name}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            max="5"
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
