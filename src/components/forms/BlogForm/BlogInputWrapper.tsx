import React, { ReactNode } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { animeFormSchema, blogSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'

type inputTypes = keyof z.infer<typeof blogSchema>

function BlogInputWrapper<T extends inputTypes>({ form, name, children, label, className }: {
    form: UseFormReturn<z.infer<typeof blogSchema>>,
    name: T,
    children: ((field: ControllerRenderProps<z.infer<typeof blogSchema>, T>) => ReactNode),
    label: string,
    className?: string
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof blogSchema>, T> }) => (
                <FormItem className={cn('', className)}>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl>
                        {children(field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default BlogInputWrapper