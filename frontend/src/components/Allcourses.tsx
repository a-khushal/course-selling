import { useAllCourses } from "../hooks/useAllCourses"
import { CourseCard } from "./CourseCard"
import Loader from "./Loader";

export const Allcourses = () => {
    const {courses, loading} = useAllCourses();
    console.log(courses, courses.length);
    if(loading){
        return <Loader/>
    }
    return <div className="lg:ml-72 h-screen my-8 md:ml-0 sm:ml-0">
        <div className="mx-6 my-6 h-screen">
            <div className="mx-4 pt-3 my-4 border border-gray-300 h-screen rounded-lg overflow-y-auto overscroll-auto">
                <div className="text-2xl font-medium pl-6">Courses</div>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-2">
                    { 
                        courses.map(course => <CourseCard title={course.title} description={course.description} price="49.00" key={course.id}/>) 
                    }
                </div>
            </div>
        </div>
    </div> 
}