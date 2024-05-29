"use client";

import "@blocknote/core/fonts/inter.css";
import { useCallback, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import { cn } from "@/lib/utils";
import "@blocknote/mantine/style.css";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

interface BlogEditorProps {
    title: string,
    content?: string
}

const BlogEditor = ({ title, content }: BlogEditorProps) => {

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
        schema: BlockNoteSchema.create({
            blockSpecs: {
                ...defaultBlockSpecs,
            },

        })

    })

    useEffect(() => {
        (async () => {
            const blocks = await editor.tryParseHTMLToBlocks(content || `<h1>Hello World</h1>
            <img src="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F4984f8a5-fe83-4429-b154-972bb15d39f2-czdgic.png&w=1920&q=75">`);
            editor.replaceBlocks(editor.document, blocks)
        })()
    }, [editor, content, title])


    return (
        <div>
            <BlockNoteView
                editor={editor}
                editable={!isUploading}
                className={cn("mx-auto max-w-5xl prose-h1:text-6xl prose-headings:font-semibold prose-p:text-lg prose-headings:my-3 transition-all", isUploading && "cursor-wait opacity-70")} />
        </div>
    )
}

export default BlogEditor