import express from "express"
import {
  registerUser,
  getUsers,
  authUser,
  getUserById,
} from "../controllers/userController.js"
const router = express.Router()

router.route("/").get(getUsers).post(registerUser)
router.route("/login").post(authUser)
router.route("/:id").get(getUserById)
// router.route("/:id").get(getItemById).delete(deleteItemById)

export default router
