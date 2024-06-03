import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkKit from "@tiptap/extension-link"
import ImageKit from "@tiptap/extension-image";
import TypographyKit from "@tiptap/extension-typography";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { LoaderPinwheel } from "lucide-react"
import { updateBlogContent } from "@/lib/actions/blog";

const extensions = [
    StarterKit,
    LinkKit.configure({ protocols: ['https', 'http'] }),
    ImageKit.configure({ HTMLAttributes: { class: 'mx-auto rounded' } }),
    TypographyKit,
];

export default function useBlogEditor({ initialContent, blogId }: { initialContent?: string, blogId: string }) {
    const pending = useRef<NodeJS.Timeout>()
    const updateContent = useCallback((content: string) => {
        const id = toast("Saving", {
            action: 10_000, icon: <LoaderPinwheel className="animate-spin" />
        })

        if (pending.current) {
            toast.dismiss(id)
            clearTimeout(pending.current)
        }

        pending.current = setTimeout(async () => {
            await updateBlogContent(blogId, content)
            toast.success("Saved")
            toast.dismiss(id)
        }, 5000)
    }, [blogId])

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
    })

    return {
        editor,
    }
}