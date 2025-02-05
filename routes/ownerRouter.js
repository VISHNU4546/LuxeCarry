const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const owner = require("../models/Owner");
const jwt  =  require("jsonwebtoken");
require('dotenv').config();
router.get("/",(req,res)=>{
   
   return res.render("admin");
})


//POST REQUEST
if(process.env.NODE_ENV=="development"){
    router.post("/",async(req,res)=>{
      try{
        let owners = await owner.find();
        if(owners.length>0){
          return res.status(503).send("can't create more then one owner")
        }
        // console.log(req.body);
          let {fullname,email,password} = req.body;
          if(!fullname||!email||!password){
            return res.status(420).send({
              success:false,
              message:"Enter all details"
            });
      
          }
          const pass = await bcrypt.hash(password,10);
          console.log(pass);
           let createOwner = await owner.create({
            fullname:fullname,email:email,password:pass});
             let token =  jwt.sign({email,id:createOwner._id},process.env.JWT,{expiresIn:'24h'})
                  res.cookie('token',token);
            res.status(201).send({
              success:true,
              message:token
            });
          }
      
        catch(err){
          return res.status(420).send({
              success:false,
              message:err.message
            });
          }
        })
    }


module.exports = router;