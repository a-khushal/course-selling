import { ButtonComponent } from "./ButtonComponent"
import { Review } from "./Review"

export const ParticularCard = ({title, description, price}: {title: string, description: string, price: string}) => {
    return <div className="lg:flex lg:justify-center mt-10">
        <div className="lg:w-8/12">
            <div className="text-4xl capitalize font-medium">
                {title}
            </div>
            <div className="mt-3">
                <Review/>
            </div>
            <div className="mt-5 text-2xl font-medium">
                ${price}
            </div>
            <div className="mt-3 text-md text-gray-500">Includes lifetime access</div>
            <div className="mt-4">
                <ButtonComponent text="Enroll in Course" color="black"/>
            </div>
            <div className="mt-4">
                <ButtonComponent text="Add to Wishlist" color="white"/>
            </div>
            <div className="mt-4">
                <div className="font-medium text-xl">Course Description</div>
                <div className="text-lg text-gray-500">
                    {description}
                </div>
            </div>
            <div className="mt-6">
                <div className="font-medium text-xl">What you'll learn</div>
                <div className="text-lg text-gray-500">
                </div>
            </div>
        </div>
    </div>
}