import { validationResult } from "express-validator";
import UserModel from "../../Schemas/UserModel.js";
import CourseModel from "../../Schemas/CourseSchemas/CourseModel.js";
import slugify from "slugify";

export const createCourseController = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
    }
    try {
        const {title, description, startDate, endDate} = req.body
        const Course = new  CourseModel ({title, description, startDate, endDate, slug:slugify(title), instructor: req.user._id})
        await Course.save() 
        res.status(200).send({
            success: true,
            message: 'Course created successfully',
            Course
        })

    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating course',
            error
        })
    }
}

export const getCoursesController = async(req, res) => {
    try {
        const Courses = await CourseModel.find({})
        res.status(200).send({
            success: true,
            message: `${Courses.length} Course found`,
            Courses
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in getting courses',
            error
        })
    }
}

export const enrollStudentsController = async(req, res) => {

    try {
        const CourseId = req.params.id;
        const Course = await CourseModel.findById(CourseId);
        const StudentId = req.user._id;
        Course.students.push(StudentId)
        await Course.save()
        res.status(200).send({
            success: true,
            message: `You are successfully enrolled in ${Course.title} course`,
            Course
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in enrolling students',
            error
        })
    }
}