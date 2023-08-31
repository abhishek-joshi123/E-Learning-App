import mongoose from "mongoose"

const AssignmentSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    }, 
    slug: {
        type:String,
        required:true
    },
    assignment: {
        fileName: {
            type: String,
            required: true
        },
        fileSize: {
            type: Number,
            required: true
        },
        assetURL: {
            type: String,
        },
        assetPublicId: {
            type: String
        }
    },
    duedate: {
        type: Date,
        default: Date.now
    },
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssignmentResponses'
        }
    ]
},{
    timestamps:true
})

export default mongoose.model('assignments', AssignmentSchema)
 