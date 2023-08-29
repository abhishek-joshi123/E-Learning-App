import slugify from "slugify"
import AssessmentModel from "../../Schemas/CourseSchemas/AssessmentModel.js"
import ModuleModel from "../../Schemas/CourseSchemas/ModuleModel.js"

 
 export const createAssessmentController = async(req, res) => {
    try {
        const {title} = req.body

        if(!title) {
            return res.status(400).send({
                success: false,
                message: 'enter a valid title'
            })
        }

        const {id} = req.params
        const Module = await ModuleModel.findById(id);
        const Assessment = await new AssessmentModel({title, slug:slugify(title)}).save()
        Module.assessment = Assessment;
        await Module.save()
        res.status(200).send({
            success: true,
            message: 'Assessment created successfully',
            Assessment, 
            Module
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error in creating assessment',
            error
        })
    }
 }