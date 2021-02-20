import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"

dotenv.config()
connectDB()
