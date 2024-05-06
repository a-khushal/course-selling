import { useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { useCreateCourse } from "../hooks/useCreateCourse"

export const AdminCreate = () => {
    function SendRequest(){
        const { message } = useCreateCourse(course);
        alert(message)
    }
    const [course, setCourse] = useState({
        title: "",
        description: "", 
        price: ""
    })
    return <div> 
        <div className="bg-white p-12 rounded-lg shadow-xl justify-center items-center w-700 h-600">
            <div className="text-3xl font-medium flex justify-left">
                Create Course
            </div>
            <div className="mt-4">
                <label className="block mb-2 text-md font-normal text-gray-900">Course Title</label>
                <input type="email" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{
                    setCourse(course=>({...course,
                    title: e.target.value
                    }))
                }} placeholder="Enter course title" required />
            </div>
            <div className="mt-3">
                <label className="block mb-2 text-md font-normal text-gray-900">Course Description</label>
                <textarea id="message" className="block p-2.5 w-full bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none" rows={7} placeholder="Enter course description" onChange={(e)=>{
                    setCourse(course=>({...course,
                    description: e.target.value
                    }))
                }} required/>
            </div>
            <div className="mt-3">
                <label className="block mb-2 text-md font-normal text-gray-900">Course Price ($)</label>
                <input type="email" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Enter course price" required onChange={(e)=>{
                    setCourse(course=>({...course,
                    price: e.target.value
                    }))
                }} />
            </div>
            <div className="mt-10" onClick={SendRequest}>
                <ButtonComponent text="Save Course" color="black"/>
            </div>
        </div>
    </div>
}