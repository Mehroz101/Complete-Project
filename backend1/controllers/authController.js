const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto"); // Signup function
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/generateToken");
const Admin = require("../models/Admin");
const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassowrd = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, password: hashPassowrd });
    const userCreated = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userCreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, isUserExist.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      const token = generateToken(isUserExist); // Generate JWT token
      //console.log(token);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: isUserExist,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const forget = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested a password reset. Please make a PUT request to the following link to complete the process: \n\n${resetUrl}`;
    //console.log("BASE_URL:", process.env.BASE_URL); // This should print "http://localhost:5000"

    const isSend = await sendEmail(email, "Password Reset", message);

    if (200) {
      return res.status(200).json({
        success: true,
        message: "Check your email",
        user: user, // Fixed: Return the actual user object
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }
  } catch (error) {
    console.error("Error in forget password:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const resetpass = async (req, res) => {
  const { token, password } = req.body; // Extract the new password from the request body

  try {
    // Find the user by the reset token and ensure the token hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    // If no user is found, respond with an error
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Password reset token is invalid or has expired" });
    }
    const hashPassowrd = await bcryptjs.hash(password, 10);

    // Update the user's password and clear the reset token and expiration
    user.password = hashPassowrd;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user information
    await user.save();

    // Send a success response
    res.json({ msg: "Password has been reset" });
  } catch (err) {
    // If an error occurs, log it and send a server error response
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const AdminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const isUserExist = await Admin.findOne({ username });
    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "username not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, isUserExist.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      const token = generateToken(isUserExist); // Generate JWT token
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const AdminSignup = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    const createdAdmin = await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Admin registered successfully!",
      user: createdAdmin,
    });
  } catch (error) {
    console.error(`Error in adminSignup function - ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const checkLogin = async (req, res) => {
  try {
    console.log(req.user.id);
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      admin,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const changepassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    const isMatch = await bcryptjs.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const hashPassowrd = await bcryptjs.hash(newPassword, 10);
    admin.password = hashPassowrd;
    await admin.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  signup,
  login,
  forget,
  resetpass,
  AdminLogin,
  AdminSignup,
  checkLogin,
  changepassword,
};
