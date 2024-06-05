import { useEditor } from "@tiptap/react";
import useDebounce from "./useDebounce";
import { extensions } from "@/lib/constants";
import useUpdateBlogContent from "./blog/useUpdateBlogContent";



export default function useBlogEditor({ initialContent, blogId, editable }: { initialContent?: string, blogId: string, editable: boolean }) {
    const { onBlogUpdateContent } = useUpdateBlogContent(blogId);
    const updateContent = useDebounce(async (content: string) => {
        await onBlogUpdateContent(content)
    })

    const editor = useEditor({
        extensions,
        content: initialContent || `<h3>Enter your content</h3><p></p>`,
        editorProps: {
            attributes: {
                class: "p-4 w-full h-full overflow-y-auto bg-zinc-900 rounded outline-none no-scrollbar"
            }
        },
        onUpdate({ editor }) {
            updateContent(editor.getHTML())
        },
        autofocus: 'end',
        editable
    })

    return {
        editor,
    }
}