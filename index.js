const express = require("express");
const app = express();
const cors = require("cors");
exports.app = app;
require("dotenv").config();
const db = require("./models");
app.use(express.json());
app.use(cors());

// Routers
const studentsRouter = require("./routes/Students");
app.use("/api/students", studentsRouter);

const usersRouter = require("./routes/Users");
app.use("/api/auth", usersRouter);

const coursesRouter = require("./routes/Courses");
app.use("/api/courses", coursesRouter);

const totalRouter = require("./routes/Total");
app.use("/api/totals", totalRouter);

const activityRouter = require("./routes/Activities");
app.use("/api/activities", activityRouter);

// DB connections
db.sequelize.sync().then(() => {
    console.log("Database is synced ✅");
    app.listen(process.env.PORT || 4000 ,
        () => {
            console.log("Server is running");
        }
    );
});
