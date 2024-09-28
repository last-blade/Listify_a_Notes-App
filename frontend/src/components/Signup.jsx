import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Signup() {

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate();

    async function submitHandler() {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/user/register`, user);
            console.log("Register Response:- ",response)
            toast.success("Login successfully.") 
            navigate("/login")   
        } 
        
        catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='h-screen flex justify-center items-center border border-red-500'>
        <div className='space-y-4'>
            <div className='flex justify-center'>
                    <h1 className='text-3xl font-bold'>Sign up</h1>
            </div>
            <form action="" method='post' className='h-96 space-y-4 flex flex-col justify-center items-center border border-gray-400 p-10 px-14 py-24 rounded-md'>
                <h1 className='nerko-one-regular text-4xl bg-gradient-to-r from-orange-400 via-gray-200 to-green-300 bg-clip-text text-transparent'>ListiFy</h1>
                <input type="text" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Fullname'/>
                <input type="email" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Email'/>
                <input type="password" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Password'/>
                <input type="password" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Confirm password'/>
                <input type="submit" value="Sign up" className='bg-blue-500 rounded-md w-56 p-1 font-semibold text-white cursor-pointer' onSubmit={submitHandler}/>
            </form>
            <div className='flex justify-center'>
                <p>Or</p>
            </div>
            <div className='border border-gray-400 p-4 rounded-md flex justify-center items-center'>
                <h1>Have an account? <a href="/login" className='text-[#0095F6] font-semibold'>Log in</a></h1>
            </div>
        </div>
    </div>
  )
}

export default Signup