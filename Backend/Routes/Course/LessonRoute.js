
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createLessonController } from '../../Controllers/Course/LessonController.js'


const router = Router()

//  create a Lesson... 
router.post('/create-Lesson/:id', requireSignIn, iSTeacher, createLessonController)


export default router