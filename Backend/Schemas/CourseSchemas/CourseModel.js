import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    }, 
    slug: {
        type:String,
        required:true
    }, 
    description: {
        type:String,
        required:true
    },
    //   thumbnail.
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    modules: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'modules'
        }
    ],
    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assignments'
        }
    ],
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
},{
    timestamps:true
})

export default mongoose.model('Courses', CourseSchema)
 