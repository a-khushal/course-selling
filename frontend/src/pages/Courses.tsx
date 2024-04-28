import { useState } from "react";
import { Allcourses } from "../components/Allcourses"
import { Searchbar } from "../components/Searchbar"
import { Sidebar } from "../components/Sidebar"

export default function Courses(){
    const [ search, setSearch ] = useState("");
    return <div>
        <Sidebar/>
        <Searchbar hide={ false } search={ search } setSearch={setSearch} />
        <Allcourses search={ search }/>
    </div>
}