import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Content() {

    const [heading, setheading] = useState('')
    const [explanation, setexplanation] = useState('')
    const params = useParams()
    const {id} = params
    const navigate = useNavigate()


    const createContent = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/api/courses/module/lesson/content/create-Content/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNWM0ZWJlOWI4ZDU0YThmYjFjYjAiLCJpYXQiOjE2OTM0ODI4MTIsImV4cCI6MTY5NDA4NzYxMn0.mQg_7x_YFvT6cRZdOnfxA8XjJExAMF7PGikAPwysfmM'
            },
            body: JSON.stringify({heading, explanation})
            })

            const json = await response.json()
            console.log(json);
            if(json?.success) {
                setheading('')
                setexplanation('')
                console.log('content created successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const gotoHome = (e) => {
      e.preventDefault()
      navigate('/')
    }


    return (
    <div className='bg-gray-800 text-white'>
        <h1 className='text-center pt-5 pb-5'>create a Content</h1>
      <form className='flex flex-col justify-center items-center gap-9'>
        <input type="text" placeholder='heading' value={heading} onChange={(e) => {setheading(e.target.value)}} className='text-white bg-gray-800'/>
        <input type="text" placeholder='explanation' value={explanation} onChange={(e) => {setexplanation(e.target.value)}} className='text-white bg-gray-800'/>
        <button onClick={createContent}>Add More Content</button>
        <button onClick={gotoHome}>Finish</button>
      </form>
    </div>
  )
}
