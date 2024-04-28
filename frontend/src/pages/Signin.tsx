import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth"
import { usePurchases } from "../hooks/usePurchases"

export default function Signin() {
    const { user } = usePurchases();
    const navigate = useNavigate();
    if(user){
        navigate("/courses")
    } else {
        return (
            <>
                <Auth type={ "signin" }/> 
            </>
        )
    }
}