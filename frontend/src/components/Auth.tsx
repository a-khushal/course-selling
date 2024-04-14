import { Link, useNavigate } from "react-router-dom";
import { SignupType, SigninType } from "@a-khushal/course-selling"
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

export const Auth = ({type}: {type: "signup" | "signin"}) => {

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
    const navigate = useNavigate();
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/user/${type === 'signin'?"signin":"signup"}`, inputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/courses");
        } catch(err){
            console.log(err);
            alert("Error while authenticating");
            // alertfn();
        }
    }
    // function makeInvisible(){
    //     const alertel = document.getElementById('alertel');
    //     if(alertel)
    //         alertel.style.visibility = "hidden";
    // }
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            {/* <div className="relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert" id="alertel">
                <p>A simple alert with text and a right icon</p>
                <span className="absolute inset-y-0 right-0 flex items-center mr-4" onClick={makeInvisible}>
                    <svg className="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </span>
            </div> */}
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
    );
}
