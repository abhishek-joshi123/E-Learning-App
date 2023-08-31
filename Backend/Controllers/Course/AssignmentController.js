import slugify from "slugify"
import cloudinary from "../../Config/cloudinary.js"
import AssignmentModel from "../../Schemas/CourseSchemas/AssignmentModel.js"
import CourseModel from "../../Schemas/CourseSchemas/CourseModel.js"

 

 export const createAssignmentController = async(req, res) => {
    try {
        const {title, duedate} = req.body
        if(!title) {
            return res.status(400).send({ 
                success:false, 
                message: 'Enter a valid title'
            })
        }
        if(!duedate) {
            return res.status(400).send({ 
                success:false, 
                message: 'Due date is required'
            })
        }
        const {originalname, size} = req.file
        const options = {
            resource_type: "auto",
            allowed_formats: [
                'pdf'
            ],
            folder: 'course assignments' 
        }

        const result = await cloudinary.uploader.upload(req.file.path, options)
        if(!result?.secure_url) {
            return res.status(400).send({
                success: false,
                message: 'Assessment url not found'
            })
        }
        const assetURL = result.secure_url
        const assetPublicId = result.public_id

        const assignment = {
            fileName : originalname, 
            fileSize : size,
            assetURL : assetURL,
            assetPublicId: assetPublicId
        }
        const {id} = req.params;
        const Course = await CourseModel.findById(id);
        const Assignment = await new AssignmentModel({title, duedate, assignment, slug:slugify(title)}).save(); 
        Course.assignments.push(Assignment)
        await Course.save()
        res.status(200).send({
            success: true,
            message: 'Assignment created Successfully',
            Assignment, 
            Course
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating Assignment',
            error
        })
    }
 }


 export const getassignmentpdfController = async (req,res) => {
    try {
        const {id} = req.params
        const Assignment = await AssignmentModel.findById(id)
        const pdfUrl = Assignment.assignment.assetURL
            
        res.status(200).send({
            success: true,
            message: 'pdf found successfully',
            pdfUrl
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating Assignment',
            error
        })
    }
 }