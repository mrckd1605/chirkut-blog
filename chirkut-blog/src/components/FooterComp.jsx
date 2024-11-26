import React from 'react'
import { Footer } from 'flowbite-react'
import {BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'

export default function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className=''>
       <Footer.Copyright href='#' by='chandan blog' year={new Date().getFullYear()}/>
      </div>
      <div className='flex gap-6 sm:mt-4 mt-4 sm:justify-center'>
        <Footer.Icon href='#' icon={BsFacebook}/>
        <Footer.Icon href='#' icon={BsInstagram}/>
        <Footer.Icon href='#' icon={BsTwitter}/>
        <Footer.Icon href='#' icon={BsGithub}/>
      </div>
    </Footer>
  )
}
