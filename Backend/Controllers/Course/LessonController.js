import cloudinary from "../../Config/cloudinary.js";
import LessonModel from "../../Schemas/CourseSchemas/LessonModel.js";
import ModuleModel from "../../Schemas/CourseSchemas/ModuleModel.js";


export const createLessonController = async(req, res) => {
    try {
        const {title} = req.body
        if(!title) {
            return res.status(400).send({ 
                success:false, 
                message: 'Enter a valid title'
            })
        }
        const {originalname, size} = req.file
        const options = {
            resource_type: "auto",
            allowed_formats: [
                'mp4'
            ],
            folder: 'course videos'
        }

        const result = await cloudinary.uploader.upload(req.file.path, options)
        if(!result?.secure_url) {
            return res.status(400).send({
                success: false,
                message: 'video url not found'
            })
        }
        const assetURL = result.secure_url
        const assetPublicId = result.public_id

        const video = {
            fileName : originalname, 
            fileSize : size,
            assetURL : assetURL,
            assetPublicId: assetPublicId
        }
        const {id} = req.params;
        const Module = await ModuleModel.findById(id);
        const Lesson = await new LessonModel({title, video}).save(); 
        Module.lessons.push(Lesson)
        await Module.save()
        res.status(200).send({
            success: true,
            message: 'Lesson created Successfully',
            Lesson, 
            Module
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating lessons',
            error
        })
    }
}