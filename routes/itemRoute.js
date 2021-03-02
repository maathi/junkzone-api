import express from "express"
import {
  getItems,
  getItemById,
  createItem,
  deleteItemById,
  updateItemById,
  createItemReview,
  createItems,
} from "../controllers/itemController.js"
import { protect } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route("/").get(getItems).post(createItem)
router.route("/many").post(createItems)
router.route("/:id").get(getItemById).put(updateItemById).delete(deleteItemById)
router.route("/:id/reviews").post(protect, createItemReview)
export default router
