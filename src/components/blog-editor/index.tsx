"use client"
import { BubbleMenu, EditorContent, FloatingMenu } from "@tiptap/react"
import useBlogEditor from "@/hooks/useBlogEditor";
import Toolbar from "./Toolbar";
import BubbleMenuContent from "./BubbleMenu";
import FloatingMenuContent from "./FloatingMenu";

interface BlogEditorProps {
    title: string,
    content: string,
    blogId: string
}

const BlogEditor = ({ title, content, blogId }: BlogEditorProps) => {
    const { editor } = useBlogEditor({ initialContent: content, blogId })


    return (
        <div className="mx-auto max-w-5xl prose-headings:font-medium prose-h1:mb-3 prose-h1:text-center prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-xl prose-p:mb-4 prose-p:text-sm prose-a:text-blue-600 prose-img:my-3 prose-img:w-[700px] sm:prose-p:text-base" >
            <Toolbar editor={editor} blog={{ content, blogId }} />
            <EditorContent editor={editor} className="no-scrollbar h-[70vh] w-full overflow-y-auto rounded border-2 border-zinc-700 bg-zinc-900 outline-none" />

            <FloatingMenu editor={editor}>
                <FloatingMenuContent editor={editor} />
            </FloatingMenu>
            <BubbleMenu editor={editor}>
                <BubbleMenuContent editor={editor} />
            </BubbleMenu>
        </div>
    )
}

export default BlogEditor