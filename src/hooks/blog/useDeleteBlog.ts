import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import {  useCallback } from "react";
import { deleteBlog } from "@/lib/actions/blog";

export default function useDeleteblog(blog: { title: string }) {
    const { onOpen: onAlertOpen } = useAlertModal()

    const onDelete = useCallback((blogId: string) => {
        try {
            deleteBlog(blogId)
            toast.success("BLOG DELETED", { description: `${blog.title} is deleted.` })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, blog.title])

    return {
        onDelete
    }
}