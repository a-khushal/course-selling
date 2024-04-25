import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usePurchases = () => {
    const [user, setUser] = useState("");
    const [ purchases, setPurchases ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ message, setMessage ] = useState("");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/course/purchases`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }, 
        }).then(res=>{
            setUser(res.data.Username);
            setPurchases(res.data.purchases);
            setLoading(false);
        }).catch(err=>{
            if(err.response.data.error){
                setMessage(err.response.data.error);
            } else {
                setMessage(err.response.data.msg);
            }
            setUser(err.response.data.Username)
            setPurchases([]);
            setLoading(false)
        })
    }, []);
    return {
        user,
        message,
        purchases,
        loading,
    }
}