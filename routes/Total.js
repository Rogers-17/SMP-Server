const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddleware")
const { Courses, Students, Users} = require("../models")

// /api/totals

router.get("/", async (req, res) => {
    try{
        const totalStudents = await Students.count();
        const totalCourses = await Courses.count();
        const totalUsers = await Users.count();

        res.json({ totalStudents, totalCourses, totalUsers});
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    } 
    
})

module.exports = router;