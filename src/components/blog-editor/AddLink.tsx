"use client"
import { LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormEvent, useCallback, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Toggle } from "../ui/toggle";

const AddLink = ({ onAddLink, bubble, focused }: { onAddLink: (url: string) => void, bubble?: boolean, focused?: boolean }) => {
    const [open, setOpen] = useState(false)

    const onOpenChage = (open: boolean) => {
        setOpen(open);
    }

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const link = formData.get('link')?.toString().trim()!
        onAddLink(link)
        form.reset()
        onOpenChage(false)
    }, [onAddLink])

    return (
        <Popover onOpenChange={onOpenChage} open={open} >
            <PopoverTrigger asChild>
                <Toggle title="link" size={bubble ? "xs" : 'sm'} className={cn(focused && "bg-zinc-800")} onClick={(e) => {
                    e.stopPropagation()
                    if (focused) {
                        onAddLink('')
                        return onOpenChage(false)
                    }
                    onOpenChage(true)
                }}  >
                    <LinkIcon size={bubble ? 15 : 20} />
                </Toggle>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" sideOffset={10} className="w-max p-2">
                <form className="space-y-3" onSubmit={onSubmit}>
                    <Input type="url" name="link" id="" placeholder="link" required />
                    <Button type="submit">Add</Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default AddLink