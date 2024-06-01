import { useUploadThing } from "@/lib/uploadthing";
import { useCreateBlockNote } from "@blocknote/react";
import { use, useCallback } from "react";
import { toast } from "sonner";
import useAlertModal from "./useAlertModal";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";

export default function useBlogEditor({ trailingBlock, blogId }: { trailingBlock?: boolean, blogId: string }) {
    const { actions } = use(ActionsContext) as ActionsProviderType;
    const { onOpen: onAlertOpen } = useAlertModal()
    const { startUpload, isUploading } = useUploadThing("animeBlogContentImage", {
        onClientUploadComplete: () => {
            console.log("uploaded successfully!");
        },
        onUploadError: () => {
            console.log("error occurred while uploading");
        },
        onUploadBegin: () => {
            console.log("upload has begun");
        },
    })

    const imageUploadHandler = useCallback(async (file: File) => {
        if (!file.type.startsWith('image')) {
            return ''
        }
        const res = (await startUpload([file]))!

        return res?.at(0)?.url || ''
    }, [startUpload])


    const editor = useCreateBlockNote({
        uploadFile: imageUploadHandler,
        defaultStyles: false,
        trailingBlock
    })

    const onSubmit = useCallback(async (blogContent: string) => {
        try {
            actions.updateBlogContent(blogId, blogContent)
            toast.success("BLOG SAVED", {})
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [actions, onAlertOpen, blogId])

    return {
        editor,
        isUploading,
        saveBlog: onSubmit,
    }
}