import { Router, Request, Response } from "express"

const userRoutes: Router = Router()

userRoutes.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ msg: "Teste" })
})

export default userRoutes
