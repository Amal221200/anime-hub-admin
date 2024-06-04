import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkKit from "@tiptap/extension-link"
import ImageKit from "@tiptap/extension-image";
import TypographyKit from "@tiptap/extension-typography";
import TextAlignKit from "@tiptap/extension-text-align";
import HighlightKit from "@tiptap/extension-highlight";
import UnderlineKit from "@tiptap/extension-underline";
import BubbleMenuKit from "@tiptap/extension-bubble-menu";
import TableKit from '@tiptap/extension-table'
import TableCellKit from '@tiptap/extension-table-cell'
import TableHeaderKit from '@tiptap/extension-table-header'
import TableRowKit from '@tiptap/extension-table-row'
import BulletListKit from '@tiptap/extension-bullet-list'
import ListItemKit from '@tiptap/extension-list-item'
import OrderedListKit from '@tiptap/extension-ordered-list'
import { updateBlogContent } from "@/lib/actions/blog";
import useDebounce from "./useDebounce";
import { PluginKey } from "@tiptap/pm/state";
import { bubbleMenuData } from "@/lib/constants";

const extensions = [
    StarterKit,
    LinkKit.configure({ protocols: ['https', 'http'] }),
    ImageKit.configure({ HTMLAttributes: { class: 'mx-auto rounded' } }),
    TypographyKit,
    TextAlignKit.configure({
        types: ['heading', 'paragraph', 'link'],
        alignments: ['left', 'right', 'center']
    }),
    BubbleMenuKit.configure({
        pluginKey: bubbleMenuData.main.pluginKey,
        element: document.querySelector(`.${bubbleMenuData.main.class}`) as HTMLElement,
    }),
    BubbleMenuKit.configure({
        pluginKey: bubbleMenuData.image.pluginKey,
        element: document.querySelector(`.${bubbleMenuData.image.class}`) as HTMLElement,
    }),
    BubbleMenuKit.configure({
        pluginKey: bubbleMenuData.table.pluginKey,
        element: document.querySelector(`.${bubbleMenuData.table.class}`) as HTMLElement,
    }),
    BubbleMenuKit.configure({
        pluginKey: bubbleMenuData.orderedList.pluginKey,
        element: document.querySelector(`.${bubbleMenuData.orderedList.class}`) as HTMLElement,
    }),
    BubbleMenuKit.configure({
        pluginKey: bubbleMenuData.bulletList.pluginKey,
        element: document.querySelector(`.${bubbleMenuData.bulletList.class}`) as HTMLElement,
    }),
    HighlightKit,
    UnderlineKit,
    TableKit.configure({
        resizable: true,
        HTMLAttributes: {
            class: "mx-auto"
        }
    }),
    TableCellKit.configure({
        HTMLAttributes: {
            class: "min-w-[80px]"
        }
    }),
    TableHeaderKit.configure({
        HTMLAttributes: {
            class: ''
        }
    }),
    TableRowKit,
    BulletListKit.configure({
        HTMLAttributes: {
            class: 'list-disc'
        }
    }),
    ListItemKit.configure({
        HTMLAttributes: {
            class: ''
        }
    }),
    OrderedListKit.configure({
        HTMLAttributes: {
            class: 'list-decimal'
        }
    }),
];

export default function useBlogEditor({ initialContent, blogId }: { initialContent?: string, blogId: string }) {
    const updateContent = useDebounce(async (content: string) => {
        await updateBlogContent(blogId, content)
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
    })

    return {
        editor,
    }
}