import express, { Express } from "express"
import { config } from "dotenv"
import ConnectToMongo from "./database/mongodb"
import userRoutes from "./routes/user.routes"

config()
const database = new ConnectToMongo()
database.connectDB()

const port: number | string = process.env.SERVER_PORT || 3000
const app: Express = express()

app.use(express.json())

app.use("/user", userRoutes)

app.listen(port, () => {
  console.log(`Server express init on: ${port}`)
})
