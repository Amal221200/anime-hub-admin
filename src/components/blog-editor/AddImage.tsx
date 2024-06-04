"use client"

import { ImageIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useCallback, useState } from "react";
import FileUpload from "../FileUpload";
import { cn } from "@/lib/utils";
import { Toggle } from "../ui/toggle";

const AddImage = ({ onUploadComplete, bubble, focused }: { onUploadComplete: (url: string, name: string) => void, bubble?: boolean, focused?: boolean },) => {
    const [open, setOpen] = useState(false)

    const onOpenChage = (open: boolean) => {
        setOpen(open);
    }

    const onHandleUpload = useCallback((url: string, name: string) => {
        onUploadComplete(url, name)
        onOpenChage(false)
    }, [onUploadComplete])

    return (
        <Popover onOpenChange={onOpenChage} open={open} >
            <PopoverTrigger asChild>
                <Toggle  title="image" size={bubble ? 'xs' : 'sm'} className={cn(focused && "bg-zinc-800")} onClick={(e) => {
                     if (focused) {
                        onHandleUpload('','')
                        return onOpenChage(false)
                    }
                    onOpenChage(true)
                }}>
                    <ImageIcon size={bubble ? 15 : 20} />
                </Toggle>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" sideOffset={10} className="w-max p-2">
                <FileUpload endpoint="animeBlogContentImage" onChange={(url, name) => onHandleUpload(url!, name!)} value="" />
            </PopoverContent>
        </Popover>
    )
}

export default AddImage