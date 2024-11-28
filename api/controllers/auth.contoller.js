import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'


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

export const signIn = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password || email==='' || password===''){
      return next(errorHandler(400,'all field are required'))
    }

    try{
        
        const validUser = await User.findOne({email})
        if(!validUser){
            console.log("user not find")
          return next(errorHandler(404,'user not found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
          return next(errorHandler(404,"Incorrect password"))
        }
        
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {httpOnly:true})
        .json(rest)
    }
    catch(error){
        next(error)
    }
}