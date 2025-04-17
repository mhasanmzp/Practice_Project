const express = require("express");
const apiRoutes = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secretKey = "#Roadsterlife";
module.exports = function (app) {
  apiRoutes.post("/register", async (req, res) => {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        return res.status(400).json("All Fields are required");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json("The User Already Exists !");
      }

      const randomUserId = Math.floor(Math.random() * 10000);
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = new User({
        email,
        name,
        password: hashedPassword,
        userId: randomUserId,
      });

      await userData.save();

      res.status(200).json("You're Registered Successfully");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  apiRoutes.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json("Email and Password, Both are Required !");
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json("No User Found, Please Register First !");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          secretKey,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "You're Logged In Successfully!",
          token: token,
        });
      } else {
        res.status(400).json("Wrong Credentials !");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  apiRoutes.post("/profile", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required!" });
    }

    try {
      const user = await User.findOne({ userId: userId }).select("name email");
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong: " + err.message });
    }
  });

  app.use("/", apiRoutes);
};
