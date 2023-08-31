import mongoose from "mongoose"

const AssignmentResponseSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
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
    }
},{
    timestamps:true
})

export default mongoose.model('AssignmentResponses', AssignmentResponseSchema)
 