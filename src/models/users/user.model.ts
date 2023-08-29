import { Schema, model } from "mongoose"

interface IUser {
  userName: string
  userEmail: string
  passwordHash: string
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  passwordHash: { type: String, required: true },
})

export const UserModel = model("User", userSchema)
