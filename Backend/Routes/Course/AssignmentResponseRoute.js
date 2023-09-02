import {Router} from 'express'
import { requireSignIn } from '../../Middleware/FetchUser.js'
import upload from '../../Middleware/Multer.js'
import { SubmitAssignmentController } from '../../Controllers/Course/AssignmentResponseController.js'

const router = Router()

router.post('/submit-assignment/:id', requireSignIn, upload.single('assignment'), SubmitAssignmentController) 

export default router