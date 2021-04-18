import asyncHandler from 'express-async-handler'
import generateToken from '../Utils/generateToken.js'
import User from '../models/userModel.js'

//@des Auth user and get token
//@route POST /api/USERS/LOGIN
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //  res.send({ email, password })
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email and password')
  }
})
//@des REGISTER A NEW USER
//@route POST /api/USERS
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  console.log('register user')
  const { firstname, lastname, email, password } = req.body
  //  res.send({ email, password })
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({ firstname, lastname, email, password })
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUserFirstName = asyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      firstname: user.firstname,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
const getUserLastName = asyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      firstname: user.firstname,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
const getAllUsers = asyncHandler(async (req, res) => {
  // res.send('Success')
  const users = await User.find({})
  res.json(users)
})

export {
  authUser,
  registerUser,
  getAllUsers,
  getUserProfile,
  getUserFirstName,
  getUserLastName,
}
