const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = 'Bonjour!';

//Route 1: Creating a new user
router.post('/createuser', [
    //validating data
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async (req, res) =>{
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    //checking if same email already exists or not
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({success, error: "This email already exists"})
        }

        //password hashing using bcrypt js
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //creating new user
        user = await User.create([{
            name: req.body.name,
            email: req.body.email,
            password: secPass
        }]);

        const data = {
            user:{
                id: user.id
            }
        }

        //generating authentication token
        const authtoken = jwt.sign(data, JWT_Secret);
        success = true
        res.json({success, authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//Route 2: Login Authentication using user credentials - email and password, No login required.
router.post('/login', [
    //validating data
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists({min:5})
], async (req, res) =>{

    //If there's any error, it'll show request errors
    const errors = validationResult(req);
    let success = false
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, errors: "Login with correct credential"});
        }

        const compPassword = await bcrypt.compare(password, user.password);
        if(!compPassword){
            return res.status(400).json({success, errors: "Login with correct credential"});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_Secret);
        success = true
        res.json({success, authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})


// Route 3: Get logged in user data. Login required.
router.post('/getuser', fetchuser, async (req, res) =>{
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;