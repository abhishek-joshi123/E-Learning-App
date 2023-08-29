
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createAssessmentController } from '../../Controllers/Course/AssessmentController.js'

const router = Router()

router.post('/create-assessment/:id', requireSignIn, iSTeacher, createAssessmentController)

export default router