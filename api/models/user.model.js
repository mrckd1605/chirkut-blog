
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        
            username: {
                type: String,
                required: true,
                uinique: true
            },
            email: {
                type: String,
                required: true,
                uinique: true
            },
            password: {
                type: String,
                required: true,
                uinique: true
            },
    }
    ,
    {timestamps:true}
)

const User = mongoose.model('User',userSchema)

export default User