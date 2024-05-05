import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

export const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [ message, setMessage ] = useState("");
    const [user, setUser] = useState("");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/admin/me`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then((res)=>{
            setIsAdmin(res.data.msg);
            setUser(res.data.user)
        }).catch((err)=>{
            if(err.response.data.error){
                setMessage(err.response.data.error)
            } else {
                setMessage(err.response.data.msg)
            } 
        })
    })
    return {
        isAdmin,
        message, 
        name: user
    }
}