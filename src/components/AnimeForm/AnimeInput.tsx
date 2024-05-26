import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { animeFormSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'

interface AnimeInputProps {
    form: UseFormReturn<z.infer<typeof animeFormSchema>>,
    name: "title" | "artist" | "genre" | "studio" | "status" | "watchLink" | "release" | "episodes" | "episodeDuration" | "imageLink" | "description"
}

// const AnimeInput = ({ form, name }: AnimeInputProps) => {
//     return (
//         <FormField
//             control={form.control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>
//                         Title
//                     </FormLabel>
//                     <FormControl>
//                         <Input {...field} className={cn("",form.getFieldState(name).invalid && "")} placeholder="eg: Dragon Ball Z" />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }

export default AnimeInput