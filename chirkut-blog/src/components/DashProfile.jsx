import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'



export default function DashProfile() {
    const filePickerRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const { currentUser } = useSelector(state => state.user)
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
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-6'>
            <input type='file' accept='image/*' 
            onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                onClick={()=>filePickerRef.current.click()}>
                    <img alt='user' src={imageFileUrl || currentUser.profilePicture}
                        className='rounded-full w-full h-full border-8 object-cover border-[lightgray]'>
                    </img>
                </div>
                <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username}/>
                <TextInput type='email' placeholder='email' id='email' defaultValue={currentUser.email}/>
                <TextInput type='password' placeholder='password' id='password'/>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
             </form>
             <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Acount</span>
                <span className='cursor-pointer'>Sign Out</span>
             </div>
        </div>
    )
}
