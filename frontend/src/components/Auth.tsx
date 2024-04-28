import { Link, useNavigate } from "react-router-dom";
import { SignupType, SigninType } from "@a-khushal/course-selling"
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { HomeTopBar } from "./HomeTopBar";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    type AuthInput = SignupType | SigninType;
    const initialState: AuthInput = type === 'signin' ? {
        email: "", 
        name: "", 
        password: "",
    } : {
        email: "",
        password: ""
    }
    const [inputs, setInputs] = useState<AuthInput>(initialState);
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/user/${type === 'signin'?"signin":"signup"}`, inputs);
            let jwt = response.data.token;
            jwt = "Bearer " + jwt;
            localStorage.setItem("token", jwt);
            navigate("/courses");
        } catch(err){
            console.log(err);
            alert("Error while authenticating");
        }
    }    
    return (
        <div className="relative">
            <div className="absolute w-full"><HomeTopBar/></div>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md justify-center items-center flex-col" style={{ width: "600px", height: (type=='signup'?'500px':'400px')}}>
                    <div className="text-4xl font-extrabold flex justify-center">{ type=='signup' ? "Create an account" : "Welcome Back"}</div>
                    <div className="flex justify-center text-slate-400 pt-3">{ type=='signup' ? "Already have an account?" : "Don't have an account"}<Link className="ml-2 underline" to={ type=='signup' ? "/signin" : "/signup" }>{ type=='signup' ? "Sign in" : "Sign up"}</Link></div>
                    {type==='signup'?
                        <div className="mt-4">
                            <label className="block mb-2 text-md font-medium text-gray-900">Username</label>
                            <input type="text" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="John Doe" required onChange={(e)=>{
                                setInputs(inputs => ({
                                    ...inputs,
                                    name: e.target.value,
                                }))
                            }}/>
                        </div>
                    : 
                    ""}
                    <div className="mt-3">
                        <label className="block mb-2 text-md font-medium text-gray-900">Email</label>
                        <input type="email" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="johndoe@gmail.com" required onChange={(e) => {
                            setInputs(inputs => ({
                                ...inputs,
                                email: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className="mt-3">
                        <label className="block mb-2 text-md font-medium text-gray-900">Password</label>
                        <input type="text" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="123456" required onChange={(e) => {
                            setInputs(inputs => ({
                                ...inputs,
                                password: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className="mt-5">
                        <button type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full" onClick={sendRequest}>{ type==='signup' ? "Sign up" : "Sign in" }</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
