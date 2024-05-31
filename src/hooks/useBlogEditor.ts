import { editBlogContent } from "@/components/forms/form-actions/blog";
import { useUploadThing } from "@/lib/uploadthing";
import { useCreateBlockNote } from "@blocknote/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useAlertModal from "./useAlertModal";

export default function useBlogEditor({ trailingBlock, blogId }: { trailingBlock?: boolean, blogId: string }) {
    const queryClient = useQueryClient()
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

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`blog_content`, blogId],
        mutationFn: editBlogContent(blogId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_blogs'] })
            toast.success("BLOG SAVED", {})
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        editor,
        isUploading,
        saveBlog: mutateAsync,
        isPending
    }
}