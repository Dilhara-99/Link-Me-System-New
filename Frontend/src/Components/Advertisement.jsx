import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHandPointRight } from "react-icons/fa";
import hiring from "../Images/hiring.jpg";

console.log(hiring);

export default function Advertisement() {
  const [recruitment, setRecruitments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/advertesement/advertised-data")
      .then((response) => {
        setRecruitments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {recruitment.map((item) => (
        <p key={item.id}>
          <div
            style={{
              width: "100%",
              height: "150px",
              backgroundColor: "#f2d44b",
              padding: "5px 5px 180px 5px ",
              boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <table>
              <tr>
                <td style={{ width: "400px" }}>
                  <div>
                    <h2
                      style={{
                        color: "#0e1c59",
                        fontFamily: "fantasy",
                        fontWeight: "normal",
                        padding: "10px 0 0 10px",
                        fontSize: "40px",
                      }}
                    >
                      WE ARE HIRING !!
                    </h2>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "#0e1c59",
                        fontFamily: "Josefin Sans",
                        fontWeight: "normal",
                        padding: "10px 0 0 30px",
                      }}
                    >
                      Let's Join Our Team Now
                    </h4>
                  </div>
                  <div
                    style={{
                      paddingTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "40px",
                        paddingLeft: "5px",
                        display: "inline-block",
                        paddingTop: "6px",
                        backgroundColor: "#e9f06c",
                      }}
                    >
                      <h5 style={{ fontSize: "15px" }}>
                        Send Your CV &nbsp;&nbsp;
                        <FaHandPointRight />
                        &nbsp;&nbsp;<Link to="/send-cv">Click Here</Link>
                      </h5>
                    </div>
                  </div>
                </td>
                <td style={{ width: "580px", paddingLeft: "60px" }}>
                  <div style={{ marginTop: "-40px", paddingTop: "30px" }}>
                    <h5
                      style={{
                        fontFamily: "Merriweather",
                        fontWeight: "bold",
                        color: "#0e136b",
                      }}
                    >
                      {" "}
                      Open Positions:{" "}
                    </h5>
                    {recruitment.map((item) => (
                      <p key={item.id}>
                        <h5
                          style={{
                            fontFamily: "Merriweather",
                            color: "#1f28c4",
                          }}
                        >
                          {item.position}
                        </h5>
                      </p>
                    ))}
                  </div>
                </td>
                <td style={{ width: "500px" }}>
                  <div className="hiring-image">
                    <center>
                      <img
                        src={hiring}
                        alt="hiring-img"
                        style={{ width: "300px", height: "170px" }}
                      />
                    </center>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <p
                    style={{
                      color: "red",
                      fontFamily: "Merriweather",
                      fontWeight: "bold",
                      fontSize: "23px",
                      paddingLeft: "520px",
                      backgroundColor: "#ed1515",
                    }}
                  >
                    <span style={{ color: "white" }}>
                      Closing Date :&nbsp;&nbsp;&nbsp;<i>{item.closingDate}</i>
                    </span>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </p>
      ))}
    </div>
  );
}
