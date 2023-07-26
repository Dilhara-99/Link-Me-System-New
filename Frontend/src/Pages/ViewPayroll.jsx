import React from "react";
import Navibar from "../Components/Navibar";
import DetailsForPayroll from "../Components/DetailsForPayroll";
import BackButton from "../Components/BackButton";

export default function ViewPayroll() {
  return (
    <div>
      <Navibar />
      <br />
      <div>
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
            View Payroll
          </h1>
        </div>
        <br />
      </div>
      <div
        className=""
        style={{
          border: "2px",
          borderColor: "#007D34",
          borderStyle: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          padding: "0 77px 50px 90px",
          textAlign: "left",
          backgroundColor: "#e6faf3",
        }}
      >
        <div>
          <DetailsForPayroll />
        </div>
        <br />
        <hr style={{ width: "80%", marginLeft: "5%" }} />
        <br />
        <div>
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td className="">Basic Salary</td>
                <td></td>
                <td></td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td className="">Salary Arrears</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">
                  <strong>SubTotal</strong>
                </td>
                <td></td>
                <td></td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td className="">No Pay(Days)</td>
                <td>0.00</td>
                <td>No Pay</td>
                <td></td>
              </tr>
              <tr>
                <td className="">Pay Cut(Days)</td>
                <td>0.00</td>
                <td>Pay Cut</td>
                <td></td>
              </tr>
              <tr>
                <td className="">Net Gross</td>
                <td></td>
                <td></td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td className="">Total for EPF</td>
                <td></td>
                <td></td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td>
                  <strong>ADDITIONS</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* </tbody>
            </table>
            <hr style={styles.horizontalLine}/>
              <table class="table table-borderless 2">
                <tbody> */}
              <tr>
                <td className="">Normal OT (Hrs.)</td>
                <td>00.00</td>
                <td></td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td className="">Double OT (Hrs.)</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Triple OT (Hrs.)</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Special Allowances</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Attendance Allowances</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Total for Tax</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">
                  <strong>Total Gross</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">
                  <strong>DEDUCTIONS</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* </tbody>
                </table>
              <hr style={styles.horizontalLine}/>
                <table class="table table-borderless 3">
                  <tbody> */}
              <tr>
                <td className="">EPF Employee 8%</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>Rs.0000.00</td>
              </tr>
              <tr>
                <td className="">Paye Tax</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Stamp fee</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Welfare Contribution (V)</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Canteen Bill</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Welfare Contribution (F)</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">Total Deductions</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="">
                  <strong>Total Net</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* </tbody>
                  </table>
                  <hr style={{width:'80%',marginLeft:'10%'}}/>
                  <table class="table table-borderless">
                  <tbody> */}
              <tr>
                <td className="">EPF 12%</td>
                <td>Rs.0000.00</td>
                <td>ETF 3%</td>
                <td>Rs.0000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          paddingTop: "60px",
          paddingBottom: "80px",
          paddingRight: "120px",
        }}
      >
        <BackButton />
      </div>
    </div>
  );
}

const styles = {
  horizontalLine: {
    width: "80%",
    marginLeft: "10%",
    borderBottom: "1px dashed black",
  },
};
