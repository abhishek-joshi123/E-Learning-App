import React, { useContext, useState } from 'react'
import Webcam from 'react-webcam'
import { AuthContext } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Photo = () => {

    const context = useContext(AuthContext)
    const {image, setImage} = context
    const navigate = useNavigate()

    const webcamRef = React.useRef(null)
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setImage(pictureSrc)
    })


  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="m-5 text-center text-white text-xl">
        Photo Capture
      </h1>
      <div>
        {image == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} />
        )}
      </div>
      <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="bg-green-400 text-white m-4 px-4 py-3 rounded-lg"
          >
            Capture
          </button>
          <button onClick={() => {navigate('/SignUp')}}className='bg-green-400 text-white px-4 py-3 rounded-lg' >Back to SignIn</button>
      </div>
    </div>
  )
}
export default Photo