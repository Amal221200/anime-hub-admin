import { LoaderPinwheel } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"


export default function useDebounce(callback: Function, options?: { delay?: number }) {
    const pending = useRef<NodeJS.Timeout>(undefined)
    let saveToastId: any;
    let parameters: any[];
    const innerFunc = async (...params: any[]) => {
        parameters = params

        if (pending.current) {
            toast.dismiss(saveToastId)
            clearTimeout(pending.current)
            pending.current = undefined
        }

        const promise: () => Promise<{ title: string }> = () => new Promise((resolve, reject) => {
            pending.current = setTimeout(async () => {
                try {
                    await callback(...params)
                    resolve({ title: 'SAVED' })
                } catch (error: any) {
                    reject(error.message)
                } finally {
                    toast.dismiss(saveToastId)
                    clearTimeout(pending.current)
                    pending.current = undefined
                }
            }, options?.delay || 5000)
        });

        saveToastId = toast.promise(promise, {
            loading:
                <div className="flex w-full gap-x-2">
                    <LoaderPinwheel className="animate-spin" />
                    <p>SAVING...</p>
                </div>
            ,
            duration: 5000,
            finally() {
                toast.dismiss(saveToastId)
                clearTimeout(pending.current)
                pending.current = undefined
            }
        })
    }

    innerFunc.isPending = () => {
        return !!pending.current
    }

    innerFunc.cancel = () => {
        clearTimeout(pending.current)
        pending.current = undefined
        toast.dismiss(saveToastId)
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
