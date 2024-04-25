import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/ButtonComponent";
import { HomeAuth } from "../components/HomeAuth";
import { HomeTopBar } from "../components/HomeTopBar";
import { Quote } from "../components/Quote";

export default function Home() {
    const navigate = useNavigate();
    return <div>
        <div className="relative">
            <div className="absolute">
                <HomeTopBar/>
            </div>
            <div className="grid grid-cols-2 h-screen">
                <div className="mx-28 flex justify-center items-center">
                    <div>
                        <Quote/>
                        <div className="mt-6" onClick={()=>navigate("/courses")}>
                            <ButtonComponent text="All Courses" color="black"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-gray-200">
                    <HomeAuth/>
                </div>
            </div>
        </div>
    </div>
}