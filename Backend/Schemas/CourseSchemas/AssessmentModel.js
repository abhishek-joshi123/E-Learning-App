import mongoose from "mongoose"

const assessmentSchema = new mongoose.Schema({

    title: {
        type:String,
        required:true
    },
    slug: {
        type:String,
        required:true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questions'
        } 
    ],
    maxScore: {
        type: Number,
        default: 0
    },
    response: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'responses'
        }
    ]
},{
    timestamps:true
})

export default mongoose.model('assessments', assessmentSchema)
 