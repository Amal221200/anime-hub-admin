import { useUploadThing } from "@/lib/uploadthing";
import { use, useCallback } from "react";
import { toast } from "sonner";
import useAlertModal from "./useAlertModal";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkKit from "@tiptap/extension-link"
import ImageKit from "@tiptap/extension-image";
import TypographyKit from "@tiptap/extension-typography";
import { useDebounceCallback } from "usehooks-ts";

const extensions = [StarterKit, LinkKit, ImageKit.configure({ HTMLAttributes: { class: 'mx-auto rounded' } }), TypographyKit];
export default function useBlogEditor({ initialContent, blogId }: { initialContent?: string, blogId: string }) {
    const { actions } = use(ActionsContext) as ActionsProviderType;
    const { onOpen: onAlertOpen } = useAlertModal()

    const debouncedSave = useDebounceCallback(async (content: string) => {
        try {
            if (content.startsWith(`<h3>Enter your content</h3>`) || content === initialContent) {
                return
            }

            actions.updateBlogContent(blogId, content)
            toast.success("BLOG SAVED", {})
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, 4000)

    const editor = useEditor({
        extensions,
        content: initialContent || `<h3>Enter your content</h3><p></p>`,
        editorProps: {
            attributes: {
                class: "p-2 w-full h-full overflow-y-auto bg-zinc-900 rounded outline-none"
            }
        },
        autofocus: 'end',
        onUpdate(props) {
            if (debouncedSave.isPending()) {
                debouncedSave.cancel()
            }
            debouncedSave(props.editor.getHTML())
        }
    })

    // const { startUpload, isUploading } = useUploadThing("animeBlogContentImage", {
    //     onClientUploadComplete: () => {
    //         console.log("uploaded successfully!");
    //     },
    //     onUploadError: () => {
    //         console.log("error occurred while uploading");
    //     },
    //     onUploadBegin: () => {
    //         console.log("upload has begun");
    //     },
    // })

    // const imageUploadHandler = useCallback(async (file: File) => {
    //     if (!file.type.startsWith('image')) {
    //         return ''
    //     }
    //     const res = (await startUpload([file]))!

    //     return res?.at(0)?.url || ''
    // }, [startUpload])

    return {
        editor
    }
}