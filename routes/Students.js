const express = require("express");
const router = express.Router();
const { Students } = require("../models");
const { Activities } = require("../models");
const bycryptjs = require("bcryptjs");
const { studentValidate } = require("../middlewares/StudentMiddleware")
const { sign } = require("jsonwebtoken");

// Fetching all STUDENTS in no orders
router.get('/', async(req, res) => {
    const allStudents = await Students.findAll();
    res.json(allStudents);
});

// Fetching STUDENTS by a specific ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Students.findByPk(id, {
        attributes: {exclude: ['password'] },
    });
    res.json(student);
});


// Creating STUDENTS
router.post('/', async (req, res) => {
    const {studentName ,studentId, password ,major } = req.body;
    
    try{
        await bycryptjs.hash(password, 10).then( async (hash) => {
        const newStudents =  await Students.create({
                studentName: studentName,
                studentId: studentId,
                password: hash,
                role: "student",
                major: major,
            });
            res.status(201).json(newStudents);

            Activities.create({
            userId: newStudents.id,
            username: newStudents.studentName,
            role: newStudents.role,
            action: "student created successfully"
        })
        })
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(401).json({ message: "Student ID exist"})
        }
        console.error('Unexpected error:', error)
        res.status(500).json("Internal Server error");
    }
})

// Logging In with users created
router.post('/login', async (req, res) => {
    const { studentId, password} = req.body;
    const student = await Students.findOne({ where: {studentId: studentId} });
    if (!student) return res.json({error: "User Doesn't Exist!!"})

    bycryptjs.compare(password, student.password).then((match) => {
        if(!match) {
            return res.json({error: "Wrong student ID and Password Combination!!"})
        }
        
        const studentToken = sign({
            studentId: student.studentId, id: student.id
        }, "Importantsecret", {expiresIn: '7d' });

        Activities.create({
            userId: student.id,
            username: student.studentName,
            role: student.role,
            action: "Logged in successfully"
        })
        res.json({ studentToken: studentToken, studentId: studentId, id: student.id, role:"student", message: "Login Successful"});
    });
});

// // Editing the STUDENTS title
// router.put('/title', async (req, res) => {
//     const { newtitle, id } = req.body;
//     await Students.update({title: newtitle}, { where: { id: id} })
//     res.json(newtitle);
// })

// // Editing the STUDENTS test
// router.put('/postText', async (req, res) => {
//     const { newText, id } = req.body;
//     await Students.update({postText: newText}, { where: { id: id} })
//     res.json(newText);
// })

// Updating Passwords
router.put('/changepassword', studentValidate,  async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const student = await Students.findOne({ where: {studentId: req.student.studentId} });

    try{
        bycryptjs.compare(oldPassword, student.password).then( async (match) => {
            if(!match) res.json({error: "Wrong Password Entered ):"});
    
             bycryptjs.hash(newPassword, 10).then((hash) => {
             Activities.update({password: hash}, {where: {studentId: req.student.studentId}});
                res.status(201).json("Success!");
            });
        });
    } catch(error){
        res.status(500).json({error: "Error updating password!!"});
    }
})

// Deleting STUDENTS by ID
router.delete('/delete/:id', async (req, res) => {
    const studentId = req.params.id;
    await Students.destroy({ 
        where: {
        id: studentId,
    },
    });
    res.json("DELETED successfully");
})




module.exports = router