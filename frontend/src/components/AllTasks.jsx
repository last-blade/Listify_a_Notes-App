import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

function AllTasks() {
  const [tasks, setTasks] = useState([]);    
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/user/fetchtasks', { withCredentials: true });
      setTasks(response.data.data);  
      setLoading(false);           
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks."); 
      setLoading(false);                  
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/deletetask', 
        { id: taskId },
        { withCredentials: true }
      );
      console.log("deletetask", response);
      fetchAllTasks();
      toast.success("Un-Listified")
    } 
    catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  useEffect(() => {
    fetchAllTasks();
  });

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-4 border border-red-600'>
      <h1 className='text-2xl font-bold mb-4'>All Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task to get started!</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {tasks.map(task => (
            <div key={task._id} className='max-w-sm max-h-56 h-auto overflow-hidden shadow-md shadow-slate-300 rounded-xl p-5 bg-[#FDF3B4]'>
              <h2 className='text-xl font-semibold mb-2'>{task.title}</h2>
              <p className='text-gray-700 mb-4'>{task.content}</p>
              <div className="flex justify-between">
                <p className='text-sm text-gray-500'>{new Date(task.createdAt).toLocaleString()}</p>
                <MdDelete className="text-red-600 cursor-pointer" size={20} onClick={()=> deleteTask(task._id)}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllTasks;
