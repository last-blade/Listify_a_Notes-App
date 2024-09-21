import { useState } from 'react'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/signup",
      element: <Login/>
    }
  ])

  return (
    <div>
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
