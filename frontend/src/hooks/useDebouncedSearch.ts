import axios from "axios";
import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useDebouncedSearch = (params: string) => {
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/course/search?title=${params}`)
            .then((res)=>{
                setSearchResults(res.data);
                setLoading(false);
             })
            .catch((err)=>{
                 console.log(err);
            })  
    }, [params]);
    return { serachLoading: loading, searchResults };
}
