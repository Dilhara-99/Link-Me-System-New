import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewEachCVApproved() {
  const { cvId } = useParams();
  const [cvImage, setCvImage] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/cvDetails/each-approved-cv/${cvId}`,
        {
          responseType: "arraybuffer",
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setCvImage(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cvId]);

  const handleReject = () => {
    setShowRejectModal(false);

    axios
      .delete(`http://localhost:3001/cvDetails/rejected-cv/${cvId}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(-1);
        toast.success("CV Checked!", {
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
        console.log(error);
        toast.error("Failed to checked CV!");
      });
  };

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
      <Navibar />
      {cvImage ? (
        <center>
          <Card
            style={{
              marginTop: "50px",
              maxWidth: "700px",
              padding: "10px",
              marginBottom: "100px",
            }}
          >
            <Card.Img variant="top" src={cvImage} alt="CV" />
          </Card>
        </center>
      ) : (
        <p>Loading CV Image...</p>
      )}
      <Card
        style={{
          padding: "10px ",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "5px",
          marginBottom: "100px",
          marginLeft:"460px",
          width: "600px",
        }}
      >
        <div style={{ paddingLeft: "250px" }}>
          <Button variant="primary" onClick={() => setShowRejectModal(true)}>
            Finalized
          </Button>
        </div>
      </Card>

      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Finalized?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Finalized
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
