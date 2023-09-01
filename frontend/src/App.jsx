import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Classroom from './pages/Classroom'
import Home from './Components/Home'
import Course from './pages/teacherDashBoard/Course'
import Module from './pages/teacherDashBoard/Module'
import Lesson from './pages/teacherDashBoard/Lesson'
import Content from './pages/teacherDashBoard/Content'
import Assignment from './pages/Assignment'

function App() { 


  return (
    <> 
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/assignment' element={<Assignment/>}/>
        <Route path='/classroom' element={<Classroom/>}/>
        <Route path='/dashboard/create-course' element={<Course/>}/>
        <Route path='/dashboard/create-course/create-modules/:id' element={<Module/>}/>
        <Route path='/dashboard/create-course/create-modules/create-lessons/:id' element={<Lesson/>}/>
        <Route path='/dashboard/create-course/create-modules/create-lessons/create-description/:id' element={<Content/>}/>
      </Routes>
    </>
  )
}

export default App
