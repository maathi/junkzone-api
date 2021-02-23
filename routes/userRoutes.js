import express from "express"
import { registerUser } from "../controllers/userController"
const router = express.Router()

router.route("/").get(getItems).post(createItem)
router.route("/:id").get(getItemById).delete(deleteItemById)

export default router
