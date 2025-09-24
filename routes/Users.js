const express = require("express");
const router = express.Router();
const { Users } = require("../models/")
const { Activities } = require("../models/")
const bycryptjs = require("bcryptjs");
const {validateToken} = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken");

// Creating a new user
router.post('/', async (req, res) => {
    const { fullName, username, password} = req.body;
    //const userExists = Users.findAll({ where: { username: username }});
    try{
        bycryptjs.hash(password, 10).then((hash) => { 
            Users.create({
                fullName: fullName,
                username: username,
                password: hash,
            });
            res.status(201).json("Success!");
        });
    } catch(error){
        res.json({error: "This user already exist!!"});
    }
});

// Logging In with users created
router.post('/login', async (req, res) => {
    const { username, password} = req.body;
    const user = await Users.findOne({ where: {username: username} });
    if (!user) return res.json({error: "User Doesn't Exist!!"})

    bycryptjs.compare(password, user.password).then((match) => {
        if(!match) {
            return res.json({error: "Wrong Username and Password Combination!!"})
        }
        
        const accessToken = sign({
            username: user.username, id: user.id
        }, "Importantsecret", {expiresIn: '7d' });
        Activities.create({
            userId: user.id,
            username: user.username,
            role: "Admin",
            action: "User logged in successfully"
        })
        res.json({ token: accessToken, username: username, id: user.id, role: "admin", message: "Login Successful"});
    });
});

// Getting token 
router.get("/validToken", validateToken, (req, res) => {
    res.json(req.user);
});

// Fetching each user by a specific ID
router.get("/basicinfo/:id", validateToken , async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ['password'] },
    });

    res.json(basicInfo);

})



// Updating Passwords
router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: {username: req.user.username} });

    try{
        bycryptjs.compare(oldPassword, user.password).then( async (match) => {
            if(!match) res.json({error: "Wrong Password Entered ):"});
    
             bycryptjs.hash(newPassword, 10).then((hash) => {
             Users.update({password: hash}, {where: {username: req.user.username}});
                res.json("Success!");
            });
        });
    } catch(error){
        res.json({error: "This user already exist!!"});
    }
})

module.exports = router