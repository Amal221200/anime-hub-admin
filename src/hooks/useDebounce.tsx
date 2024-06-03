import { LoaderPinwheel } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"


export default function useDebounce(callback: Function) {
    const pending = useRef<NodeJS.Timeout>()
    let id: string | number;
    let parameters: any[];
    const innerFunc = async (...params: any[]) => {
        parameters = params

        id = toast("Saving", {
            action: 10_000, icon: <LoaderPinwheel className="animate-spin" />
        })

        if (pending.current) {
            toast.dismiss(id)
            clearTimeout(pending.current)
            pending.current = undefined
        }

        pending.current = setTimeout(async () => {
            await callback(...params)
            toast.success("Saved")
            toast.dismiss(id)
            pending.current = undefined
        }, 5000)
    }

    innerFunc.isPending = () => {
        return !!pending.current
    }

    innerFunc.cancel = () => {
        clearTimeout(pending.current)
        pending.current = undefined
        toast.dismiss(id)
        toast("AUTO SAVE WAS CANCELED")
    }

    innerFunc.flush = () => {
        if (!parameters) {
            return
        }
        
        clearTimeout(pending.current)
        pending.current = undefined
        callback(...parameters).then(() => {
            toast("AUTO SAVE WAS FLUSHED")
        })
    }

    innerFunc.trigger = () => {
        if (!pending.current || !parameters) {
            return
        }
        clearTimeout(pending.current)
        pending.current = undefined
        callback(...parameters).then(() => {
            toast("AUTO SAVE WAS TRIGGERED")
        })
    }

    return innerFunc
}
