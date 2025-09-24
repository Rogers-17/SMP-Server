const express = require("express")
const router = express.Router();
const { Activities } = require("../models")

router.get("/all", async (req, res) => {
    try{
        const allActivities = await Activities.findAll();
        res.json(allActivities);
    } catch(error) {
        console.error(error)
    }
})

router.post("/", async (req, res) => {

    const { userId, username, role, action } = req.body;
    try{
    
         const activities = await Activities.create({
            userId: userId,
            username: username,
            role: role,
            action: action,
        })
        res.status(201).json(activities);
        
    } catch(error) {
        console.error(error)
        res.status(500).json("Error creating activity")
    }
})

// Deleting STUDENTS by ID
router.delete('/delete/:id', async (req, res) => {
    const activityId = req.params.id;
    await Activities.destroy({ 
        where: {
        id: activityId,
    },
    });
    res.json("DELETED successfully");
})




module.exports = router