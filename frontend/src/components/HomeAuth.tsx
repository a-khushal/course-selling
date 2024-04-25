import React from "react";
import { Link } from "react-router-dom";
import { ButtonComponent } from "./ButtonComponent";

export const HomeAuth = React.memo(function(){
    return <div className="flex">
        <div className="mx-6">
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
})