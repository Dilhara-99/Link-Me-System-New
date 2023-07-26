import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Modal, Form } from "react-bootstrap";
import Navibar from "../Components/Navibar";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewEachCVInprogress() {
  const { cvId } = useParams();
  const [cvImage, setCvImage] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cvDetails/each-inprogress-cv/${cvId}`,{
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

  const handleApprove = () => {
    setShowApproveModal(false);

    axios
      .post(`http://localhost:3001/cvDetails/status-approved/${cvId}`,{
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        navigate(-1);
        toast.success("CV Approved!", {
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
        toast.error("Failed to Approve CV!");
      });
  };

  const handleReject = () => {
    setShowRejectModal(false);

    axios
      .delete(`http://localhost:3001/cvDetails/rejected-cv/${cvId}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(-1);
        toast.success("CV Rejected!", {
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
        toast.error("Failed to Reject CV!");
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
              padding: "30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form>
              <Card.Img variant="top" src={cvImage} alt="CV" />
            </Form>
          </Card>
          <br />
          <Card
            style={{
              padding: "10px ",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "5px",
              marginBottom: "100px",
              width: "600px",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ paddingLeft: "140px" }}>
                <Button
                  variant="primary"
                  onClick={() => setShowApproveModal(true)}
                >
                  Approve
                </Button>
              </div>
              <div style={{ paddingLeft: "150px" }}>
                <Button
                  variant="danger"
                  onClick={() => setShowRejectModal(true)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        </center>
      ) : (
        <p>Loading CV Image...</p>
      )}

      {/* <div style={{ paddingLeft: "100px" }}>
          <BackButton/>
        </div> */}

      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to approve this CV?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowApproveModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reject this CV?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
