import { Allcourses } from "../components/Allcourses"
import { Searchbar } from "../components/Searchbar"
import { Sidebar } from "../components/Sidebar"

export default function Courses(){
    return <div>
        <Sidebar/>
        <Searchbar hide={false}/>
        <Allcourses/>
    </div>
}