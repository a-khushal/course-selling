import { Star } from "./Star"

export const Review = () => {
    return <>
        <div className="flex items-center">
            <Star/><Star/><Star/><Star/><Star/>
            <p className="ms-2 text-sm text-slate-400 mr-2">4.95</p>
            <div className="text-sm text-slate-400">(73 reviews)</div>
        </div>
    </>
}