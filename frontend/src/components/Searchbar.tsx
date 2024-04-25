import { usePurchases } from "../hooks/usePurchases";
import { Icon } from "./Icon"
import { Size } from "./SizeEnum"

export const Searchbar = ({hide}: {hide: boolean}) => {
    const { user } = usePurchases();
    return <div>
        <div className="flex justify-between h-16 border-b ml-0 bg-slate-50 lg:ml-72">
            <div className="flex items-center">
                <div className="ml-4 visible lg:invisible cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className="w-64 h-2 ml-5 flex justify-center items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className={`w-4 h-4 text-gray-500 dark:text-gray-400 ${ hide === true? "invisible" : "visible" }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 focus:border-slate-200 focus:border-4 rounded-lg ${ hide === true? "invisible" : "visible" }`} placeholder="Search courses..." />
                    </div>
                </div>
            </div>
            <div className={`mr-20 flex justify-center items-center cursor-pointer`}>
                <Icon height={9} width={9} size={Size.MD} name={ user ? user : "Anonymous" }/>
            </div>
        </div>
    </div>
}