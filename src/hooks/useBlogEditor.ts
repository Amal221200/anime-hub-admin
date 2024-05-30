import { useUploadThing } from "@/lib/uploadthing";
import { useCreateBlockNote } from "@blocknote/react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useBlogEditor({ trailingBlock }: { trailingBlock?: boolean }) {
    const queryClient = useQueryClient()
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

    return {
        editor,
        isUploading
    }
}