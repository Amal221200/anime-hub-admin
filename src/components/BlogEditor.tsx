"use client";
import "@blocknote/core/fonts/inter.css";
import { useCallback, useEffect, useRef } from "react";
import { BlockNoteView } from "@blocknote/mantine"
import { cn } from "@/lib/utils";
import "@blocknote/mantine/style.css";
import useBlogEditor from "@/hooks/useBlogEditor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

interface BlogEditorProps {
    title: string,
    content?: string,
    blogId: string
}

const BlogEditor = ({ title, content, blogId }: BlogEditorProps) => {

    const { data: user } = useCurrentUser()
    const { editor, isUploading, saveBlog } = useBlogEditor({ trailingBlock: !Boolean(content), blogId })
    const router = useRouter()
    const debouncedSave = useDebounceCallback(async () => {
        const html = await editor.blocksToHTMLLossy();
        if (html === content) {
            return
        }

        await saveBlog({ content: html })
        router.refresh()
    }, 4000)

    const onChange = useCallback(() => {
        if (debouncedSave.isPending()) {
            debouncedSave.cancel()
        }
        debouncedSave()
    }, [debouncedSave])

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
                editable={!isUploading || (!user || user.role === 'USER')}
                className={cn("mx-auto max-w-5xl prose-h1:text-6xl prose-h3:text-3xl prose-h2:text-4xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-xl prose-headings:font-semibold prose-p:text-md prose-headings:my-3 transition-all", isUploading && "cursor-wait opacity-70", (!user || user.role === 'USER') && "cursor-not-allowed")} onChange={onChange} autoFocus />
        </div>
    )
}

export default BlogEditor