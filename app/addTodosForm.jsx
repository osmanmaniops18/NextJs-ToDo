"use client"


import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import { Context } from '@/components/Clients'

const addTodosForm = () => {
  const [title,setTitle]=useState("")
  const [descrption,setDescrption]=useState("")
  const router=useRouter()
  const {user}=useContext(Context)

  const submitHandler= async(e)=>{
    e.preventDefault()
    try {
      const response=await fetch("/api/newtask",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",

        },
        body:JSON.stringify({title,descrption})
      }) ;

      const data=await response.json()
      if(!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh()
      setTitle("")
      setDescrption("")
    } catch (error) {
      return toast.error(error)
    }
  }
  if(!user._id) return redirect("/login")
  return (
    <div className='login'>
    <section>
        <form onSubmit={submitHandler}>
            <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Task Title' />
            <input type='text' value={descrption} onChange={(e)=>setDescrption(e.target.value)}  placeholder='Task Descption'/>
          
            <button type='submit'>Add Task</button>
          

        </form>
    </section>
   </div>
  )
}

export default addTodosForm