import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Module() {
    // 64f0b458ea1957fc5dc30366
    const [title, settitle] = useState('')
    const params = useParams()
    const {id} = params
    const navigate = useNavigate()

    // const getCourse = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/courses/single-course/${id}`, {
    //         method: 'GET',
    //         })

    //         const json = await response.json()
    //         console.log(json);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const createModules = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/api/courses/module/create-Module/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNWM0ZWJlOWI4ZDU0YThmYjFjYjAiLCJpYXQiOjE2OTM0ODI4MTIsImV4cCI6MTY5NDA4NzYxMn0.mQg_7x_YFvT6cRZdOnfxA8XjJExAMF7PGikAPwysfmM'
            },
            body: JSON.stringify({title})
            })

            const json = await response.json()
            console.log(json);
            if(json?.success) {
                navigate(`/dashboard/create-course/create-modules/create-lessons/${json?.Module?._id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
    <div className='bg-gray-800 text-white'>
        <h1 className='text-center pt-5 pb-5'>Create a module</h1>
      <form className='flex flex-col justify-center items-center gap-9'>
        <input type="text" placeholder='title' value={title} onChange={(e) => {settitle(e.target.value)}} className='text-white bg-gray-800'/>
        <button onClick={createModules}>Add Lesson</button>
      </form>
    </div>
  )
}
