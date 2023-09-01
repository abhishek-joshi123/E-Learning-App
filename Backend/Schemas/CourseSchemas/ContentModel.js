import mongoose from "mongoose"

const ContentSchema = new mongoose.Schema({

    heading: {
        type:String,
        required:true
    },
    explanation: {
        type:String,
        required:true
    } 
},{
    timestamps:true
})

export default mongoose.model('contents', ContentSchema)
 