import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Createtask() {

    const [isTaskVisible, setIsTaskVisible] = useState(false);

    function hideCreateTask(){
        if(isTaskVisible == false){
            setIsTaskVisible(true)
        }

        else{
            setIsTaskVisible(false)
        }
    }

    const [user, setUser] = useState({
        title: "",
        content: "",
    });

    async function submitHandler(e){
       e.preventDefault();

       if(!user.title || !user.content){
        toast.error("All fields are required.")
       }
       
       try {
        const response = await axios.post('http://localhost:8000/api/v1/user/createtask', 
            {
                title: user.title,
                content: user.content
            },

            { withCredentials: true }
        );
        // console.log("taskresponse:- ", response);
        toast.success("Listified")
       } 
       
       catch (error) {
        // console.log("Error:- ", error.message);
        toast.error(response.data.error.message)
       }
    }

  return (
    <form onSubmit={submitHandler} action="" className='absolute flex items-center justify-center'>

            <div className=' ml-[600px] mt-96 flex flex-col shadow-xl shadow-slate-200 rounded-md'>
                <textarea value={user.title} onChange={(e) => setUser({...user, title: e.target.value})} type="text"  placeholder='Title' className='drop-shadow-md rounded-md outline-none border-none h-20 resize-none text-center text-lg p-3'/>
                <textarea value={user.content} onChange={(e) => setUser({...user, content: e.target.value})} type="text" placeholder='Start organizing your tasks' className='h-96 w-96 outline-none border-none p-3'/>
                <button className='bg-blue-500 rounded-md h-10 text-white font-semibold'>Listify</button>
            </div>

    </form>
  )
}

export default Createtask