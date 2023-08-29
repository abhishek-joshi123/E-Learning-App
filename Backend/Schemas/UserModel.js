import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        trim:true
    },
    email: { 
        type:String,
        required:true,
        unique:true 
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: Number,
        default: 0
    }

},{
    timestamps:true     // this will store the time at which user created account....
})

export default mongoose.model('users', UserSchema)
 