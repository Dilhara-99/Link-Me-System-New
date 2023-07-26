import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import axios from "axios";
import BackButton from "../Components/BackButton";

export default function ViewEachCVApproved() {
  const { cvId } = useParams();
  const [cvImage, setCvImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cvDetails/each-approved-cv/${cvId}`, {
        responseType: "arraybuffer",
      },{
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setCvImage(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cvId]);

  return (
    <div>
      <Navibar />
      {cvImage ? (
        <center>
          <Card
            style={{ marginTop: "50px", maxWidth: "700px", padding: "10px" ,marginBottom:'100px'}}
          >
            <Card.Img variant="top" src={cvImage} alt="CV" />
          </Card>
        </center>
      ) : (
        <p>Loading CV Image...</p>
      )}
    </div>
  );
}
