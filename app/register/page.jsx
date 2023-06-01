"use client"

import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
   <div className='login'>
    <section>
        <form>
        <input type='text' placeholder='Enter Your Name' />
            <input type='email' placeholder='Enter Your Email' />
            <input type='password'  placeholder='Enter Your Password'/>
          
            <button type='submit'>Register</button>
            <p>OR</p>
            <Link href={"/register"}>Log in</Link>

        </form>
    </section>
   </div>
  )
}

export const metadata = {
    title: 'Register',
    description: 'Generated by Next.js',
  }
export default page