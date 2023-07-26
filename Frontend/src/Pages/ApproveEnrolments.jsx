import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navibar from "../Components/Navibar";
import BackButton from "../Components/BackButton";
import { BsEyeFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";

function ApproveEnrolments() {
  const [listofenrolments, setlistofenrolments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null); // Track the ID to delete
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [idToApprove, setIdToApprove] = useState(null); // Track the ID to approve
  const [approveStatus, setApproveStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addDetails/pending`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setlistofenrolments(response.data);
      });
  }, []);

  const HandleReject = (id) => {
    setIdToDelete(id); // Set the ID to delete in the state
    setShowModal(true);
  };

  const confirmReject = () => {
    axios
      .delete(`http://localhost:3001/addDetails/reject/${idToDelete}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setShowModal(false);
        setlistofenrolments((prevList) =>
          prevList.filter((item) => item.id !== idToDelete)
        ); // Remove the rejected record from the list
        navigate(0); // Redirect to the previous page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApprove = (id) => {
    setIdToApprove(id); // Set the ID to approve in the state
    setShowApprovalModal(true);
  };

  const confirmApprove = () => {
    axios
      .put(`http://localhost:3001/addDetails/approved/${idToApprove}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        console.log("Enrolment approved");
        setShowApprovalModal(false);
        setlistofenrolments((prevList) =>
          prevList.map((item) => {
            if (item.id === idToApprove) {
              return { ...item, approveStatus: "Approved" };
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = (id) => {
    navigate(`/view-registrations2/${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeApprovalModal = () => {
    setShowApprovalModal(false);
  };

  return (
    <div>
      <div>
        <Navibar />
      </div>
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
          Approve Enrolments
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
        {listofenrolments.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "70px" }}>
            <p style={{ color: "#b6b8b2" }}>No enrolments to approve.</p>
          </div>
        ) : (
          listofenrolments &&
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
                        width: "30px",
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
                        paddingLeft: "70px",
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
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleApprove(value.id)}
                        style={{ width: "130%" }}
                        disabled={value.approveStatus === "Approved"}
                      >
                        <BsCardChecklist style={{ marginRight: "5px" }} />
                        Approve
                      </Button>
                    </td>
                    <td style={{ paddingLeft: "50px" }}>
                      <Button
                        variant="danger"
                        onClick={() => HandleReject(value.id)}
                        style={{ width: "140%" }}
                      >
                        <BsFillTrashFill style={{ marginRight: "5px" }} />
                        Reject
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

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reject Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reject this enrollment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmReject}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showApprovalModal} onHide={closeApprovalModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Approval Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve this enrollment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeApprovalModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ApproveEnrolments;
