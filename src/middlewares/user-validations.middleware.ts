import bcrypt from "bcrypt"
import { UserModel } from "../models/users/user.model"
import validator from "validator"
import { Request, Response, NextFunction } from "express"

export const checkUserDontExists = async (
  req?: Request,
  res?: Response,
  next?: NextFunction
): Promise<Response> => {
  const { userEmail } = req.body
  const userExists = await UserModel.findOne({ userEmail: userEmail })

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" })
  }

  next()
}

export const checkUserExists = async (
  req?: Request,
  res?: Response,
  next?: NextFunction
): Promise<Response> => {
  const { userEmail } = req.body
  const userExists = await UserModel.findOne({ userEmail: userEmail })

  if (!userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" })
  }

  next()
}

export const validateUserName = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { userName } = req.body

  if (!userName) {
    return res.status(422).json({ msg: "O nome é obrigatório!" })
  }

  next()
}

export const validateUserEmail = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { userEmail } = req.body

  if (!userEmail) {
    return res.status(422).json({ msg: "O email é obrigatório!" })
  } else if (!validator.isEmail(userEmail)) {
    return res.status(422).json({ msg: "O email precisa ser válido" })
  }

  next()
}

export const validatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { password } = req.body

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" })
  }

  next()
}

export const validatePasswordForce = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { password } = req.body
  const passwordRegex: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,}$/
  if (!password.match(passwordRegex)) {
    return res.status(422).json({
      msg: "A senha deve conter pelo menos 6 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial",
    })
  }

  next()
}

export const validatePasswordConfirmation = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" })
  }

  next()
}

export const passwordMatches = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { password, userEmail } = req.body

  const user = await UserModel.findOne({ userEmail: userEmail })

  const checkPassword = await bcrypt.compare(password, user.passwordHash)

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" })
  }

  next()
}
