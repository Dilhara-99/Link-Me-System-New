import React, { useState, useEffect } from "react";
import axios from "axios";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { Button } from "@mui/material";

export default function AttendanceReport() {
  const [listOfAllAttendance, setListOfAllAttendance] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/attendance/allAttendanceDetails", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => setListOfAllAttendance(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const rows = listOfAllAttendance.map((item) => ({
    id: item.attendanceId,
    attendanceId: item.attendanceId,
    epf: item.epf,
    date: item.date,
    inTime: item.inTime,
    outTime: item.outTime,
  }));

  const columns = [
    {
      field: "attendanceId",
      headerName: "Id",
      width: 170,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "epf",
      headerName: "EPF",
      width: 220,
      align: "celeftnter",
      headerClassName: "header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 253,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "inTime",
      headerName: "In Time",
      width: 225,
      align: "left",
      headerClassName: "header",
    },
    {
      field: "outTime",
      headerName: "Out Time",
      width: 225,
      align: "left",
      headerClassName: "header",
    },
  ];

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
      <div style={{ backgroundColor: "#f7f7f5", paddingBottom: "300px" }}>
        <Navibar />
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "98%",
            marginLeft: "20px",
            marginTop: "30px",
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
            Attendance Reports
          </h1>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "170px",
            marginRight: "170px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "30px 30px 10px 30px",
          }}
        >
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
              <Button variant="contained" onClick={handlePrint}>
                Print
              </Button>
            </div>
          </Container>
        </div>
        <br />
      </div>
    </div>
  );
}
