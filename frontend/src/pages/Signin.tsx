import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth"
import { useSignedIn } from "../hooks/useSignedIn";
import { usePurchases } from "../hooks/usePurchases";

export default function Signin() {
    // const signedIn = useSignedIn();
    const { user } = usePurchases();
    const navigate = useNavigate();
    if(user){
        navigate("/courses")
    } else {
        // console.log(signedIn)
        return (
            <>
                <Auth type={ "signin" }/> 
            </>
        )
    }
}