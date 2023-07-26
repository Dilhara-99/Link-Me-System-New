import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navibar from "../Components/Navibar";
import { Button, Table, Modal } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import BackButton from "../Components/BackButton";

export default function AllEnrolments() {
  const [listofenrolments, setlistofenrolments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/approved/all", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setlistofenrolments(response.data);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/view-approved-enrolment/${id}`);
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
          All Approved Enrolments
        </h1>
      </div>
      <div
        style={{
          margin: "50px 200px 20px 200px",
          borderRadius: "5px",
          backgroundColor: "#f7f7f5",
          padding: "20px 0 20px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {listofenrolments &&
          listofenrolments.map((value) => (
            <div
              className=""
              style={{ marginLeft: "15%", marginRight: "15%" }}
              key={value.id}
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
                        <div className="title">{value.id}</div>
                      </strong>
                    </td>
                    <td
                      style={{
                        width: "80%",
                        textAlign: "left",
                        paddingLeft: "240px",
                      }}
                    >
                      <div className="title">{value.nameWithInitials}</div>
                    </td>
                    <td style={{ width: "80%" }}>
                      <Button
                        variant="secondary"
                        onClick={() => handleClick(value.id)}
                      >
                        <BsEyeFill style={{ marginRight: "5px" }} />
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))}
        <div style={{ paddingTop: "30px" }}>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
