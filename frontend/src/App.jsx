import { useState } from 'react'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Homepage from './components/Homepage'

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
    }
  ])

  return (
    <div>
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
