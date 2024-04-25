import React from "react";

export const ButtonComponent = React.memo(function({text, color}: {text: string, color: "black" | "white"}){
    return <button type="button" className={`font-medium rounded-lg text-lg px-8 py-2 w-full ${color === 'black' ? "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50 border-2 border-solid border-gray-500"}`}>
        {text}
    </button>
})