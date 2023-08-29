import { connect } from "mongoose"

class ConnectToMongo {
  private readonly url: string
  constructor() {
    this.url = process.env.MONGODB_URL
  }
  async connectDB(): Promise<void> {
    try {
      await connect(this.url)
      console.log("Connected with mongodb")
    } catch (error) {
      console.log(`Connection with mongodb failed: ${error}`)
    }
  }
}

export default ConnectToMongo
