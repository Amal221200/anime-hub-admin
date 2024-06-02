"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import LinkKit from "@tiptap/extension-link"
import ImageKit from "@tiptap/extension-image";
import Toolbar from "./Toolbar";
import { useState } from "react";


const BlogEditor = () => {
    const extensions = [StarterKit, LinkKit, ImageKit.configure({ HTMLAttributes: { class: 'mx-auto rounded' } })];
    const [content] = useState(`<h1>Hello World</h1>
        <img src="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/77e7946c37c8e900ca7693e91a9f0f5d?_a=AQAEuiZ" alt="" />
        <p></p>`)
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "p-2 w-full h-full bg-zinc-900 rounded outline-none border-2 border-zinc-700"
            }
        },
        autofocus: 'end',
        
    })

    return (
        <div className="mx-auto h-[500px] w-[500px] max-w-3xl prose-h1:text-3xl prose-h2:text-2xl prose-img:w-20">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="h-full w-full" />
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
            {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </div>
    )
}

export default BlogEditor