const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encryptData } = require("../utils/encryption");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: encryptData({
        message: "User registered successfully",
      }),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        data: encryptData({ message: "Invalid credentials" })
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        data: encryptData({ message: "Invalid credentials" })
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({
      success: true,
      data: encryptData({
        message: "Login successful",
        userId: user._id
      })
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      data: encryptData({ message: "Server error" })
    });

  }
};