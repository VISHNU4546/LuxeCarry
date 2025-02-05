const mongoose = require("mongoose");


const userSchema  = new mongoose.Schema({
    fullname:String,
    email:String,
    contact:Number,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
orders:{
    type:Array,
    default:[]
},
picture:String
})


module.exports = mongoose.model("User",userSchema);
