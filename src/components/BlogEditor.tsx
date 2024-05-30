"use client";
import "@blocknote/core/fonts/inter.css";
import { useCallback, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import { cn } from "@/lib/utils";
import "@blocknote/mantine/style.css";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import useBlogEditor from "@/hooks/useBlogEditor";

interface BlogEditorProps {
    title: string,
    content?: string
}

const BlogEditor = ({ title, content }: BlogEditorProps) => {

    const { editor, isUploading } = useBlogEditor({ trailingBlock: !Boolean(content) })

    // editor.onEditorContentChange(async () => {
    //     const html = await editor.blocksToHTMLLossy();
    //     console.log(html);
    // })

    useEffect(() => {
        (async () => {
            const blocks = await editor.tryParseHTMLToBlocks(content || `<h3>Enter your content</h3>`);
            editor.replaceBlocks(editor.document, blocks)
        })()
    }, [editor, content, title])

    return (
        <div>
            <BlockNoteView
                editor={editor}
                editable={!isUploading}
                className={cn("mx-auto max-w-5xl prose-h1:text-6xl prose-h3:text-3xl prose-h2:text-4xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-xl prose-headings:font-semibold prose-p:text-md prose-headings:my-3 transition-all", isUploading && "cursor-wait opacity-70")} />
        </div>
    )
}

export default BlogEditor