const User = require("../models/users");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  console.log("req.body ", req.body);

  const { email, password, phone, role } = req.body;
  await User.findOne({ email: email }).then((alreadyUser) => {
    //looking for the email in database
    if (alreadyUser) {
      // if user already exits
      return res.status(409).send("Email already exits");
    } else {
      // save the new user in database
      const newUser = {
        email: email,
        password: sha256(password),
        phone: phone,
        role: role,
      };
      const user = new User(newUser); // modeling the user data to save in database
      user
        .save() // saving the new user in database
        .then(() => {
          res.status(201).send(user);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  console.log("User from database : => ", user);
  if (user) {
    if (user.password === sha256(password)) {
      const accesstoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      }); //expires in 1 day
      user = {
        email: user.email,
        phone: user.phone,
        role: user.role,
        jwt: accesstoken,
      };
      console.log("login user : ", user);
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
