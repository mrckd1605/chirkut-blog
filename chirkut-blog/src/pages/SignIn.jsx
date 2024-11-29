import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux' 
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData,setFormData] = useState({})
  const {loading,error:errMessage} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      dispatch(signInStart())
      const res = await fetch('/api/auth/sign-in',
        {
          method:"POST",
          body:JSON.stringify(formData),
          headers:{
              'Content-type': 'application/json; charset=UTF-8'
          }
        }
      )
      const data = await res.json()
      if(data.success===false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }
    catch(error){
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left part  */}
        <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ChirKut</span>
            Blog
        </Link> 
        <p className='text-sm mt-5'>
          Well Come to ChirKut Blog. 
          In you have already an account please sign in with your email and password.
        </p>
        </div>
        {/* right part  */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value = "Your Email"/>
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value = "Your Password"/>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' outline className='mt-5' type='submit' disabled = {loading}>
              {
                loading?(
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading..</span>
                  </>
                ):'SignIN'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              SignUp
            </Link>
          </div>
          {
            errMessage && 
            <Alert className='mt-5' color='failure'>{errMessage}</Alert>
            
          }
        </div>
      </div>
    </div>
  )
}
