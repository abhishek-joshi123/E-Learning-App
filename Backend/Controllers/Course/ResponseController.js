import AssessmentModel from "../../Schemas/CourseSchemas/AssessmentModel.js";
import ResponseModel from "../../Schemas/CourseSchemas/ResponseModel.js";


export const getResponseController = async(req, res) => {

    try {
        const {score, answers} = req.body
            
        const {id} = req.params;

        const Assessment = await AssessmentModel.findById(id);
        const Response = await new ResponseModel({user: req.user._id, score, answers}).save(); 
        Assessment.response.push(Response)
        await Assessment.save()
        res.status(200).send({
            success: true,
            message: 'response got Successfully',
            Response, 
            Assessment
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in gettting responses',
            error
        })
    }
}