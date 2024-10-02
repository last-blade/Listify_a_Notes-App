import { useState } from 'react'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Homepage/>
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/signup",
      element: <Signup/>
    },

    {
      path: "/profile",
      element: <Profile />
    }
  ])

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
