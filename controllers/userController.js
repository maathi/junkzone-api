import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @desc Auth user and get Token
// @route POST /api/users/login
// @acess Public
const authUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  //user authentication
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // User authorization
    })
  } else {
    res.status(401) //401 - Unauthorized
    throw new Error("Invalid email or password")
  }
}

// @desc Register new user
// @route POST /api/users
// @acess Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User Email already Exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials. Unable to register.")
  }
}

// @desc Get all users
// @route GET /api/users
// @acess Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

// @desc GET user Profile
// @route GET /api/users/profile
// @acess Private
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
}
export { registerUser, getUsers, authUser, getUserById }
