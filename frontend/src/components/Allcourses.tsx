import { CourseCard } from "./CourseCard"

export const Allcourses = () => {
    return <div className="lg:ml-72 h-screen my-8 md:ml-0 sm:ml-0">
        <div className="mx-6 my-6 h-screen">
            <div className="mx-4 pt-3 my-4 border border-gray-300 h-screen rounded-lg overflow-y-auto overscroll-auto">
                <div className="text-2xl font-medium pl-6">Courses</div>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-2">
                    <CourseCard title="Introduction to Javascript" description="Learn the basics of Javascript programming with this comprehensive course. No prior coding experience required" price="49.00"/>
                    <CourseCard title="Introduction to Javascript" description="Learn the basics of Javascript programming with this comprehensive course. No prior coding experience required" price="49.00"/>
                    <CourseCard title="Introduction to Javascript" description="Learn the basics of Javascript programming with this comprehensive course. No prior coding experience required" price="49.00"/>
                    <CourseCard title="Introduction to Javascript" description="Learn the basics of Javascript programming with this comprehensive course. No prior coding experience required" price="49.00"/>
                    <CourseCard title="Introduction to Javascript" description="Learn the basics of Javascript programming with this comprehensive course. No prior coding experience required" price="49.00"/>
                </div>
            </div>
        </div>
    </div> 
}