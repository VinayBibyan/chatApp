import express from "express"
import dotenv from "dotenv"
import path from "path"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"


dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);
const app = express()
const __dirname = path.resolve()

const port = process.env.PORT || 3000

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})