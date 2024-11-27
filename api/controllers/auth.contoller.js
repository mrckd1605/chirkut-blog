import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'


export const signUp = async (req,res,next)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password || username==='' || email==='' || password===''){
       next(errorHandler(400,'all field are required'))
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
   }catch (error) {
    if (error.code === 11000) { 
        next(error)
    } else {
        next(error)
    }
}
}