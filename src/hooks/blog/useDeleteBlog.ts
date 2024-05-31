import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useAlertModal from "../useAlertModal";
import { deleteBlog } from "../actions/blog";

export default function useDeleteblog(blog: { blogId: string, title: string }) {
    const queryClient = useQueryClient();
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['blog_delete', blog.blogId],
        mutationFn: deleteBlog(blog.blogId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast("BLOG DELETED", { description: `${blog.title} is deleted.` })
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    }, queryClient)

    return {
        mutateAsync,
        isPending
    }
}