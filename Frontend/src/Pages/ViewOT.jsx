import React from "react";
import Navibar from "../Components/Navibar";
import Details from "../Components/Details";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import BackButton from "../Components/BackButton";

export default function ViewOT() {
  return (
    <div>
      <Navibar />
      <br />
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
          View OverTime
        </h1>
      </div>
      <div
        className=""
        style={{
          border: "2px",
          borderColor: "#007D34",
          borderStyle: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          padding: "0 10px 50px 0",
          backgroundColor: "#e6faf3",
        }}
      >
        <div>
          <Details />
        </div>
        <div>
          <Col md="10" style={{ marginLeft: "9%" }}>
            <Card
              className="card-plain table-plain-bg"
              style={{ backgroundColor: "#e6faf3" }}
            >
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>OT hours</th>
                      <th>OT Type</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>08/06/2023</td>
                      <td>6.5</td>
                      <td>Normal</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>09/06/2023</td>
                      <td>3.5</td>
                      <td>Normal</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>10/06/2023</td>
                      <td>8</td>
                      <td>Normal</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>11/06/2023</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </div>
        <br />
      </div>
      <div style={{ padding: "40px 120px 0 0" }}>
        <BackButton />
      </div>
    </div>
  );
}
