import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error('Error Ocurred! ');
  }
});
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Email or Password! ');
  }
});

export default registerUser;