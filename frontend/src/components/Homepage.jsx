import React, { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";
import Createtask from "./Createtask";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function Homepage() {
    // State to manage sidebar visibility
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    
    // State to manage Createtask visibility
    const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);

    // Handler to toggle sidebar visibility
    const hideSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Handler to toggle Createtask visibility
    const toggleCreateTaskVisibility = () => {
        setIsCreateTaskVisible(prevState => !prevState);
    };

    // Optional: Handler to explicitly hide Createtask (useful for closing)
    const hideCreateTask = () => {
        setIsCreateTaskVisible(false);
    };

    const accessToken = useSelector((state) => state.user.accessToken);

    console.log("Access Token:-", accessToken);

    return (
        <div className="relative">
            {accessToken ?            
                    <div className="flex items-center relative">

                    {isSidebarVisible ? (
                    <Sidebar 
                        hideSidebar={hideSidebar} 
                        toggleCreateTaskVisibility={toggleCreateTaskVisibility} // Pass the handler as a prop
                    />
                ) : (
                    <div onClick={hideSidebar} className="ml-5 mt-5 cursor-pointer">
                        <RxHamburgerMenu size={20} />
                    </div>
                )}


                <div className={`flex-1 p-4 ${isSidebarVisible ? "ml-64" : "ml-20"}`}>
                    <AllTasks />
                </div>


                {isCreateTaskVisible && <Createtask onClose={hideCreateTask} />}
                </div>: <Login/>
            }
        </div>
    );
}

export default Homepage;
