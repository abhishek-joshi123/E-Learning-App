import CourseModel from "../../Schemas/CourseSchemas/CourseModel.js";
import ModuleModel from "../../Schemas/CourseSchemas/ModuleModel.js";


export const createModuleController = async(req, res) => {

    try {
        const {title} = req.body
        if(!title) {
            return res.status(400).send({
                success:false,
                message: 'Enter a valid title'
            }) 
        }
            
        const {id} = req.params;

        const Course = await CourseModel.findById(id);
        const InstructorId = Course.instructor.toString()
        if(InstructorId !== req.user._id) {
            return res.status(400).send({
                success:false,
                message: 'You are not aloowed to create a model in this Course'
            })
        }
        const Module = await new ModuleModel({title}).save(); 
        Course.modules.push(Module)
        await Course.save()
        res.status(200).send({
            success: true,
            message: 'module created Successfully',
            Module, 
            Course
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in creating module',
            error
        })
    }
}

export const getLessonController = async(req, res) => {
    try {
        const ModuleId = req.params.id;
        const Module = await ModuleModel.findById(ModuleId).populate('lessons')
        const Lessons = Module.lessons
        res.status(200).send({
            success: true,
            message: 'lessons found successfully',
            Lessons
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in finding lessons',
            error
        }) 
    }

}