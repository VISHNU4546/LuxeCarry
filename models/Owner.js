const mongoose = require("mongoose");


const ownerSchema  = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
picture:String
})


module.exports = mongoose.model("Owner",ownerSchema);
