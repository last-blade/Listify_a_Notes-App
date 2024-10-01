import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { MdAdd, MdClose } from 'react-icons/md'

function Createtask() {
  const [isTaskVisible, setIsTaskVisible] = useState(false)
  const [user, setUser] = useState({
    title: "",
    content: "",
  })

  function toggleCreateTask() {
    setIsTaskVisible(!isTaskVisible)
  }

  async function submitHandler(e) {
    e.preventDefault()

    if (!user.title || !user.content) {
      toast.error("All fields are required.")
      return
    }
    
    try {
      await axios.post(
        'http://localhost:8000/api/v1/user/createtask', 
        {
          title: user.title,
          content: user.content
        },
        { withCredentials: true }
      )
      toast.success("Listified")
      setUser({ title: "", content: "" })
      toggleCreateTask()
    } catch (error) {
      toast.error("Failed to create task")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isTaskVisible ? (
        <button
          onClick={toggleCreateTask}
          className=" bg-black text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Create new task"
        >
          <MdAdd className="text-2xl" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl p-6 w-96 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Create Task</h2>
            <button
              onClick={toggleCreateTask}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close create task form"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={user.title}
                onChange={(e) => setUser({...user, title: e.target.value})}
                placeholder="Task title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={user.content}
                onChange={(e) => setUser({...user, content: e.target.value})}
                placeholder="Start organizing your tasks"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-32 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Listify
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Createtask