import { ReactNode } from "react"

export const Sidebarlist = ({name, svg, bold}: {name: string, svg: ReactNode, bold: boolean}) => {
    return <>
        <li>
            <a href="#" className={`relative flex flex-row items-center h-11 focus:outline-none ${ bold === false ? 'text-slate-500' : 'text-gray-950' }  hover:text-gray-950 border-l-4 border-transparent pr-6`}>
                <span className="inline-flex justify-center items-center ml-4">
                    {svg}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
            </a>
        </li>
    </>
}