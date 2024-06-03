import { LoaderPinwheel } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"


export default function useDebounce(callback: Function) {
    const pending = useRef<NodeJS.Timeout>()
    let id: string|number;
    const innerFunc = async (...params: any[]) => {
       id = toast("Saving", {
            action: 10_000, icon: <LoaderPinwheel className="animate-spin" />
        })

        if (pending.current) {
            toast.dismiss(id)
            clearTimeout(pending.current)
        }

        pending.current = setTimeout(async () => {
            await callback(...params)
            toast.success("Saved")
            toast.dismiss(id)
        }, 5000)
    }

    innerFunc.isPending = () => {
        return !!pending.current
    }

    innerFunc.cancel = ()=>{
        clearTimeout(pending.current)
        toast.dismiss(id)
    }

    return innerFunc
}
