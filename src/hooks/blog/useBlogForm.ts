import { blogSchema } from "@/lib/schema";
import { ActionsProviderType, FORM_TYPE } from "@/lib/types";
import { Blog } from "@prisma/client";
import { z } from "zod";
import useAlertModal from "../useAlertModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { use, useCallback } from "react";
import useCurrentUser from "../current-user/useCurrentUser";

export default function useBlogForm(type: FORM_TYPE, blog?: Blog) {
    const { actions } = use(ActionsContext) as ActionsProviderType;
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
                await actions.addBlog(blogData, user?.id!)
            } else {
                await actions.updateBlog(blog?.id!, blogData)
            }

            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${blog?.title}`
                })
        } catch (error: any) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [type, actions, blog, form, onOpen, user])

    return {
        form,
        onSubmit
    }
}