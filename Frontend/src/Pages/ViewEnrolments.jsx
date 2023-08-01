import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Table } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import { BsEyeFill } from "react-icons/bs";
import BackButton from "../Components/BackButton";

function ViewEnrolments() {
  const [listofenrolments, setlistofenrolments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/inprogress", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setlistofenrolments(response.data);
      });
  }, []);

  const handleViewClick = (registrationId) => {
    navigate(`/view-registrations/${registrationId}`);
  };

  return (
    <div style={{backgroundColor:'white'}}>
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
            backgroundColor:'#f7f7f5'
          }}
        >
          View Pending Enrolments
        </h1>
      </div>
      <br />
      <div>
        <div
          style={{
            margin: "50px 200px 20px 200px",
            borderRadius: "5px",
            backgroundColor: "#f7f7f5",
            padding: "20px 0 20px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {listofenrolments.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p style={{ color: "#b6b8b2" }}>No enrolments to view.</p>
            </div>
          ) : (
            listofenrolments.map((value) => (
              <div
                className=""
                style={{ marginLeft: "15%", marginRight: "15%" }}
                key={value.registrationId}
              >
                <Table className="table-hover">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "center",
                          width: "70px",
                          paddingLeft: "50px",
                        }}
                      >
                        <strong>
                          <div className="title">{value.registrationId}</div>
                        </strong>
                      </td>
                      <td
                        style={{
                          width: "80%",
                          textAlign: "left",
                          paddingLeft: "120px",
                        }}
                      >
                        <div className="title">{value.nameWithInitials}</div>
                      </td>
                      <td style={{ display: "flex", width: "150px" }}>
                        <Button
                          variant="secondary"
                          onClick={() => handleViewClick(value.registrationId)}
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
          <div style={{ paddingLeft: "350px", paddingTop: "30px" }}>
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEnrolments;
