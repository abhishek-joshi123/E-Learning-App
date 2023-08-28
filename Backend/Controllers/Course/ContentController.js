import ContentModel from "../../Schemas/CourseSchemas/ContentModel.js";
import LessonModel from "../../Schemas/CourseSchemas/LessonModel.js";


export const createContentController = async (req, res) => {

    try {
        const {heading, explanation} = req.body
        if(!heading) {
            return res.status(400).send({ 
                success:false,
                message: 'Enter a valid heading'
            })
        }
        if(!explanation) {
            return res.status(400).send({ 
                success:false,
                message: 'Enter a valid explanation'
            })
        }
            
        const {id} = req.params;

        const Lesson = await LessonModel.findById(id);
        const Content = await new ContentModel({heading, explanation}).save(); 
        Lesson.description.push(Content)
        await Lesson.save()
        res.status(200).send({
            success: true,
            message: 'Content created Successfully',
            Content, 
            Lesson
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating Conten-t',
            error
        })
    }
}