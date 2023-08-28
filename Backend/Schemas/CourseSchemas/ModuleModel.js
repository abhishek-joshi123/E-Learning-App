import mongoose from "mongoose"

const ModuleSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lessons'
        }
    ],
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assessments'
    }
},{
    timestamps:true
})

export default mongoose.model('modules', ModuleSchema)
 