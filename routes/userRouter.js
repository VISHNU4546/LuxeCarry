const express = require("express");
const { registerUser,loginUser } = require("../controllers/authController");
const router = express.Router();
require('dotenv').config();
router.get("/register",(req,res)=>{
    res.send("hello");
})

router.post('/register',registerUser);
router.post("/login",loginUser);
module.exports = router;