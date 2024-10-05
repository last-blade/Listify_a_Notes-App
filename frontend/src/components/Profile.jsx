import axios from 'axios';
import { useEffect, useState } from 'react'
import { MdEdit, MdEmail, MdDateRange, MdVpnKey, MdNoteAdd, MdLabel, MdColorLens, MdArchive } from 'react-icons/md'
import { FaUser } from "react-icons/fa";


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const [user, setUser] = useState({});

  async function fetchUser(){
    const response = await axios.get('http://localhost:8000/api/v1/user/getuser', {withCredentials: true});
    setUser(response.data.data)
    console.log("Current user", response);
  }

  useEffect(() => {
    fetchUser();
  }, [])


  const totalTasks = user.allTasks ? user.allTasks.length : 0;
  const formattedDate = user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : "No date available";
  const uniqueKey = user.uniqueKey;

  return (
    
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-black via-gray-400 to-slate-300">
        <img
          className="absolute bottom-0 left-8 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white shadow-lg"
          src="/1077114.png"
          alt="Profile"
        />

      </div>
      <div className="pt-16 pb-8 px-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.fullname}</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-black text-white font-semibold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out"
          >
            <MdEdit className="mr-2" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        <p className="mt-4 text-gray-700">Avid note-taker | Organizing thoughts one note at a time</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <MdEmail className="text-gray-500 mr-2" />
            <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center">
            <MdDateRange className="text-gray-500 mr-2" />
            <span className="text-gray-700">Joined: {formattedDate}</span>
          </div>

          <div className="flex items-center">
            <MdVpnKey className="text-gray-500 mr-2" />
            <span className="text-gray-700">Unique Key: {uniqueKey}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Listify Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Notes</h3>
            <p className="text-3xl font-bold text-yellow-600">{totalTasks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Labels Used</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Archived Notes</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Collaborations</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {[
            { action: 'Created note', note: 'Project Ideas Brainstorm', time: '1 hour ago', icon: <MdNoteAdd className="text-green-500" /> },
            { action: 'Added label', note: 'Grocery List', label: 'Shopping', time: '3 hours ago', icon: <MdLabel className="text-blue-500" /> },
            { action: 'Changed color', note: 'Vacation Plans', color: 'Blue', time: '1 day ago', icon: <MdColorLens className="text-purple-500" /> },
            { action: 'Archived note', note: 'Old Recipes', time: '2 days ago', icon: <MdArchive className="text-gray-500" /> },
          ].map((activity, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1 mr-2 flex-shrink-0">{activity.icon}</span>
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">{activity.action}:</span> {activity.note}
                  {activity.label && <span className="ml-1 text-blue-600">#{activity.label}</span>}
                  {activity.color && <span className="ml-1 text-purple-600">(Color: {activity.color})</span>}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}