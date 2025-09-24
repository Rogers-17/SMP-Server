const express = require("express");
const router = express.Router();
const { Courses } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware")

// Fetching all COURSES in no orders
router.get('/', async (req, res) => {
    const allCourses = await Courses.findAll();
    res.json(allCourses);
});

// Fetching COURSES by a specific ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const courses = await Courses.findByPk(id);
    res.json(courses);
});

// Creating COURSES
router.post('/', async (req, res) => {
    const {courseName, code, college } = req.body;
    
    Courses.create({
        courseName: courseName,
        code: code,
        college: college,
    });
    res.json("Course Created Successfully");
})

// // Editing the COURSES title
// router.put('/title', async (req, res) => {
//     const { newtitle, id } = req.body;
//     await Students.update({title: newtitle}, { where: { id: id} })
//     res.json(newtitle);
// })

// // Editing the COURSES test
// router.put('/postText', async (req, res) => {
//     const { newText, id } = req.body;
//     await Students.update({postText: newText}, { where: { id: id} })
//     res.json(newText);
// })

// Deleting COURSES by ID
router.delete('/delete/:id', async (req, res) => {
    const courseId = req.params.id;
    await Courses.destroy({ 
        where: {
        id: courseId,
    },
    });
    res.json("DELETED successfully");
})




module.exports = router