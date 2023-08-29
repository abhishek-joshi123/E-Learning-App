import mongoose from "mongoose"

const ResponseSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    score: {
        type: Number,
        default: 0  
    }, 
    answers: [
        {
            question : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'questions'
            },
            answer: {
                type:String,
                default: ''
            }
        }
    ]
},{
    timestamps:true
})

export default mongoose.model('responses', ResponseSchema)
 