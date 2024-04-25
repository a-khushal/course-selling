import { useNavigate } from "react-router-dom";
import { usePurchases } from "../hooks/usePurchases";
import Loader from "./Loader";
import { Searchbar } from "./Searchbar";
import { Sidebar } from "./Sidebar";


export const Purchases = () => {
    const navigate = useNavigate();
    const payload = usePurchases();
    if(payload.loading){
        return <Loader/>
    }
    if(payload.message === 'unauthorized!'){
        alert("Please signin/signup")
        navigate("/signin");
    }
    if(payload.message){
        return <div>
            <div className="relative">
                <div className="absolute w-full">
                    <Searchbar hide={true}/>
                </div>
                <div className="lg:ml-72">
                    <div className="flex justify-center items-center h-screen">
                        {payload.message}
                    </div>
                </div>
            </div>
            <Sidebar/>
        </div>
    }
    return <div>
        {payload.purchases}
    </div>
}