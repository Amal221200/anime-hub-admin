"use client"
import { LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormEvent, useCallback, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
                <Button variant={'ghost'} size={bubble ? 'xs' : 'icon'} className={cn(focused && "bg-zinc-800")} onClick={(e) => {
                    onOpenChage(true)
                }}  >
                    <LinkIcon size={bubble ? 15 : 20} />
                </Button>
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