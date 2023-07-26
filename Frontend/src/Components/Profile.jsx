import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Profile({ show, handleClose }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/addDetails/profile-details", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>My Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{paddingLeft:'100px',backgroundColor:'#ecf5eb'}}>
        <p style={{color:'#0c5191'}}><strong>Name:</strong> <i>{userDetails.nameWithInitials}</i></p>
        <p style={{color:'#0c5191'}}><strong>EPF:</strong> <i>{userDetails.epf}</i></p>
        <p style={{color:'#0c5191'}}><strong>Department:</strong> <i>{userDetails.department}</i></p>
        <p style={{color:'#0c5191'}}><strong>Designation:</strong> <i>{userDetails.designation}</i></p>
        <p style={{color:'#0c5191'}}><strong>Address:</strong> <i>{userDetails.address}</i></p>
        <p style={{color:'#0c5191'}}><strong>NIC:</strong> <i>{userDetails.nic}</i></p>
        <p style={{color:'#0c5191'}}><strong>Mobile Number:</strong> <i>{userDetails.mobileNumber}</i></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Profile;
