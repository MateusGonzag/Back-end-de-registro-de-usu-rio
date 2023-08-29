import { UserModel } from "./../models/users/user.model"
import { Request, Response } from "express-serve-static-core"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserController {
  async createUser(req: Request, res: Response): Promise<void | object> {
    const { userName, userEmail, password } = req.body

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const userData = {
      userName,
      userEmail,
      passwordHash,
    }

    try {
      const user = new UserModel(userData)
      await user.save()

      if (!user) {
        return res.status(400).json({ msg: "Erro ao salvar usuário" }) // verifica se salvou
      }

      res.status(201).json({ msg: "Usuário criado com sucesso!" })
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }

  async LoginUser(req: Request, res: Response): Promise<void> {
    const { userEmail } = req.body
    const user = await UserModel.findOne({ userEmail: userEmail })
    try {
      const secret = process.env.SECRET

      jwt.sign(
        {
          id: user._id,
        },
        secret
      )

      res.status(200).json({ msg: "Autenticação realizada com sucesso!" })
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }
}
