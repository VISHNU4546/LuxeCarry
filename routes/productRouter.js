const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const productModel = require("../models/Product");
router.get("/createproduct",(req,res)=>{
    res.render("createproducts");
})

router.post("/createproduct",upload.single('image'),async(req,res)=>{
    let{name,price,discount,bgcolor,panelcolor,textcolor} =req.body;

    let product = await productModel.create({
        image:req.file.buffer,
        name,price,discount,bgcolor,panelcolor,textcolor
    });
 req.flash("success","Product create Successfully");
 res.redirect("/shop");

})

module.exports = router;