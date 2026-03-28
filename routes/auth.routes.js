const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//to create a user with a hashed password

router.post("/signup", async (req, res) => {
  try {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
    const hashedUser = {
      ...req.body,
      password: hashedPassword,
    };

    // create the user in the DB
    const newUser = await UserModel.create(hashedUser);
    console.log("user created successfully", newUser);
    res.status(201).json({ message: "user created sucessfully in DB" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// to create a login route to find the user by their email and check if they know the password
router.post("/login", async (req, res) => {
  try {
    // to find the user based on their email
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Invalid credentials" });
    } else {
      // if you found the user based on the email we compare the passwords
      const passwordFromFrontend = req.body.password;
      const passwordHashedInDB = foundUser.password;
      const passwordsMatch = bcryptjs.compareSync(
        passwordFromFrontend,
        passwordHashedInDB,
      );
      if (!passwordsMatch) {
        res.status(400).json({ errorMessage: "Invalid credentials" });
      } else {
        //the email exists and the passwords match
        //non secret data into the jwt
        const data = { _id: foundUser._id, username: foundUser.username };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "1w",
        });
        res.status(200).json({ message: "you are logged in!", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// this route checks if the token is valid
router.get("/verify", isAuthenticated, async (req, res) => {
  console.log("here in the verify route");
  res.status(200).json({ message: "Token valid", payload: req.payload });
});
module.exports = router;
