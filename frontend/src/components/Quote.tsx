import React from "react";

export const Quote = React.memo(function(){
    return <div>
        <div className="text-5xl font-semibold">
            Unlock Your Learning Potential with Acme Inc.
        </div>
        <div className="text-gray-500 text-xl mt-5">
            Explore thousands of online courses, specializations, and professional certificates from top universities and companies.
        </div>
    </div>
})
