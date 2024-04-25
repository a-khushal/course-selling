import axios from "axios";
import { useEffect, useState } from "react"
import { Course } from "./useAllCourses";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const useParticular = ( id : string ) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState<Course>();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/course/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then(res=>{
                setCourse(res.data.course);
                setLoading(false);
        }).catch(err=>{
            if(err.response.data.error){
                setMessage(err.response.data.error);
            } else {
                setMessage(err.response.data.msg);
            }
            setLoading(false)
        })
    }, [id]);
    return {
        message,
        loading,
        course
    }
}