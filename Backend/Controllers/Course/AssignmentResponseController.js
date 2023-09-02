import slugify from "slugify"
import cloudinary from "../../Config/cloudinary.js"
import AssignmentResponseModel from "../../Schemas/CourseSchemas/AssignmentResponseModel.js"
import AssignmentModel from "../../Schemas/CourseSchemas/AssignmentModel.js"

 

 export const SubmitAssignmentController = async(req, res) => {
    try {
        const {originalname, size} = req.file
        const options = {
            resource_type: "auto",
            allowed_formats: [
                'pdf'
            ],
            folder: 'course assignments responses'
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
        const Assignment = await AssignmentModel.findById(id);
        const AssignmentResponse = await new AssignmentResponseModel({user: req.user._id, assignment}).save(); 
        Assignment.responses.push(AssignmentResponse)
        await Assignment.save()
        res.status(200).send({
            success: true,
            message: 'Assignment response got Successfully',
            AssignmentResponse, 
            Assignment
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in getting Assignment response',
            error
        })
    }
 }