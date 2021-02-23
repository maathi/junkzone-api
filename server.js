import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"
import router from "./routes/items.js"
import express from "express"
import morgan from "morgan"
import cors from "cors"
const PORT = process.env.PORT || 5000

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())
app.use(cors())

app.use("/api/items", router)
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port:${PORT}`.yellow.bold
  )
)

// Item.create({ name: "t9shir", image: "fo", price: 23 }, function (err, small) {
//   if (err) return
//   console.log(small)
// })
