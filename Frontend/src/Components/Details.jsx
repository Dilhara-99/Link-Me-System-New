import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Details() {
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [epf, setEPF] = useState("");

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

  return (
    <div>
      <br />
      <div className="sub-header" style={{ fontSize: "20px" }}>
        <div className="row">
          <h5
            className="Row"
            style={{
              paddingLeft: "250px",
              paddingTop:'10px',
              fontFamily: "serif",
            }}
          >
            Name :&nbsp;&nbsp;{nameWithInitials}
          </h5>
          <h5
            className="Row"
            style={{
              paddingLeft: "250px",
              paddingTop:'10px',
              paddingBottom:'20px',
              fontFamily: "serif",
            }}
          >
            EPF&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;{epf}
          </h5>
          
        </div>
      </div>
    </div>
  );
}
