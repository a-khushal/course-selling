import axios from "axios"
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface course{
    title: string;
    description: string;
    price: string;
}

export const useCreateCourse = (course: course) => {
    const [message, setMessage] = useState("");

    axios.post(`${BACKEND_URL}/admin/create`, {
        title: course.title, 
        description: course.description,
        price: course.price
    }).then((res)=>{
        setMessage(res.data.message)
    }).catch((err)=>{
        if(err.response.data.error){
            setMessage(err.response.data.error);
        } else if(err.response.data.msg) {
            setMessage(err.response.data.msg);
        }
    })
    return {
        message
    }
}