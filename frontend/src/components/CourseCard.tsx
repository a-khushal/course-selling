
export const CourseCard = ({title, description, price}: {title: string, description: string, price: string}) => {
    return (
        <div className="m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
            <a href="#" className="block max-w-lg p-6">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">{title}</h5>
                <p className="font-normal text-gray-500">{description}</p>
                <div className="flex mt-5">
                    <h3 className="mr-2 text-2xl font-medium">${price}</h3>
                    <p className="mt-1 text-gray-400">/mo</p>
                </div>
            </a>
        </div>
    )
}