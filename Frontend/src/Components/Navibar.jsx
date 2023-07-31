import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonLinesFill } from 'react-icons/bs';
import {BsBoxArrowRight} from  'react-icons/bs';
import './NaviStyle.css';
import { BsFillPatchExclamationFill } from 'react-icons/bs'
import Profile from './Profile';

const navbarStyleCSS = {
  '--bs-navbar-nav-link-padding-x': '3.8rem',
  '--bs-navbar-padding-y': '0.9rem',
};

function Navibar() {
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem("accessToken");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="whole-navi" style={navbarStyleCSS}>
        <Container className="S">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
            <Nav.Link as={Link} to="/dashboard" id="navbar-link">
                Dashboard
              </Nav.Link>
		        <NavDropdown title="Attendance" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/view-attendance">View Attendance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-attendance">Manage Attendance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/attendance-report">Attendance Report</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Leave" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/view-leave">View Leave</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/request-leave">Request Leave</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/approve-leave">Approve Leave</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-leave">Manage Leave</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Meals" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/order-meals">Order meals</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/meal-reports">Meal Reports</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-meals">Manage Meals</NavDropdown.Item>
            </NavDropdown>

            {/* <NavDropdown title="Overtime" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/view-OT">View Overtime</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/request-OT">Request Overtime</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/approve-OT">Approve Overtime</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-OT">Manage Overtime</NavDropdown.Item>
            </NavDropdown> */}

            {/* <NavDropdown title="Payroll" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/view-payroll">View Payroll</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-payroll">Manage Payroll</NavDropdown.Item>
            </NavDropdown> */}

            <NavDropdown title="Enrolments" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/view-enrolments">View Pending Enrolments</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/approve-enrolments">Approve Enrolments</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/all-enrolments">All Enrolments</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-registration">Add Enrolments</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage-employee">Manage Employees</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="CVs" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/view-cv"> View Received CVs</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/approve-cv">Approved CVs</NavDropdown.Item>
            </NavDropdown>
            </Nav>

            <NavDropdown title="Advertesement" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/advertesement">Recruitment Announcement</NavDropdown.Item>
            </NavDropdown>

            <Nav className="ml-auto" style={{paddingLeft:'50px'}}>
              <NavDropdown align="end" title={<BsPersonLinesFill style={{ fontSize: "23px" }}/>}>
                <NavDropdown.Item onClick={handleShowProfileModal}>My profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowModal}>Logout <BsBoxArrowRight style={{paddingLeft:'15px',fontSize:'35px'}}/></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsFillPatchExclamationFill style={{fontSize:'21px'}}/>
            Logout Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout} as={Link} to="/">
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <Profile show={showProfileModal} handleClose={handleCloseProfileModal} />
    </>
  );
}

export default Navibar;

