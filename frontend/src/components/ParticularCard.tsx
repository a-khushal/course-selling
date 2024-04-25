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
            <button type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-normal rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">Enroll in Course</button>
            <button type="button" className="text-black bg-white hover:bg-gray-100 rounded-lg text-md px-5 py-2.5 me-2 mb-2 w-full mt-2 border border-3">Add to Wishlist</button>
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