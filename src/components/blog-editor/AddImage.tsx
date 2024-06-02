"use client"

import { ImageIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import FileUpload from "../FileUpload";
import { cn } from "@/lib/utils";

const AddImage = ({ onUploadComplete, bubble, focused }: { onUploadComplete: (url: string) => void, bubble?: boolean, focused?: boolean },) => {
    const [open, setOpen] = useState(false)

    const onOpenChage = (open: boolean) => {
        setOpen(!open);
    }

    const onHandleUpload = useCallback((url: string) => {
        onUploadComplete(url)
        onOpenChage(true)
    }, [onUploadComplete])

    return (
        <Popover onOpenChange={onOpenChage} open={open} >
            <PopoverTrigger>
                <Button variant={'ghost'} size={bubble ? 'xs' : 'icon'} className={cn(focused && "bg-zinc-800")} onClick={(e) => {
                    e.stopPropagation()
                    onOpenChage(open)
                }}  >
                    <ImageIcon size={bubble ? 15 : 20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" sideOffset={10} className="w-max p-2">
                <FileUpload endpoint="animeBlogContentImage" onChange={(url) => onHandleUpload(url!)} value="" />
            </PopoverContent>
        </Popover>
    )
}

export default AddImage