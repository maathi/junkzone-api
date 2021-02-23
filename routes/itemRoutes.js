import express from "express"
import {
  getItems,
  getItemById,
  createItem,
  deleteItemById,
} from "../controllers/itemController.js"
const router = express.Router()

router.route("/").get(getItems).post(createItem)
router.route("/:id").get(getItemById).delete(deleteItemById)

export default router
