import { Size } from "./SizeEnum"

export const Icon = ({height, width, size, name}: {height: number, width: number, size: Size, name: string}) => {
    return <div>
        <div className={`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-slate-200 rounded-full`}>
            <span className={`font-medium text-slate-600 text-${size}`}>{name[0].toUpperCase()}</span>
        </div>
    </div>
}