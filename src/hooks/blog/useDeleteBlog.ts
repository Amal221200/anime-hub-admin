import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { deleteBlog } from "@/lib/actions/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteblog(blogId: string ) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()
    const handleDelete = useCallback((blogId: string) => {
        return async () => {
            return await deleteBlog(blogId)
        }
    }, [])

    const { mutateAsync: onDelete } = useMutation({
        mutationKey: [`delete_blog`, blogId],
        mutationFn: handleDelete(blogId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast.success("BLOG DELETED", { description: `${data?.title} is deleted.` })
        },
        onError(error: AxiosError | any, variables, context) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        onDelete
    }
}