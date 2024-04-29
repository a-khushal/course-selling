import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSignedIn = () => {
    const [signedIn, setSignedIn] = useState("");
    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/me`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then(res => {
            console.log(res)
            setSignedIn(res.data);
        });
    }, []);
    return { signedIn };
}