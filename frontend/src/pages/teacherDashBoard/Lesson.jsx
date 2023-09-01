import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Addvideo from './Addvideo'

export default function Lesson() {
    // 64f0b458ea1957fc5dc30366
    const [title, setTitle] = useState('')
    const [video, setvideo] = useState('')
    const params = useParams()
    const {id} = params
    const navigate = useNavigate()

    const createLesson = async (e) => {
        e.preventDefault()
        try {
            const Lessondata = new FormData()
            Lessondata.append("title", title)
            Lessondata.append("video", video)
            const response = await fetch(`http://localhost:5000/api/courses/module/lesson/create-Lesson/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNWM0ZWJlOWI4ZDU0YThmYjFjYjAiLCJpYXQiOjE2OTM0ODI4MTIsImV4cCI6MTY5NDA4NzYxMn0.mQg_7x_YFvT6cRZdOnfxA8XjJExAMF7PGikAPwysfmM'
            },
            body: Lessondata
            })

            const json = await response.json()
            console.log(json);
            if(json?.success) {
                navigate(`/dashboard/create-course/create-modules/create-lessons/create-description/${json?.Lesson?._id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
    <div className='bg-gray-800 text-white'>
        <h1 className='text-center pt-5 pb-5'>Create a Lesson</h1>
        <form className='flex flex-col justify-center items-center gap-9'>
            <input type="text" placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}} className='text-white bg-gray-800'/>
            <Addvideo video={video} setvideo={setvideo}/>
            <button onClick={createLesson}>Add Description</button>
        </form>
    </div>
  )
}
