import NotificationModel from "../models/notificationModel"
import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErros"
import ErrorHandler from "../utils/ErrorHandlers"
import cron from "node-cron"

// Pega todas as notificações (ADMIN)
export const getNotifications = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 })

    res.status(201).json({
      success: true,
      notifications
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// Update Notification Status - Only ADMIN
export const updateNotification = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const notification = await NotificationModel.findById(req.params.id)

    if (!notification) return next(new ErrorHandler("Notificação não encontrada.", 404))
    else notification?.status ? notification.status = "read" : notification?.status

    await notification.save()

    const notifications = await NotificationModel.find().sort({
      createdAt: -1
    })

    res.status(201).json({
      success: true,
      notifications
    })
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Delete notification -- only admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  await NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo }
  })
})

