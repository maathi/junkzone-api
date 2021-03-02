import dotenv from "dotenv"
import connectDB from "./config/db.js"
// import colors from "colors"
import itemRouter from "./routes/itemRoute.js"
import userRouter from "./routes/userRoute.js"
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

app.use("/api/items", itemRouter)
app.use("/api/users", userRouter)

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on Port:${PORT}`)
)
