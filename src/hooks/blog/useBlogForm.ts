import { blogSchema } from "@/lib/schema";
import { FORM_TYPE } from "@/lib/types";
import { Blog } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useAlertModal from "../useAlertModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useBlogForm(type: FORM_TYPE,
    action: (data: { data: z.infer<typeof blogSchema> }) => Promise<void>, blog?: Blog) {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { onOpen } = useAlertModal()

    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog?.title || '',
            imageLink: blog?.imageLink || '',
            description: blog?.description || '',
        },
    })

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`blog_${type}`.toLowerCase(), blog?.id],
        mutationFn: action,
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ["fetch_blogs"] });
            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${blog?.title}`
                })

            if (type === FORM_TYPE.ADD) {
                form.reset()
            }
            router.refresh()
        }
    }, queryClient)

    return {
        form,
        mutateAsync,
        isPending
    }
}