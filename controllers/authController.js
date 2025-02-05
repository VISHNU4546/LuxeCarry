
const user = require("../models/User");
const bcrypt = require("bcrypt")
const jwt  =  require("jsonwebtoken");
require('dotenv').config();
module.exports.registerUser =  async(req,res)=>{
        try{
           
              let {fullname,email,password,mobile} = req.body;
			  console.log(req.body);
              if(!fullname||!email||!password||!mobile){
                returnreq.flash("error", "Enter All Details");
				return res.redirect("/");
          
              }
              let User = await user.findOne({email});
            //   console.log(User);
              if(User){
                req.flash("error", "You already have an account, please login.");
      return res.redirect("/");
                  }
              
              const pass = await bcrypt.hash(password,10);
            //   console.log(pass);
               let createUser = await user.create({
                fullname:fullname,email:email,contact:mobile,password:pass});
              let token =  jwt.sign({email,id:createUser._id},process.env.JWT,{expiresIn:'24h'})
              res.cookie('token',token);
			  req.flash("success_msg", "Ragisteration Succesfull");

               return res.redirect("/shop");
              
        }
        catch(err){
            req.flash("error", err.message);
      return res.redirect("/");
}
}

module.exports.loginUser = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const User = await user.findOne({ email});

		// If user not found with provided email
		if (!User) {
			// Return 401 Unauthorized status code with error message
			req.flash("error", "Email or Password incorrect");
			return res.redirect("/");
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, User.password)) {
			const token = jwt.sign(
				{ email: User.email, id: User._id},
				process.env.JWT,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			User.token = token;
			User.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options);
			req.flash("success", "Login Succesfull");
			res.redirect("/shop");
		} else {
			req.flash("error", "Email or Password incorrect");
			return res.redirect("/");
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		req.flash("error", err.message);
		return res.redirect("/");
	}
	}
