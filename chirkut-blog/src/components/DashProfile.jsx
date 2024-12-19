import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { updateStart,updateSuccess,updateFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux' 

export default function DashProfile() {
    const filePickerRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const { currentUser } = useSelector(state => state.user)
    const [formData,setFormData] = useState({})
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null)
    const [updateUserError,setUpdateUserError] = useState(null)
    const dispatch = useDispatch()
    const handleImageChange=(e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])

    const uploadImage = async ()=>{
        console.log("uploading image")
    }


    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setUpdateUserError(null)
        setUpdateUserSuccess(null)
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes made')
            return
        }
        try{
            dispatch(updateStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }else{
                dispatch(updateSuccess(data))
                setUpdateUserSuccess('User profile update successfully')
            }
        }catch(error){
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <input type='file' accept='image/*' 
            onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                onClick={()=>filePickerRef.current.click()}>
                    <img alt='user' src={imageFileUrl || currentUser.profilePicture}
                        className='rounded-full w-full h-full border-8 object-cover border-[lightgray]'>
                    </img>
                </div>
                <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput type='email' placeholder='email' id='email' defaultValue={currentUser.email}
                     onChange={handleChange}
                />
                <TextInput type='password' placeholder='password' id='password'
                     onChange={handleChange}
                />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
             </form>
             <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Acount</span>
                <span className='cursor-pointer'>Sign Out</span>
             </div>
             {
                updateUserSuccess && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSuccess}
                    </Alert>
                )
             }
             {
                updateUserError && (
                    <Alert color='failure' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )
             }
        </div>
    )
}
