import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { updateBlogContent } from "@/lib/actions/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateBlogContent(blogId: string) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const handleUpdateContent = useCallback((blogId: string) => {
        return async (content: string) => {
            return await updateBlogContent(blogId, content)
        }
    }, [])

    const { mutateAsync: onBlogUpdateContent } = useMutation({
        mutationKey: [`update_blog_content`, blogId],
        mutationFn: handleUpdateContent(blogId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast.success("BLOG CONTENT UPDATED", { description: `${data?.title} content is updated.` })
        },
        onError(error) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        onBlogUpdateContent
    }
}