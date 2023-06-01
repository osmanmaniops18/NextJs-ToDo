"use client"



import { Context } from '@/components/Clients'
import React, { useContext } from 'react'
import { redirect } from 'next/navigation'

const page = () => {
    const {user}=useContext(Context)
    if(!user._id) return redirect("/login")
  return (
    <div className='loader'>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
    </div>
  )
}

export default page