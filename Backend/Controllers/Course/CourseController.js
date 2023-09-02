import { validationResult } from "express-validator";
import UserModel from "../../Schemas/UserModel.js";
import CourseModel from "../../Schemas/CourseSchemas/CourseModel.js";
import slugify from "slugify";
import cloudinary from "../../Config/cloudinary.js";

export const createCourseController = async(req, res) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
    // }
    try {
        const {title, description, startDate, endDate} = req.body
        const { originalname, size} = req.file

        const options = {
            resource_type: "auto",
            allowed_formats: [
                'jpg', 'jpeg', 
                'png', 'gif'
            ],
            folder: 'thumbnails'
        }

        const result = await cloudinary.uploader.upload(req.file.path, options)
        if(!result?.secure_url) {
            return res.status(400).send({
                success: false,
                message: 'thumbnail url not found'
            })
        }
        const assetURL = result.secure_url
        const assetPublicId = result.public_id

        const thumbnail = {
            fileName : originalname,
            fileSize : size,
            assetURL : assetURL,
            assetPublicId: assetPublicId
        }

        const Course = new  CourseModel ({title, description, startDate, endDate, thumbnail, slug:slugify(title), instructor: req.user._id})
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
        const Courses = await CourseModel.find({}).populate('instructor')
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

export const getSingleCourseController = async(req, res) => {

    try {
        const CourseId = req.params.id;
        const Course = await CourseModel.findById(CourseId);
        res.status(200).send({
            success: true,
            message: 'course found successfully',
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

export const getModuleController = async(req, res) => {

    try {
        const CourseId = req.params.id;
        const Course = await CourseModel.findById(CourseId).populate('modules')
        const modules = Course.modules
        res.status(200).send({
            success: true,
            message: 'module found successfully',
            modules
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in finding modules',
            error
        })
    }
}

export const getAssignmentController = async(req, res) => {

    try {
        const CourseId = req.params.id;
        const Course = await CourseModel.findById(CourseId).populate('assignments')
        const assignments = Course.assignments
        res.status(200).send({
            success: true,
            message: 'assignments found successfully',
            assignments
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in finding assignments',
            error
        })
    }
}