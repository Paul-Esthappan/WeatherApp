const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

//@dec POST new data
//@route POST /api/signup
//@acess public
const postCreateDetails = async (req, res) => {
  try {
   
    const { username, email, password, phonenumber, address, savedLocations } = req.body;
    const isExistUser = await User.findOne({ email });

    if (!username || !email || !phonenumber || !address ||!password) {
      res.status(400);
      throw new Error("All fields are required");
    } else if (isExistUser) {
      res.status(400).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userdetails = new User({
        username,
        email,
        phonenumber,
        address,
        password: hashedPassword,
        savedLocations,
      });

      await userdetails.save();

 
      return res.status(200).send("User Registered. Please login to continue");
    }
  } catch (error) {
    console.error("Error occurred", error);
    res.status(400).send("Error occurred: " + error.message);
  }
};



//@dec GET user data
//@route POST /api/signin
//@acess privite


const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const userdata = await User.findOne({ email });

    if (!userdata) {
      return res.status(401).send("Email or Username is invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, userdata.password);
    console.log("userdatapsw-",userdata.password,"pswws",password,"ispswalid",isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).send("Password is invalid");
    }

    // Exclude password from the user data before sending the response
    const userWithoutPassword = {
      _id: userdata._id,
      username: userdata.username,
      email: userdata.email,
      phonenumber: userdata.phonenumber,
      address: userdata.address,
     savedLocations : userdata.savedLocations,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 186400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal Server Error");
  }
};



//@dec GET userDetails
//@route GET /api/user/:id
//@acess privite

const getIdDetails = async (req, res, next) => {
    try {
       
        const findUser = await User.findById(req.params.id?.toString());
        if (req.params.id) {
            const userWithoutPassword = {
             _id: findUser._id,
              username: findUser.username,
             email: findUser.email,
             phonenumber: findUser.phonenumber,
              address: findUser.address,
              savedLocations : findUser.savedLocations,
    };
           
    res.status(202).json(userWithoutPassword)
        }
            
            
    } catch (error) {
        next(error)
    }
    
}
    
module.exports = { loginuser,postCreateDetails, getIdDetails }