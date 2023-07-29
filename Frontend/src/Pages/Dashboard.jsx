import React from "react";
import { Col, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import attendance from "../Images/attendance.jpeg";
import meals from "../Images/meals.jpg";
import overtime from "../Images/overtime.jpg";
import leave from "../Images/leave.jpeg";
import payrolls from "../Images/payrolls.jpeg";
import enrolments from "../Images/enrolments.jpeg";
import cv from "../Images/cv.jpg";
import recruitment from "../Images/recruitment.jpg";
import "./Dashboard.css";

console.log(attendance);
console.log(meals);
console.log(overtime);
console.log(leave);
console.log(payrolls);
console.log(enrolments);
console.log(cv);
console.log(recruitment);

function Dashboard() {
  return (
    <div style={{ backgroundColor: "#edece8" }}>
      <br />
      <br />
      <div
        style={{
          backgroundColor: "#edece8",
          padding: "20px 0 20px 680px",
        }}
      >
        <h1 style={{ fontFamily: "serif" }}>Dashboard</h1>
      </div>
      <br />
      <br />
      <Row style={{ marginLeft: "80px", marginRight: "50px" }}>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-image">
              <img src={attendance} alt="attendance-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Attendance</h5>
              <DropdownButton
                id="attendance-dropdown"
                title="Attendance"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/view-attendance">
                  View Attendance
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/manage-attendance">
                  Manage Attendance
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-image">
              <img src={meals} alt="meals-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Meals</h5>
              <DropdownButton
                id="meals-dropdown"
                title="Meals"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/order-meals">
                  Request Meals
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/meal-reports">
                  Meal Reports
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/manage-meals">
                  Manage Meals
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-image">
              <img src={overtime} alt="overtime-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">OverTime</h5>
              <DropdownButton
                id="overtime-dropdown"
                title="OverTime"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/view-OT">
                  View OT
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/request-OT">
                  Request OT
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/approve-OT">
                  Approve OT
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/manage-OT">
                  Manage OT
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card">
            <div className="card-image">
              <img src={leave} alt="leave-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Leave</h5>
              <DropdownButton
                id="leave-dropdown"
                title="Leave"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/view-leave">
                  View leave
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/request-leave">
                  Request leave
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/approve-leave">
                  Approve leave
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/manage-leave">
                  Manage leave
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <Row style={{ marginLeft: "80px" }}>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card" style={{ height: "100%" }}>
            <div className="card-image">
              <img
                src={enrolments}
                alt="enrolments-img"
                style={{ height: "210px" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Enrolments</h5>
              <DropdownButton
                id="enrolments-dropdown"
                title="Enrolments"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/view-enrolments">
                  View Pending Enrolments
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/approve-enrolments">
                  Approve Enrolments
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/all-enrolments">
                  All Enrolments
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/add-registration">
                  Add Enrolments
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/manage-employee">
                  Manage employees
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card" style={{ height: "100%" }}>
            <div className="card-image">
              <img src={cv} alt="cv-img" style={{ height: "210px" }} />
            </div>
            <div className="card-body">
              <h5 className="card-title">CVs</h5>
              <DropdownButton
                id="cvs-dropdown"
                title="CVs"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/view-cv">
                  View Received CVs
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/approve-cv">
                  View Approved CVs
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
        <Col sm={6} md={3} style={{ marginBottom: "20px" }}>
          <div className="card" style={{ height: "100%" }}>
            <div className="card-image">
              <img
                src={recruitment}
                alt="recruitment-img"
                style={{ height: "210px" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Advertesement</h5>
              <DropdownButton
                id="advertesement-dropdown"
                title="Advertesement"
                style={{ width: "100%" }}
              >
                <Dropdown.Item as={Link} to="/advertesement">
                  Advertesement
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <br />
    </div>
  );
}

export default Dashboard;
