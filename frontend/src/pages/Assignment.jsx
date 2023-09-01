
import React, { useState } from 'react'

export default function Assignment() {

      const [url, seturl] = useState('')

  const givepdf = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/courses/assignment/get-assignment-pdf/64ee330a439e841a8b044a84', {
        method: 'GET',
        headers: {
          'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNWM0ZWJlOWI4ZDU0YThmYjFjYjAiLCJpYXQiOjE2OTMzMzE1NDgsImV4cCI6MTY5MzkzNjM0OH0.iDbODS9vCgo-CdRMBeDvBKUU4vI3BUz7qJcwYe5xTq0',
        }
      })
      const json = await response.json()
      seturl(json.pdfUrl);
    } catch (error) {
      console.log(error);
    }
  } 

  const downloadpdf = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'downloaded.pdf';  // Set the desired filename for the downloaded file
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div>
       <button onClick={givepdf}>Click Me</button>
      {/* <iframe src={url} ></iframe> */}
      <button onClick={downloadpdf}>Download</button>
    </div>
  )
}
