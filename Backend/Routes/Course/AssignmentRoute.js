 import {Router} from 'express'
import { requireSignIn } from '../../Middleware/FetchUser.js'
import { createAssignmentController, getassignmentpdfController } from '../../Controllers/Course/AssignmentController.js'
import upload from '../../Middleware/Multer.js'

 const router = Router()

router.post('/create-assignment/:id', requireSignIn, upload.single('assignment'), createAssignmentController)

router.get('/get-assignment-pdf/:id', requireSignIn, getassignmentpdfController) 

 export default router