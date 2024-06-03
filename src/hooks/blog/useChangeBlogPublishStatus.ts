import { toast } from "sonner"
import useAlertModal from "../useAlertModal"
import { useCallback } from "react"
import { updateBlogPublish } from "@/lib/actions/blog"

export default function useChangeBlogPublishStatus(blog: { blogId: string, title: string, publish: boolean }) {
    const { onOpen: onAlertOpen } = useAlertModal()

    const onPublishStatusChange = useCallback(async (blogId: string, publish: boolean) => {
        try {
            await updateBlogPublish(blogId, publish)
            toast.success("PUBLISH STATUS CHANGED", {
                description: `Publish status of ${blog.title} has changed to ${publish ? 'TRUE' : 'FALSE'}`,
            })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, blog.title])

    return {
        onPublishStatusChange,
    }
}