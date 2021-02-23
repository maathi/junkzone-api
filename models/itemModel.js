import mongoose from "mongoose"

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Item = mongoose.model("Item", itemSchema)

export default Item
