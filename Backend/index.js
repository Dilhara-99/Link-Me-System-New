const express = require ("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models');

const usersRouter = require('./routes/Users');
app.use("/auth",usersRouter);

const registrationsRouter = require('./routes/Registrations');
app.use("/addDetails",registrationsRouter);

const mealsRouter = require('./routes/Meals');
app.use("/meals",mealsRouter);

const attendanceRouter = require('./routes/Attendance');
app.use("/attendance",attendanceRouter);

const leaveRouter = require('./routes/Leave');
app.use("/leave",leaveRouter);

const overtimeRouter = require('./routes/OverTime');
app.use("/overtime",overtimeRouter);

const cvDetailsRouter = require('./routes/CvDetails');
app.use("/cvDetails",cvDetailsRouter);

const advertesementRouter = require('./routes/Advertesement');
app.use("/advertesement",advertesementRouter);

const orderedMealsRouter = require('./routes/OrderedMeals');
app.use("/orderedMeals",orderedMealsRouter);

const LeaveBalanceRouter = require('./routes/LeaveBalance');
app.use("/leaveBalance",LeaveBalanceRouter);

db.sequelize.sync().then(() =>{
    app.listen(3001, ( )=> {
        console.log("Server running on port 3001");
    });
});
