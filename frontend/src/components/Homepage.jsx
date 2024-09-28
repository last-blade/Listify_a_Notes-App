import React, { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";
import Createtask from "./Createtask";

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

    return (
        <div className="flex items-center relative">
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className={`flex-1 p-4 ${isSidebarVisible ? "ml-64" : "ml-20"}`}>
                <AllTasks />
            </div>

            {/* Createtask Component */}
            {isCreateTaskVisible && <Createtask onClose={hideCreateTask} />} {/* Conditionally render */}
        </div>
    );
}

export default Homepage;
