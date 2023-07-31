import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navibar from "../Components/Navibar";
import { Button, Form, Tabs, Tab, Table, Modal } from "react-bootstrap";
import axios from "axios";
import BackButton from "../Components/BackButton";

export default function ApproveLeave() {
  const [listOfLeaves, setListOfLeaves] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [idToApprove, setIdToApprove] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const { leaveId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/leave/list")
      .then((response) => {
        setListOfLeaves(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleApprove = (leaveId) => {
    setIdToApprove(leaveId);
    setShowApproveModal(true);
  };

  const confirmApproved = () => {
    axios
      .put(`http://localhost:3001/leave/approved/${idToApprove}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get("http://localhost:3001/leave/list")
          .then((response) => {
            setListOfLeaves(response.data);
            setShowApproveModal(false);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error approving leave:", error);
      });
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
  };

  const handleReject = (leaveId) => {
    setIdToDelete(leaveId);
    setShowRejectModal(true);
  };

  const confirmRejected = () => {
    axios
      .put(`http://localhost:3001/leave/rejected/${idToDelete}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get("http://localhost:3001/leave/list")
          .then((response) => {
            setListOfLeaves(response.data);
            setShowRejectModal(false);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error rejecting leave:", error);
      });
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
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
          Approve Leave
        </h1>
      </div>
      <div style={{ marginTop: "40px" }}>
        {listOfLeaves.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: "#b6b8b2" }}>No Leaves to Approve.</p>
          </div>
        ) : (
          <center>
            <Table striped bordered hover style={{ width: "90%" }}>
              <tbody>
                <tr>
                  <th style={{ width: "80px", textAlign: "center" }}>EPF</th>
                  <th style={{ width: "120px", textAlign: "center" }}>
                    Leave Type
                  </th>
                  <th style={{ width: "140px", textAlign: "center" }}>
                    Start Date
                  </th>
                  <th style={{ width: "140px", textAlign: "center" }}>
                    End Date
                  </th>
                  <th style={{ width: "10px", textAlign: "center" }}>
                    # Dates
                  </th>
                  <th style={{ width: "40px", textAlign: "center" }}></th>
                  <th style={{ width: "40px", textAlign: "center" }}></th>
                </tr>
              </tbody>
              <br />

              {listOfLeaves.map((employee) => (
                <tbody>
                  <tr key={employee.leaveId}>
                    <td style={{ width: "80px", textAlign: "center" }}>
                      {employee.epf}
                    </td>
                    <td style={{ width: "120px", textAlign: "center" }}>
                      {employee.leaveType}
                    </td>
                    <td style={{ width: "140px", textAlign: "center" }}>
                      {employee.fromDate}
                    </td>
                    <td style={{ width: "140px", textAlign: "center" }}>
                      {employee.toDate}
                    </td>
                    <td style={{ width: "30px", textAlign: "center" }}>
                      {employee.numberOfDays}
                    </td>
                    <td style={{ width: "40px", textAlign: "center" }}>
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(employee.leaveId)}
                      >
                        Approve
                      </Button>
                    </td>
                    <td style={{ width: "40px", textAlign: "center" }}>
                      <Button
                        variant="danger"
                        onClick={() => handleReject(employee.leaveId)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </center>
        )}
        <div style={{marginTop:'90px'}}>
          <BackButton />
        </div>
      </div>
      <Modal show={showApproveModal} onHide={closeApproveModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Approve Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Approve this leave?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeApproveModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmApproved}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRejectModal} onHide={closeRejectModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reject Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Reject this leave?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRejectModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRejected}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
