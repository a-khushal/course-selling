import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSignedIn = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [user, setUser] = useState("");
    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/me`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then(res => {
            setSignedIn(res.data.msg);
            setUser(res.data.Username);
            setLoading(false)
        }).catch(err=>{
            if(err.response.data.error){
                setMessage(err.response.data.error)
                setLoading(false)
            } else {
                setMessage(err.response.data.msg)
                setLoading(false)
            } 
        })
    }, []);
    return { signedIn, loading, message, user };
}