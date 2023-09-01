
import React, { useState } from 'react'
import AddImage from './AddImage'
import { useNavigate } from 'react-router-dom'

export default function Course() {

  const [title, setTitle] = useState('')
  const [description, setdescription] = useState('')
  const [Image, setImage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const navigate = useNavigate()

  const createCourse = async(e) => {
      e.preventDefault();

      try {
        
        const Coursedata = new FormData()
        Coursedata.append("title", title)
        Coursedata.append("description", description)
        Coursedata.append("thumbnail", Image)
        Coursedata.append("startDate", startDate)
        Coursedata.append("endDate", endDate)
        const response = await fetch('http://localhost:5000/api/courses/create-course', {
          method: 'POST',
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNWM0ZWJlOWI4ZDU0YThmYjFjYjAiLCJpYXQiOjE2OTM0ODI4MTIsImV4cCI6MTY5NDA4NzYxMn0.mQg_7x_YFvT6cRZdOnfxA8XjJExAMF7PGikAPwysfmM'
          },
          body: Coursedata
        })

        const json = await response.json()

        if(json?.success) {
          navigate(`/dashboard/create-course/create-modules/${json?.Course?._id}`)
        }

      } catch (error) {
          console.log("Something went wrong");
      }
  }

  return (
    <div className='bg-gray-800 text-white'>
        <h1 className='text-center'>Create new course</h1>
      <form className='flex flex-col items-center gap-5'> 
        <input type="text" placeholder='title' className='bg-gray-800' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea cols="30" rows="5" placeholder='description' className='bg-gray-800' value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
        <AddImage Image={Image} setImage={setImage}/>
        <input type="date" className='bg-gray-800' onChange={(e) => {setStartDate(e.target.value)}}/>
        <input type="date" className='bg-gray-800' onChange={(e) => {setEndDate(e.target.value)}}/>
        <button onClick={createCourse}>Add Module</button>
      </form>
    </div>
  )
}
