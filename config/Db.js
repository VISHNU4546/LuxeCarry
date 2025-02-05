const mongoose = require('mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("err in Db connection");
}) 

module.exports = mongoose.connection;