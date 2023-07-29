import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewLeave from "./Pages/ViewLeave";
import RequestLeave from "./Pages/RequestLeave";
import ApproveLeave from "./Pages/ApproveLeave";
import ManageLeave from "./Pages/ManageLeave";
import ViewAttendance from "./Pages/ViewAttendance";
import ManageAttendance from "./Pages/ManageAttendance";
import OrderMeals from "./Pages/OrderMeals";
import MealReports from "./Pages/MealReports";
import Registration from "./Pages/Registration";
import SendCV from "./Pages/SendCV";
import ApproveCV from "./Pages/ApproveCV";
import ViewCV from "./Pages/ViewCV";
import Advertesement from "./Pages/Advertesement";
import ApproveEnrolments from "./Pages/ApproveEnrolments";
import ViewEnrolments from "./Pages/ViewEnrolments";
import ViewPayroll from "./Pages/ViewPayroll";
import ManagePayroll from "./Pages/ManagePayroll";
import ViewOT from "./Pages/ViewOT";
import RequestOT from "./Pages/RequestOT";
import ApproveOT from "./Pages/ApproveOT";
import ManageOT from "./Pages/ManageOT";
import Dashboard from "./Pages/Dashboard";
import ManageEmployee from "./Pages/ManageEmployee";
import Prelogin from "./Pages/Prelogin";
import ViewEachRegistration from "./Pages/ViewEachRegistration";
import ViewEachRegistration2 from "./Pages/ViewEachRegistration2";
import AllEnrolments from "./Pages/AllEnrolments";
import ViewEachAppEnrolment from "./Pages/ViewEachAppEnrolment";
import ManageMeals from "./Pages/ManageMeals";
import AddAttendance from "./Pages/AddAttendance";
import ViewEachCVInprogress from "./Pages/ViewEachCVInprogress";
import ViewEachCVApproved from "./Pages/ViewEachCVApproved";
import AddEnrolments from "./Pages/AddEnrolments";
import AttendanceReport from "./Pages/AttendanceReport";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Prelogin />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
          <Route path="/manage-attendance" element={<ManageAttendance />} />
          <Route path="/add-attendance" element={<AddAttendance />} />
          <Route path="/request-leave" element={<RequestLeave />} />
          <Route path="/view-leave" element={<ViewLeave />} />
          <Route path="/approve-leave" element={<ApproveLeave />} />
          <Route path="/manage-leave" element={<ManageLeave />} />
          <Route path="/order-meals" element={<OrderMeals />} />
          <Route path="/meal-reports" element={<MealReports />} />
          <Route path="/manage-meals" element={<ManageMeals />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/add-registration" element={<AddEnrolments />} />
          <Route path="/send-cv" element={<SendCV />} />
          <Route path="/approve-cv" element={<ApproveCV />} />
          <Route path="/view-cv" element={<ViewCV />} />
          <Route path="/advertesement" element={<Advertesement />} />
          <Route path="/view-enrolments" element={<ViewEnrolments />} />
          <Route path="/view-payroll" element={<ViewPayroll />} />
          <Route path="/manage-payroll" element={<ManagePayroll />} />
          <Route path="/view-OT" element={<ViewOT />} />
          <Route path="/request-OT" element={<RequestOT />} />
          <Route path="/approve-OT" element={<ApproveOT />} />
          <Route path="/manage-OT" element={<ManageOT />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-employee" element={<ManageEmployee />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route
            path="/view-registrations/:registrationId"
            element={<ViewEachRegistration />}
          />
          <Route path="/approve-enrolments" element={<ApproveEnrolments />} />
          <Route
            path="/view-registrations2/:registrationId"
            element={<ViewEachRegistration2 />}
          />
          <Route path="/all-enrolments" element={<AllEnrolments />} />
          <Route
            path="/view-approved-enrolment/:registrationId"
            element={<ViewEachAppEnrolment />}
          />
          <Route
            path="/viewEach-inprogress-cv/:cvId"
            element={<ViewEachCVInprogress />}
          />
          <Route
            path="/viewEach-approved-cv/:cvId"
            element={<ViewEachCVApproved />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
