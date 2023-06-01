"use client"

import Link from "next/link";
import { createContext, useContext, useState } from "react"
import {Toaster, toast} from "react-hot-toast"
import {useRouter} from "next/navigation"


  export const Context=createContext({user:{}})
export const  ContextProvider=({children})=>{
    const[user,setUser]=useState({id:null});
    return <Context.Provider value={{user,setUser}}>
    {children}
    <Toaster/>
    </Context.Provider>
}

export const LogoutButton=()=>{

    const {user,setUser}=useContext(Context)

    const logoutHandler=async()=>{
       try {
        const response=await fetch("/api/auth/logout",)
                const data= await response.json()
                console.log(data)
                if(!data.success) return toast.error(data.message)
                setUser({})
                toast.success(data.message)
        
       } catch (error) {
        return toast.error(error)
       }
    }
    return(
        user._id ?(
            <button className="btn" onClick={logoutHandler}>Logout</button>
        ):(
            <Link href={"/login"}>Login</Link>
        )
      
       
        
    )
}

export const TodoButton=({id,completed})=>{
    const router=useRouter()
    const deleteHandler= async(e,id)=>{
        e.preventDefault()
      try {
        const reso=await fetch(`/api/task/${id}`,{
            method:"DELETE"
        });
        const data=await reso.json();
        if(!data.success) return toast.error(data.message)
        toast.success(data.message)
        router.refresh()
      } catch (error) {
        return toast.error(error)
        
      }

    }
    const updateHandler= async(e,id)=>{
        e.preventDefault()
      try {
        const reso=await fetch(`/api/task/${id}`,{
            method:"PUT"
        });
        const data=await reso.json();
        if(!data.success) return toast.error(data.message)
        toast.success(data.message)
        router.refresh()
      } catch (error) {
        return toast.error(error)
        
      }

    }
    return(
        <>
            <input type="checkbox" checked={completed} onChange={(e)=>updateHandler(e,id)} />
            <button className="btn" onClick={(e)=>deleteHandler(e,id)}>Delete</button>
        </>
    )
    }