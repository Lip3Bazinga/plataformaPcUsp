import 'dotenv/config';
import { Request, Response, NextFunction } from "express"
import userModel, { IUser } from "../models/user.model"
import ErrorHandler from "../utils/ErrorHandlers"
import { CatchAsyncError } from "../middleware/catchAsyncErros"
import jwt, { Secret } from "jsonwebtoken"
import ejs from "ejs"
import path from "path"
import sendMail from '../utils/sendMail';
import { sendToken } from '../utils/jwt';

// Register User
interface IRegistrationBody {
  name: string,
  email: string,
  password: string,
  avatar?: string
}

interface IActivationToken {
  token: string,
  activationCode: string
}

// Activate user
interface IActivationRequest {
  activation_token: string,
  activation_code: string
}

interface ILoginRequest {
  email: string,
  password: string
}

export const registrationUser = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    const isEmailExist = await userModel.findOne({ email })
    if (isEmailExist) {
      return next(new ErrorHandler("Email já cadastrado!", 400))
    }
    const user: IRegistrationBody = {
      name,
      email,
      password
    }
    const activationToken = createActivationToken(user)

    const activationCode = activationToken.activationCode
    const data = {
      user: {
        name: user.name
      },
      activationCode
    }
    const html = await ejs.renderFile(path.join(__dirname, "../mails/activationMail.ejs"), data)

    try {
      await sendMail({
        email: user.email,
        subject: "Ative a sua conta",
        template: "activationMail.ejs",
        data
      })
      res.status(200).json({
        success: true,
        message: `Por favor, verifique o seu email: ${user.email} para ativar a sua conta!`,
        activationToken: activationToken.token
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400))
    }

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

export const createActivationToken = (
  user: any
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
  const token = jwt.sign({
    user,
    activationCode
  },
    process.env.ACTIVATION_SECRET as Secret, {
    expiresIn: "5m"
  })

  return { token, activationCode }

}

export const activateUser = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activation_token, activation_code } = req.body as IActivationRequest
    const newUser: {
      user: IUser;
      activationCode: string
    } = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    ) as {
      user: IUser;
      activationCode: string;
    }

    if (newUser.activationCode !== activation_code)
      return next(new ErrorHandler("Código de ativação inválido", 400))

    const { name, email, password } = newUser.user

    const existUser = await userModel.findOne({ email })

    if (existUser)
      return next(new ErrorHandler("Email já cadastrado", 400))

    const user = await userModel.create({
      name,
      email,
      password
    })

    res.status(201).json({
      success: true
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// Login User
export const loginUser = CatchAsyncError(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body as ILoginRequest
      const user = await userModel.findOne({ email }).select("+password")
      const isPasswordMatch = await user?.comparePassword(password)

      if (!email || !password) return next(new ErrorHandler("Por favor entre com o email e senha", 400))

      if (!user) return next(new ErrorHandler("Email ou senha inválidos.", 400))

      if (!isPasswordMatch) return (new ErrorHandler("Email ou senha inválidos.", 400))

      sendToken(user, 200, res)

    } catch (error: any) {
      console.log("Erro na função sendToken: ", error)
      return next(new ErrorHandler(error.message, 400))
    }

  })

// Logout User
export const logoutUser = CatchAsyncError(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 })
      res.cookie("refresh_token", "", { maxAge: 1 })
      res.status(200).json({
        success: true,
        message: "Deslogado com sucesso."
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400))
    }
  }
)