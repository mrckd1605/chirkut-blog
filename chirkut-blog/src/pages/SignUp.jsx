import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'

export default function SignUp() {
  const [formData,setFormData] = useState({})
  const [errMessage,setErrMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      setErrMessage(null)
      const res = await fetch('/api/auth/sign-up',
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
        setErrMessage(data.message)
      }
      if(res.ok){
        navigate('/sign-in')
      }
      setLoading(false)
    }
    catch(error){
      setErrMessage(data.message)
      setLoading(false)
      console.log("error is coming ",error)
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
          Here you can gain knoledge of computer science.
          If you have not an account please sign up.
        </p>
        </div>
        {/* right part  */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value = "Your username"/>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
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
                ):'SignUp'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              SignIn
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
