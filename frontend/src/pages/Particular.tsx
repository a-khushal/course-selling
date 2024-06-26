import { useNavigate, useParams } from "react-router-dom"
import { Searchbar } from "../components/Searchbar";
import { Sidebar } from "../components/Sidebar";
import { useParticular } from "../hooks/useParticular";
import Loader from "../components/Loader";
import { ParticularCard } from "../components/ParticularCard";

export const Particular = () => {
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const payload = useParticular(id);
    if(!id){
        return <Loader/>
    }
    if(payload.loading){
        return <Loader/>
    }
    if(payload.message === 'unauthorized!'){
        alert("Please signin/signup")
        navigate("/signin");
    }
    return <div>
        <div>
            <div className="w-full">
                <Searchbar hide={true} search="" setSearch={()=>""} />
            </div>
            <div className="lg:ml-52">
                    <div className="h-screen mt-6 mx-5">
                        { payload.course === undefined ? "" : <ParticularCard title={ payload.course.title } description={ payload.course.description } price={ payload.course.price }/> }
                    </div>
            </div>
        </div>
        <Sidebar/>
    </div>
}