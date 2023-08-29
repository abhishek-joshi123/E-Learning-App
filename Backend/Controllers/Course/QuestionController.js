import slugify from "slugify"
import AssessmentModel from "../../Schemas/CourseSchemas/AssessmentModel.js"
import QuestionModel from "../../Schemas/CourseSchemas/QuestionModel.js"


export const createQuestionController = async(req, res) => {
    try {
        const {question, options} = req.body

        if(!question) {
            return res.status(400).send({
                success: false,
                message: 'enter a valid question'
            })
        }
        if(!options) {
            return res.status(400).send({
                success: false,
                message: 'enter valid options'
            })
        }

        const {id} = req.params
        const Assessment = await AssessmentModel.findById(id);
        const Question = await new QuestionModel({question, options, slug:slugify(question)}).save()
        Assessment.questions.push(Question);
        const Score = Assessment.maxScore;
        const NewMaxScore = Score + 10
        Assessment.maxScore = NewMaxScore 
        await Assessment.save()
        res.status(200).send({
            success: true,
            message: 'Question created successfully',
            Question, 
            Assessment
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error in creating Question',
            error
        })
    }
}