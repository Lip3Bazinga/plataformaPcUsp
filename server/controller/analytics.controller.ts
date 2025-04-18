import { Request, Response, NextFunction } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErros"
import ErrorHandler from "../utils/ErrorHandlers"
import { generateLast12MothsData } from "../utils/analytics.generator"
import UserModel from "../models/user.model"
import CourseModel from "../models/course.model"
import OrderModel from "../models/order.model"

// Get users analytics - Only for admin
export const getUsersAnalytics = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await generateLast12MothsData(UserModel)

    res.status(200).json({
      success: true,
      users,
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// Get users analytics - Only for admin
export const getCoursesAnalytics = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await generateLast12MothsData(CourseModel)

    res.status(200).json({
      success: true,
      courses,
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// Get users analytics - Only for admin
export const getOrdersAnalytics = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await generateLast12MothsData(OrderModel)

    res.status(200).json({
      success: true,
      orders,
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})