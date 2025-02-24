import { app } from "./app"
import { v2 as cloudinary } from "cloudinary"
import 'dotenv/config';
import connectDB from "./utils/db";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
})

// Create server
app.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`)
  connectDB()
})

// app.listen(5001, "0.0.0.0", () => {
//   console.log(`Server is connected with port 5000`)
//   connectDB()
// })