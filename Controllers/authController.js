import jwt from "jsonwebtoken";
import DoctorSchema from "../models/DoctorSchema.js";
import UserSchema from "../models/UserSchema.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      user = await UserSchema.findOne({ email });
    } else if (role === "doctor") {
      user = await DoctorSchema.findOne({ email });
    }

    // if user is exist
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new UserSchema({
        name,
        email,
        password: hashPassword,
        role,
      });
    }
    if (role === "doctor") {
      user = new DoctorSchema({
        name,
        email,
        password: hashPassword,
        role,
      });
    }
    await user.save();
    res.status(200).json({ success: true, message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    const patient = await UserSchema.findOne({ email });
    const doctor = await DoctorSchema.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    // match the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);
    const { role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: { ...rest },
      token,
      role,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to Login",
      data: { ...rest },
      token,
      role,
    });
  }
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};
