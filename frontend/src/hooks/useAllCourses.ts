import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Course{
    id: string;
    title: string;
    description: string;
}

export const useAllCourses = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/course/bulk`)
            .then((res) => {
                setCourses(res.data.courses);
                setLoading(false)
            })
    }, []);
    return {
        loading,
        courses
    }
}