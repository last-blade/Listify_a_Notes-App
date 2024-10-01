import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdUpcoming } from 'react-icons/md';
import { CgCalendarToday } from 'react-icons/cg';
import { FaRegCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Sidebar({ hideSidebar, toggleCreateTaskVisibility }) {

    const navigate = useNavigate();

    const handleAddNewList = (e) => {
        e.preventDefault(); 
        toggleCreateTaskVisibility();
    };

    async function logoutHandler(){
        try {
            const response = await axios.get('http://localhost:8000/api/v1/user/logout', 
                {
                    withCredentials: true
                }
            )

            toast.success("Logout successfully");
            navigate("/login");
        } 

        catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-64 font-semibold fixed top-0 left-0 h-full bg-white shadow-md'>
            {/* Sidebar Content */}
            <div className='flex flex-col justify-between h-full p-4'>
                <div className='space-y-5'>
                    {/* Header */}
                    <div className='flex items-center justify-between mt-5'>
                        <h1 className='text-lg font-bold'>Menu</h1>
                        <div className='cursor-pointer' onClick={hideSidebar}>
                            <RxHamburgerMenu size={20} />
                        </div>
                    </div>
                    
                    {/* Search Input */}
                    <input 
                        type="search" 
                        className='bg-gray-200 outline-none border-none my-3 rounded-lg p-2' 
                        placeholder='Search'
                    />
                    
                    {/* Tasks Section */}
                    <div className='space-y-2'>
                        <h1 className='text-sm font-semibold'>Tasks</h1>
                        <div className='ml-2 space-y-3 text-gray-600'>
                            <h1 className='cursor-pointer flex items-center gap-3'><MdUpcoming /> Upcoming</h1>
                            <h1 className='cursor-pointer flex items-center gap-3'><CgCalendarToday /> Today</h1>
                            <h1 className='cursor-pointer flex items-center gap-3'><FaRegCalendarAlt /> Calendar</h1>
                        </div>
                    </div>
                    
                    {/* Lists Section */}
                    <div className='space-y-2'>
                        <h1 className='text-sm font-semibold'>Lists</h1>
                        <div className='ml-2 space-y-3 text-gray-600'>
                            <h1 className='cursor-pointer'>Personal</h1>
                            <h1 className='cursor-pointer'>Work</h1>
                            <h1 className='cursor-pointer'>Today</h1>
                            <h1 className='cursor-pointer'>My List</h1>
                            <div>
                                <button 
                                    className='flex items-center gap-3 focus:outline-none' 
                                    onClick={handleAddNewList}
                                >
                                    <LuPlus /> Add new list
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sign Out Section */}
                <div className='flex items-center space-x-4 text-gray-600'>
                    <a href="#" className='flex items-center gap-3' onClick={logoutHandler}><FaSignOutAlt /> Sign out</a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
