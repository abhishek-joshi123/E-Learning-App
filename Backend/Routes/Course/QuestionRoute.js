
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createQuestionController } from '../../Controllers/Course/QuestionController.js'

const router = Router()

router.post('/create-question/:id', requireSignIn, iSTeacher, createQuestionController)

export default router