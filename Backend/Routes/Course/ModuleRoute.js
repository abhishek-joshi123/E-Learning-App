
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createModuleController, getLessonController } from '../../Controllers/Course/ModuleController.js'


const router = Router()

//  create a module...
router.post('/create-Module/:id', requireSignIn, iSTeacher, createModuleController)

// get lessons
router.get('/get-lessons/:id', getLessonController)


export default router 