import React from 'react'

function Login() {
  return (
    <div className='h-screen flex justify-center border border-red-700 items-center'>
        <div className='space-y-4'>
            <div className='flex justify-center'>
                    <h1 className='text-3xl font-bold'>Log in</h1>
            </div>
            <form action="" className='flex flex-col justify-center items-center space-y-5 border border-gray-400 p-10 px-14 py-24 rounded-md'>
                <h1 className='nerko-one-regular text-4xl bg-gradient-to-r from-orange-400 via-gray-200 to-green-300 bg-clip-text text-transparent'>ListiFy</h1>
                <input type="email" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Email'/>
                <input type="password" className='outline-none border border-gray-400 rounded-md p-1 w-56' placeholder='Password'/>
                <input type="submit" value="Log in" className='bg-blue-500 rounded-md w-56 p-1 font-semibold text-white cursor-pointer'/>
            </form>
            <div className='flex justify-center'>
                <p>Or</p>
            </div>
            <div className='border border-gray-400 p-4 rounded-md flex justify-center items-center'>
                <h1>Don't have an account? <a href="" className='text-[#0095F6] font-semibold'>Sign up</a></h1>
            </div>
        </div>
    </div>
  )
}

export default Login