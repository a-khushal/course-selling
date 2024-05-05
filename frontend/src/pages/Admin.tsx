import { AdminCreate } from "../components/AdminCreate"
import { Searchbar } from "../components/Searchbar"
import { Sidebar } from "../components/Sidebar"

export const Admin = () => {
    return <div>
        <div className="absolute">
            <Sidebar/>
        </div>
        <div className="relative">
            <Searchbar hide={ true } search={ "" } setSearch={()=>{}}/>
        </div>
        <div className="relative lg:ml-72 mt-28 flex justify-center items-center">
            <AdminCreate/>
        </div>
    </div>
}