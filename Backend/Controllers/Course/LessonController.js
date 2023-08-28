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
            
        const {id} = req.params;

        const Module = await ModuleModel.findById(id);
        const Lesson = await new LessonModel({title}).save(); 
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