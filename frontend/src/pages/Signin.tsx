import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth"
import { useSignedIn } from "../hooks/useSignedIn";

export default function Signin() {
    const navigate = useNavigate();
    const { signedIn, loading, message } = useSignedIn();
    if(message){
        navigate("/signin");
    }
    if(loading){
        return;
    }
    if(signedIn){
        navigate("/courses")
    } else {
        return (
            <>
                <Auth type={ "signin" }/> 
            </>
        )
    }
}