"use client"

import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { FormControl } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ControllerProps, ControllerRenderProps } from "react-hook-form"
import { animeFormSchema } from "@/lib/schema"
import { z } from "zod"

interface DateInputProps {
    field: ControllerRenderProps<z.infer<typeof animeFormSchema>, "release">
}

const DateInput = ({ field }: DateInputProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={(new Date(Date.now())).getFullYear()}
                    classNames={{
                        month: 'space-y-4',
                        caption: 'flex justify-center pt-1 relative items-center gap-2 px-2',
                        caption_label: 'text-sm font-medium capitalize',
                        caption_dropdowns: 'flex justify-center gap-2',
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DateInput