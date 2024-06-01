import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";

export default function useDeleteblog(blog: { title: string }) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;

    const onDelete = useCallback((blogId: string) => {
        try {
            actions.deleteBlog(blogId)
            toast.success("BLOG DELETED", { description: `${blog.title} is deleted.` })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, blog.title, actions])

    return {
        onDelete
    }
}