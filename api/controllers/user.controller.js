import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"

export const test = (req,res)=>{
    res.json({massage:"api is working"})
}


export const updateUser = async (req, res, next) => {
    try {
      
        if (req.user.id !== req.params.userId) {
            return next(errorHandler(403, "You are not allowed to update this user."));
        }

 
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(errorHandler(400, "Password should be at least 6 characters long."));
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

   
        if (req.body.username) {
            const username = req.body.username;
            if (username.length < 6 || username.length > 20) {
                return next(errorHandler(400, "Username should be between 6 and 20 characters."));
            }
            if (username.includes(" ")) {
                return next(errorHandler(400, "Username cannot contain spaces."));
            }
            if (username !== username.toLowerCase()) {
                return next(errorHandler(400, "Username must be in lowercase."));
            }
            if (!/^[a-z0-9]+$/.test(username)) { // Fixed logic
                return next(errorHandler(400, "Username can only contain lowercase letters and numbers."));
            }
        }

    
        const updates = {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            ...(req.body.password && { password: req.body.password }) // Include password only if it exists
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found."));
        }

   
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
