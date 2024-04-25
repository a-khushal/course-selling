import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usePurchases = () => {
    const [ purchases, setPurchases ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ message, setMessage ] = useState("");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/course/purchases`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }, 
        }).then(res=>{
            setPurchases(res.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response.data.error){
                setMessage(err.response.data.error);
            } else {
                setMessage(err.response.data.msg);
            }
            setPurchases([]);
            setLoading(false)
        })
    }, []);
    return {
        message,
        purchases,
        loading,
    }
}