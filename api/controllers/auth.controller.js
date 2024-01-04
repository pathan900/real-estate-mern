import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { erroHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res, next) => {
  const { username, email, password, fullName } = req.body;
  // add a check for missing fields

  // check for empty or null values
  if (
    [username, password, email, fullName].some((field) => field.trim() == "")
  ) {
    return next(erroHandler(400, "Please provide all required fields!"));
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return next(erroHandler(409, "User with email or username already exists"));
  }
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
    });
    // or User.create({})
    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (error) {
    next(error);
  }
};

//signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(erroHandler(400, "Email and password are required!"));
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(erroHandler(404, "User not found"));
    }
    const isValidPassword = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return next(erroHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...restData } = existingUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restData); // httpOnly: no third party app can access
  } catch (error) {
    next(error);
  }
};

// google sign-in sign-up
export const google = async (req, res, next) => {
  const { email, photo, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...restData } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restData);
    } else {
      // on google sign-up we dont get password so generate random and add to db
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // also we dont get unique username in case of google signup so
      const generatedUsername =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = await User.create({
        username: generatedUsername,
        password: hashedPassword,
        email,
        fullName: name,
        avatar: photo,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...restData } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restData);
    }
  } catch (error) {
    next(error);
  }
};
