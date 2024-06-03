import { blogSchema } from "@/lib/schema";
import {  FORM_TYPE } from "@/lib/types";
import { Blog } from "@prisma/client";
import { z } from "zod";
import useAlertModal from "../useAlertModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback } from "react";
import useCurrentUser from "../current-user/useCurrentUser";
import { addBlog, updateBlog } from "@/lib/actions/blog";

export default function useBlogForm(type: FORM_TYPE, blog?: Blog) {
    const { data: user } = useCurrentUser()
    const { onOpen } = useAlertModal()

    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog?.title || '',
            imageLink: blog?.imageLink || '',
            description: blog?.description || '',
        },
    })

    const onSubmit = useCallback(async (blogData: z.infer<typeof blogSchema>) => {
        try {
            if (type === FORM_TYPE.ADD) {
                await addBlog(blogData, user?.id!)
            } else {
                await updateBlog(blog?.id!, blogData)
            }

            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${blog?.title}`
                })
        } catch (error: any) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [type, blog, form, onOpen, user])

    return {
        form,
        onSubmit
    }
}