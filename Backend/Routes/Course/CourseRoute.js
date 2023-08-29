import upload from '../../Middleware/Multer.js'
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createCourseController, enrollStudentsController, getCoursesController } from '../../Controllers/Course/CourseController.js'
import { body } from 'express-validator'


const router = Router()

//  create a course...
router.post('/create-Course', requireSignIn, iSTeacher,[
    body('title', 'enter a valid title').isLength({min: 3}),
    body('description', 'enter a valid description').isLength({min: 3}),
    body('startDate', 'enter a valid startdate').isDate(),
    body('endDate', 'enter a valid endDate').isDate()
], upload.single('thumbnail') ,createCourseController) 

// get all courses...
router.get('/get-all-courses', getCoursesController);

// enroll students to the courses...
router.put('/enroll-students/:id', requireSignIn, enrollStudentsController);

export default router