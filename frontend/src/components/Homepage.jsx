import React, { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";

function Homepage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const hideSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    };

    
  return (
    <div className="flex items-center">
      {isSidebarVisible ? <Sidebar hideSidebar={hideSidebar}/>: <div onClick={hideSidebar}><RxHamburgerMenu size={20} className="cursor-pointer mb-56 ml-5"/></div>}
      {
      isSidebarVisible ? 
      <div className="ml-[288px] p-4 flex flex-wrap">
        <AllTasks />
      </div>
      :
      <div className="ml-20 p-4 flex flex-wrap">
        <AllTasks />
      </div>
      }
    </div>
  );
}

export default Homepage;
