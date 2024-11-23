import express from "express"
import { activateUser, registrationUser, loginUser, logoutUser, updateAccessToken, getUserInfo, socialAuth } from "../controller/user.controller"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
const userRouter = express.Router()

userRouter.post("/registration", registrationUser)

userRouter.post("/activate-user", activateUser)

userRouter.post("/login", loginUser)

userRouter.get("/logout", isAuthenticated, logoutUser)

userRouter.get("/refresh", updateAccessToken)

userRouter.get("/me", isAuthenticated, getUserInfo)

userRouter.get("/social-auth", socialAuth)


export default userRouter 