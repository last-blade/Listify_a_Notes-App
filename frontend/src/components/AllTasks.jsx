import { useEffect, useState } from "react"
import axios from "axios"
import { MdDelete, MdAdd, MdErrorOutline, MdRefresh, MdExpandMore, MdExpandLess } from "react-icons/md"
import { toast } from "react-hot-toast"
import CreateTask from "./Createtask.jsx"

export default function AllTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedTasks, setExpandedTasks] = useState({})
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false)

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/user/fetchtasks', { withCredentials: true })
      setTasks(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setError("Failed to fetch tasks.")
      setLoading(false)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.post('http://localhost:8000/api/v1/user/deletetask', 
        { id: taskId },
        { withCredentials: true }
      )
      fetchAllTasks()
      toast.success("Task Un-Listified")
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Failed to delete task")
    }
  }

  useEffect(() => {
    fetchAllTasks()
  })

  const toggleExpand = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const toggleCreateTask = () => {
    setIsCreateTaskVisible(!isCreateTaskVisible)
  }

  const limit = 100

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MdRefresh className="animate-spin text-6xl text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <MdErrorOutline className="mr-2 text-2xl" />
          <span className="font-bold">Error:</span>
          <span className="block sm:inline ml-1">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>
      {tasks.length === 0 ? (
        <div className="bg-primary/15 border border-primary text-primary px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <MdErrorOutline className="mr-2 text-2xl" />
            <span className="font-bold">No tasks available.</span>
            <span className="block sm:inline ml-1">Add a new task to get started!</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task._id} className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                <div className="min-h-[100px] max-h-[200px] overflow-y-auto">
                  <p className="text-sm text-muted-foreground">
                    {expandedTasks[task._id] || task.content.length <= limit
                      ? task.content
                      : `${task.content.substring(0, limit)}...`}
                  </p>
                  {task.content.length > limit && (
                    <button
                      onClick={() => toggleExpand(task._id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors mt-2 flex items-center"
                    >
                      {expandedTasks[task._id] ? (
                        <>
                          <MdExpandLess className="mr-1" />
                          Read less
                        </>
                      ) : (
                        <>
                          <MdExpandMore className="mr-1" />
                          Read more
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="bg-muted p-4 flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
                <button 
                  className="text-destructive hover:text-destructive/80 transition-colors"
                  onClick={() => deleteTask(task._id)}
                >
                  <MdDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
        onClick={toggleCreateTask}
      >
        <MdAdd className="mr-2" /> Add New Task
      </button>
      {isCreateTaskVisible && (
        <CreateTask 
          onClose={toggleCreateTask} 
          onTaskCreated={fetchAllTasks}
        />
      )}
    </div>
  )
}