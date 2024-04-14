import { Icon } from "./Icon"
import { Size } from "./SizeEnum"

export const Searchbar = () => {
    return <div className="flex justify-between h-16 border-b ml-72 bg-slate-50">
        <div className="w-64 h-2 pt-3 ml-7">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 focus:border-slate-200 focus:border-4 rounded-lg " placeholder="Search courses..." />
            </div>
        </div>
        <div className="mr-5 flex justify-center items-center cursor-pointer">
            <Icon height={9} width={9} size={Size.MD}/>
        </div>
    </div>
}