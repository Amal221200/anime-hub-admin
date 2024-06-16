import { blogSchema } from "@/lib/schema";
import { FORM_TYPE } from "@/lib/types";
import { Blog } from "@prisma/client";
import { z } from "zod";
import useAlertModal from "../useAlertModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback } from "react";
import useCurrentUser from "../current-user/useCurrentUser";
import { addBlog, updateBlog } from "@/lib/actions/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useBlogForm(type: FORM_TYPE, blog?: Blog) {
    const { data: user } = useCurrentUser()
    const { onOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog?.title || '',
            imageLink: blog?.imageLink || '',
            description: blog?.description || '',
            published: blog?.published || false
        },
    })

    const handleSubmit = useCallback(() => {
        return async (blogData: z.infer<typeof blogSchema>) => {
            return type === FORM_TYPE.ADD ? await addBlog(blogData, user?.id!) : await updateBlog(blog?.id!, blogData);
        }
    }, [blog, type, user])

    const { mutateAsync: onSubmit } = useMutation({
        mutationKey: [type === FORM_TYPE.ADD ? `add_blog` : `edit_blog`, blog?.id],
        mutationFn: handleSubmit(),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${data?.title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${data?.title}` : `Successfully edited ${data?.title}`
                })
        },
        onError(error) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        form,
        onSubmit
    }
}