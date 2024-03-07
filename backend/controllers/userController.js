const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details!");
  }

  ///check if user already exist////////
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist!!");
  }

  ////hash password///////////

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  ///////save user in database///////////
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user invalid");
  }
});

///Login user/////

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
       res.json(400)
       throw new Error("please fill all details!!") 
    } 


    const user  = await User.findOne({email: email});

    if (user && await(bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("user not registerd")
    }
}


  ////generate Token////////

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


module.exports = {registerUser, loginUser};
