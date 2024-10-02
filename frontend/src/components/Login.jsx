import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../../redux/user.slice';
import { LuListChecks } from "react-icons/lu";


function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    async function submitHandler(e) {
        e.preventDefault();

        if(!user.email || !user.password){
            toast.error("All fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/login', 
                {
                    email: user.email,
                    password: user.password
                },

                {
                    withCredentials: true
                }
            )
            
            console.log("Response user:- ", response)
            // console.log("Accesstoke:- ", response.data.data.accessToken);
            dispatch(setAccessToken(response.data.data.accessToken));
            
            toast.success(response.data.message);
            navigate("/");
        } 
        
        catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='space-y-4'>
            <div className='flex justify-center'>
                    <h1 className='text-3xl font-bold'>Log in</h1>
            </div>
            <form onSubmit={submitHandler} action="" className='h-96 flex flex-col justify-center items-center space-y-5 border border-gray-400 p-10 px-14 py-24 rounded-md'>
                <div className='flex justify-center items-center'>
                    <LuListChecks className='h-12 w-12'/>
                    <h1 className='nerko-one-regular text-4xl font-bold ml-2'>ListiFy</h1>
                </div>
                <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} type="email" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Email'/>
                <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} type="password" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Password'/>
                <input type="submit" value="Log in" className='bg-black rounded-md w-56 p-1 font-semibold text-white cursor-pointer'/>
                <h1>____________________________________</h1>
                <a href="" className='text-black hover:underline text-sm'>Forgot password?</a>
            </form>
            <div className='flex justify-center'>
                <p>Or</p>
            </div>
            <div className='border border-gray-400 p-4 rounded-md flex justify-center items-center'>
                <h1>Don't have an account? <a href="/signup" className='text-black underline font-semibold'>Sign up</a></h1>
            </div>
        </div>
    </div>
  )
}

export default Login