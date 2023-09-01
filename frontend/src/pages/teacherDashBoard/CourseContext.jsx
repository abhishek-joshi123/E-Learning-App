
import { createContext, useState } from "react";

const CourseContext = createContext();

const CourseState = (props) => {

    const [id, setId] = useState('')


    
  
    return (
        <CourseContext.Provider value={{id, setId}}>
            {props.children}
        </CourseContext.Provider>
    )
}

export {CourseContext, CourseState}