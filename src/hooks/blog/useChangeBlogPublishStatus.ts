import { toast } from "sonner"
import useAlertModal from "../useAlertModal"
import { useCallback } from "react"
import { updateBlogPublish } from "@/lib/actions/blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export default function useChangeBlogPublishStatus(blogId: string) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const handlePublishStatusChange = useCallback((blogId: string) => {
        return async (publish: boolean) => {
            return await updateBlogPublish(blogId, publish)
        }
    }, [])

    const { mutateAsync: onPublishStatusChange } = useMutation({
        mutationKey: [`publish_status_change`, blogId],
        mutationFn: handlePublishStatusChange(blogId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast.success("PUBLISH STATUS CHANGED", {
                description: `Publish status of ${data?.title} has changed to ${data?.published ? 'TRUE' : 'FALSE'}`,
            })
        },
        onError(error: AxiosError | any, variables, context) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        onPublishStatusChange,
    }
}