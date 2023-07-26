import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../Components/Navibar";
import axios from "axios";
import { Button, Form, Tabs, Tab, Table, Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import BackButton from "../Components/BackButton";

export default function ApproveCV() {
  const navigate = useNavigate();
  const [listOfCvs, setListOfCvs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cvDetails/listCV-approved", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfCvs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleViewClick = (cvImage) => {
    navigate(`/viewEach-approved-cv/${cvImage}`);
  };

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
          Approved CVs
        </h1>
      </div>
      <div
        style={{
          margin: "50px 220px 20px 180px",
          backgroundColor: "#f7f7f5",
          padding: "40px 0 20px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {listOfCvs.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{color:'#b6b8b2'}}>No CVs to approve.</p>
          </div>
        ) : (
          listOfCvs.map((value) => (
            <div
              className=""
              style={{
                marginLeft: "15%",
                marginRight: "15%",
                paddingTop: "8px",
              }}
              key={value.cvId}
            >
              <Table className="table-hover">
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60px",
                        paddingLeft: "50px",
                      }}
                    >
                      <strong>
                        <div className="title">{value.cvId}</div>
                      </strong>
                    </td>
                    <td
                      style={{
                        width: "80%",
                        textAlign: "left",
                        paddingLeft: "260px",
                      }}
                    >
                      <div className="title">{value.name}</div>
                    </td>
                    <td style={{ width: "80%", textAlign: "left" }}>
                      <div className="title">{value.position}</div>
                    </td>
                    <td style={{ display: "flex", width: "170%" }}>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewClick(value.cvId)}
                      >
                        <BsEyeFill style={{ marginRight: "5px" }} />
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))
        )}
        <div style={{padding:'30px 0 30px 0'}}>
          <BackButton/>
        </div>
      </div>
    </div>
  );
}
