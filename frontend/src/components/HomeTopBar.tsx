import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { Link, useNavigate } from "react-router-dom";

export const HomeTopBar = React.memo(function({hide}: {hide: boolean}) {
    const navigate = useNavigate();
    return <div className="border-b-2">
        <div className="flex justify-between mx-6">
            <div className="flex justify-start items-center cursor-pointer" onClick={()=>navigate("/home")}>
                <div className="font-semibold">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                    <path d="M12 3v6"></path>
                    </svg>
                </div>
                <div className="font-medium text-md pl-3 cursor-pointer">Acme Inc</div>
            </div>
            <div className={`flex float-right justify-center items-center my-3 ${ hide ? "invisible" : "visible" }`}>
                <div className="mr-4">
                    <Link to={"/signup"}>
                        <ButtonComponent text={"Signup"} color="black"/>
                    </Link>
                </div>
                <div>
                    <Link to={"/signin"}>
                        <ButtonComponent text={"Signin"} color="white"/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
})