import { Alert, Button, TextInput, Modal } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { updateStart,updateSuccess,updateFailure,deletUserStart,deleteUserSuccess,deletUserFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux' 
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashProfile() {
    const filePickerRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const { currentUser,error } = useSelector(state => state.user)
    const [formData,setFormData] = useState({})
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null)
    const [updateUserError,setUpdateUserError] = useState(null)
    const [showModal,setShowModal] = useState(false)



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

    const handleDeleteUser = async ()=>{
        setShowModal(false)
        try{
            dispatch(deletUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'DELETE'
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(deletUserFailure(data.message))
            }else{
                dispatch(deleteUserSuccess(data))
            }
        }catch(error){
            dispatch(deletUserFailure(error.message))
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
                <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Acount</span>
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
             {
                error && (
                    <Alert color='failure' className='mt-5'>
                        {error}
                    </Alert>
                )
             }
             <Modal show = {showModal} onClose={()=>setShowModal(false)} popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className='text-cernter'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark: text-gray-200 mb-4 mx-auto'/> 
                    </div>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleDeleteUser}>Yes I'm sure</Button>
                        <Button color='gray' onClick={()=>setShowModal(false)}>close</Button>
                    </div>
                </Modal.Body>

             </Modal>
        </div>
    )
}
