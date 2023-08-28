import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'contents'
        }
    ],
    // vedio..
},{
    timestamps:true
})

export default mongoose.model('lessons', LessonSchema)
 