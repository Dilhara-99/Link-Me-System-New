import React from "react";
import Navibar from "../Components/Navibar";

const ApproveOT = () => {
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
          Approve OverTime
        </h1>
      </div>
    </div>
  );
};
export default ApproveOT;
