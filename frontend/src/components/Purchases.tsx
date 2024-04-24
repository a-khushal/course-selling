import { usePurchases } from "../hooks/usePurchases";
import Loader from "./Loader";

export const Purchases = () => {
    const payload = usePurchases();
    if(payload.loading){
        return <Loader/>
    }
    // console.log(payload.purchases)
    if(payload.message){
        return <div>
            {payload.message}
        </div>
    }
    return <div>
        {payload.purchases}
    </div>
}