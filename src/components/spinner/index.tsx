import style from "./style.module.css"
import logo from "@/assets/logo-dark.png"
import { cn } from "@/lib/utils"
import Image from 'next/image'

const Spinner = () => {
    return (
        <button type="button" className={cn(style.box)}>
            <div className="absolute h-[90%] w-[90%] rounded-[40px] bg-black">
                <Image src={logo} alt="logo" fill className="absolute h-full w-full" />
            </div>
        </button>
    )
}

export default Spinner