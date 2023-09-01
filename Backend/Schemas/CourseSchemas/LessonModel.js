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
    video: {
        fileName: {
            type: String,
            // required: true
        },
        fileSize: {
            type: Number,
            // required: true 
        },
        assetURL: {
            type: String,
        },
        assetPublicId: {
            type: String
        }
    },
},{
    timestamps:true
})

export default mongoose.model('lessons', LessonSchema) 
 