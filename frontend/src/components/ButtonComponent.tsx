import React from "react";

export const ButtonComponent = React.memo(function({text, color}: {text: string, color: "black" | "white"}){
    return <button type="button" className={`font-medium rounded-lg text-sm px-5 py-2 w-full ${color === 'black' ? "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-200 border-2 border-solid border-slate-200"}`}>
        {text}
    </button>
})