
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createLessonController, getdescriptionVideocontroller } from '../../Controllers/Course/LessonController.js'
import upload from '../../Middleware/Multer.js'


const router = Router()

//  create a Lesson... 
router.post('/create-Lesson/:id', requireSignIn, iSTeacher, upload.single('video'), createLessonController)

router.get('/get-description-video/:id', getdescriptionVideocontroller)
 

export default router 