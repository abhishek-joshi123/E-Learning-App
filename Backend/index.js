import connectToMongo from './Config/db.js';
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import UserRoute from './Routes/UserRoute.js'
import CourseRoute from './Routes/Course/CourseRoute.js'
import ModuleRoute from './Routes/Course/ModuleRoute.js'
import LessonRoute from './Routes/Course/LessonRoute.js'
import ContentRoute from './Routes/Course/ContentRoute.js'
import AssessmentRoute from './Routes/Course/AssessmentRoute.js'
import QuestionRoute from './Routes/Course/QuestionRoute.js'
import ResponseRoute from './Routes/Course/ResponseRoute.js'
import AssignmentRoute from './Routes/Course/AssignmentRoute.js'
import AssignmentResponseRoute from './Routes/Course/AssignmentResponseRoute.js'

// configure env
dotenv.config();

connectToMongo()

const app = express()

app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }))

const port = process.env.PORT || 5000;
  
app.use(express.json())  

// available routes..
app.use('/api/auth', UserRoute)
app.use('/api/courses', CourseRoute)
app.use('/api/courses/assignment', AssignmentRoute)
app.use('/api/courses/assignment/response', AssignmentResponseRoute)
app.use('/api/courses/module', ModuleRoute)
app.use('/api/courses/module/lesson', LessonRoute)
app.use('/api/courses/module/lesson/content', ContentRoute)
app.use('/api/courses/module/assessment', AssessmentRoute)
app.use('/api/courses/module/assessment/question', QuestionRoute)
app.use('/api/courses/module/assessment/response', ResponseRoute)


app.listen(port, () => {
    console.log(` backend is running at localhost:${port}`);
})
