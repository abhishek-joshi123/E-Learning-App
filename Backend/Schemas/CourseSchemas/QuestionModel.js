import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({

    question: {
        type:String,
        required:true
    },
    slug: {
        type:String,
        required:true
    },
    options: [
        {
           text: {
            type:String,
            required: true
           },
           isCorrect: { 
            type: Boolean,
            default:false
           }
        }
    ]
},{
    timestamps:true
})

export default mongoose.model('questions', questionSchema)
 