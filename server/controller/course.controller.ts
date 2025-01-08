import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middleware/catchAsyncErros"
import ErrorHandler from "../utils/ErrorHandlers"
import cloudinary from "cloudinary"
import { createCourse } from "../services/course.service"
import CourseModel from "../models/course.model"
import { redis } from "../utils/redis"
import mongoose from "mongoose"
import ejs from "ejs"
import path from "path"
import sendMail from "../utils/sendMail"


// Interfaces 

interface IAddQuestionData {
  question: string,
  courseId: string,
  contentId: string,
}

interface IAddAnswerData {
  answer: string,
  courseId: string,
  contentId: string,
  questionId: string
}

// Upload do curso
export const uploadCourse = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const thumbnail = data.thumbnail
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses"
      })

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }
    createCourse(data, res, next)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// Editar curso
export const editCourse = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const thumbnail = data.thumbnail

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id)
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses"
      })

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    }

    const courseId = req.params.id

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      {
        new: true
      }
    )

    res.status(201).json({
      success: true,
      course
    })

  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Buscar um curso (id)
export const getSingleCourse = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.id
    const isCacheExist = await redis.get(courseId)

    if (isCacheExist) {
      const course = JSON.parse(isCacheExist)
      res.status(200).json({
        success: true,
        course,
      })
    } else {
      const course = await CourseModel.findById(req.params.id)
        .select("-courseData.videoUrl -courseData.seggestion -courseData.questions -courseData.links")

      await redis.set(courseId, JSON.stringify(course))

      res.status(200).json({
        success: true,
        course,
      })
    }
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Buscar todos os cursos
export const getAllCourses = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isCacheExist = await redis.get("allCourses")

    if (isCacheExist) {
      const course = JSON.parse(isCacheExist)
      res.status(200).json({
        success: true,
        course,
      })
    } else {
      const courses = await CourseModel.find()
        .select("-courseData.videoUrl -courseData.seggestion -courseData.questions -courseData.links")

      await redis.set("allCourses", JSON.stringify(courses))

      res.status(200).json({
        success: true,
        courses,
      })
    }
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Pegar conteúdo do curso
export const getCourseByUser = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userCourseList = req.user?.courses
    const courseId = req.params.id

    const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId)

    if (!courseExists) return next(new ErrorHandler("Você não tem acesso a este curso.", 404))

    const course = await CourseModel.findById(courseId)

    const content = course?.courseData

    res.status(200).json({
      success: true,
      content,
    })
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Adicionar dúvida ao curso
export const addQuestion = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { question, courseId, contentId }: IAddQuestionData = req.body
    const course = await CourseModel.findById(courseId)

    if (!mongoose.Types.ObjectId.isValid(contentId)) return next(new ErrorHandler("ID do conteúdo inválido", 400))

    const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))

    if (!courseContent) return next(new ErrorHandler("ID do conteúdo inválido.", 400))

    // Objeto de Nova pergunta
    const newQuestion: any = {
      user: req.user,
      question,
      questionReplies: [],
    }

    // Adicionar a pergunta ao conteúdo do curso
    courseContent.questions.push(newQuestion)

    // Salvando a alteração
    await course?.save()

    res.status(200).json({
      success: true,
      course
    })

  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }
})

// Adicionar dados de resposta
export const addAnswer = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body
    const course = await CourseModel.findById(courseId)

    if (!mongoose.Types.ObjectId.isValid(contentId)) return next(new ErrorHandler("ID de conteúdo inválido", 400))

    const courseContent = course?.courseData?.find((item: any) => {
      item._id.equals(contentId)
    })

    if (!courseContent) return next(new ErrorHandler("ID de conteúdo inválido", 400))

    const question = courseContent?.questions?.find((item: any) => {
      item._id.equals(questionId)
    })

    if (!question) return next(new ErrorHandler("ID de conteúdo inválido", 400))

    // Criando novo objeto de resposta
    const newAnswer: any = {
      user: req.user,
      answer
    }

    // Adicionando a respostas ao conteúdo do curso
    question.questionReplies.push(newAnswer)

    await course?.save()

    if (req.user?._id === question.user._id) {
      // Criar a notificação

    } else {

      const data = {
        name: question.user.name,
        title: courseContent.title
      }

      const html = await ejs.renderFile(path.join(__dirname, "../mails/questionReply.ejs"), data)

      try {
        await sendMail({
          email: question.user.email,
          subject: "Pergunta respondida",
          template: "questionReply.ejs",
          data
        })
      } catch (error: any) {
        next(new ErrorHandler(error.message, 500))
      }

    }

    res.status(200).json({
      success: true,
      course,
    })

  } catch (error: any) {
    next(new ErrorHandler(error.message, 500))
  }

})