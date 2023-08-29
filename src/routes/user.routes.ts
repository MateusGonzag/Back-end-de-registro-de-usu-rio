import { Router } from "express"
import * as valitador from "../middlewares/user-validations.middleware"
import { UserController } from "../controllers/user.controller"

const userRoutes: Router = Router()
const userController = new UserController()

userRoutes.get("/", (req, res): void => {
  res.status(200).json({ msg: "Teste" })
})

userRoutes.post(
  "/register",
  [
    valitador.checkUserDontExists,
    valitador.validateUserName,
    valitador.validateUserEmail,
    valitador.validatePassword,
    valitador.validatePasswordForce,
    valitador.validatePasswordConfirmation,
  ],
  userController.createUser
)

userRoutes.post(
  "/login",
  [
    valitador.checkUserExists,
    valitador.validateUserEmail,
    valitador.validatePassword,
    valitador.passwordMatches,
  ],
  userController.LoginUser
)

export default userRoutes
