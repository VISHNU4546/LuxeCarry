// index.js
const express = require('express');
const path = require('path');
const DB = require("./config/Db");
const cookieParser = require('cookie-parser');
const indexRoute = require("./routes/index");
const userRoutes = require("./routes/userRouter");
const ownerRoutes = require("./routes/ownerRouter");
const productRoutes = require("./routes/productRouter");
require('dotenv').config();
const cors = require('cors');
const app = express();
const expressSession = require("express-session");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors());
 app.use(flash());

 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");


 app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
 
//Routes
app.use('/',indexRoute);
app.use('/owner',ownerRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});