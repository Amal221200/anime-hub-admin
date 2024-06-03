import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkKit from "@tiptap/extension-link"
import ImageKit from "@tiptap/extension-image";
import TypographyKit from "@tiptap/extension-typography";

const extensions = [
    StarterKit,
    LinkKit.configure({ protocols: ['https', 'http'] }),
    ImageKit.configure({ HTMLAttributes: { class: 'mx-auto rounded' } }),
    TypographyKit,
];

export default function useBlogEditor({ initialContent }: { initialContent?: string, blogId: string }) {

    const editor = useEditor({
        extensions,
        content: initialContent || `<h3>Enter your content</h3><p></p>`,
        editorProps: {
            attributes: {
                class: "p-4 w-full h-full overflow-y-auto bg-zinc-900 rounded outline-none no-scrollbar"
            }
        },
        autofocus: 'end',
    })

    return {
        editor
    }
}