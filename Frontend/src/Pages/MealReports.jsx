import React, { useEffect, useState } from "react";
import axios from "axios";
import Navibar from "../Components/Navibar";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { Button } from "@mui/material";

export default function MealReports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orderedMealsDetails/list", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const rows = data.map((item) => ({
    id: item.orderId,
    orderId: item.orderId,
    epf: item.epf,
    mealType: item.mealType,
    mealCode: item.mealCode,
    mealName: item.mealName,
    price: item.price,
    quantity: item.quantity,
  }));

  const columns = [
    {
      field: "orderId",
      headerName: "Order Id",
      width: 140,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "epf",
      headerName: "EPF",
      width: 150,
      align: "celeftnter",
      headerClassName: "header",
    },
    {
      field: "mealType",
      headerName: "Meal Type",
      width: 190,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "mealCode",
      headerName: "Meal Code",
      width: 160,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "mealName",
      headerName: "Meal Name",
      width: 320,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "price",
      headerName: "Price(Rs.)",
      width: 160,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
      align: "left",
      headerClassName: "header",
    },
  ];

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
          Meal Reports
        </h1>
      </div>
      <div
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "85%",
          marginLeft: "100px",
          marginTop: "30px",
          paddingTop: "20px",
        }}
      >
        <div className="data-grid-container">
          <Container>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              sx={{
                boxShadow: 2,
                "& .header": {
                  backgroundColor: "#c2bfc7",
                  fontFamily: "serif",
                  fontSize: "17px",
                },
              }}
            />
            <div
              style={{
                marginTop: "10px",
                paddingLeft: "92%",
                paddingBottom: "20px",
              }}
            >
              <div className="print-button-container">
                <Button variant="contained" onClick={handlePrint}>
                  Print
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
