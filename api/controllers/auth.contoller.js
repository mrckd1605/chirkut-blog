import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'


export const signUp = async (req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password || username==='' || email==='' || password===''){
        return res.status(400).json({massage:'all filled is required'})
    }

    const hashedpassword = bcryptjs.hashSync(password,10)
  

    const newUser = new User({
        username,
        email,
        password:hashedpassword
    })
   try{
    await newUser.save()
    res.json('singup successfull')
   }catch (err) {
    if (err.code === 11000) { // Handle duplicate key error
        const field = Object.keys(err.keyPattern)[0];
        res.status(400).json({ message: `${field} already exists` });
    } else {
        res.status(500).json({ message: err.message });
    }
}
}