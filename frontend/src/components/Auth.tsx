import { Link } from "react-router-dom";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md justify-center items-center flex-col" style={{ width: "600px", height: (type=='signup'?'500px':'400px')}}>
                <div className="text-4xl font-extrabold flex justify-center">{ type=='signup' ? "Create an account" : "Welcome Back"}</div>
                <div className="flex justify-center text-slate-400 pt-3">{ type=='signup' ? "Already have an account?" : "Don't have an account"}<Link className="ml-2 underline" to={ type=='signup' ? "/signin" : "/signup" }>{ type=='signup' ? "Sign in" : "Sign up"}</Link></div>
                {type==='signup'?
                    <div className="mt-4">
                        <label className="block mb-2 text-md font-medium text-gray-900">Username</label>
                        <input type="text" id="first_name" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="John Doe" required />
                    </div>
                : 
                ""}
                <div className="mt-3">
                    <label className="block mb-2 text-md font-medium text-gray-900">Email</label>
                    <input type="text" id="first_name" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="johndoe@gmail.com" required />
                </div>
                <div className="mt-3">
                    <label className="block mb-2 text-md font-medium text-gray-900">Password</label>
                    <input type="text" id="first_name" className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="123456" required />
                </div>
                <div className="mt-5">
                    <button type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{ type==='signup' ? "Sign up" : "Sign in" }</button>
                </div>
            </div>
        </div>
    );
}
