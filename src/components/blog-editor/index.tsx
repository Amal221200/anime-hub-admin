"use client"
import { EditorContent } from "@tiptap/react"
import useBlogEditor from "@/hooks/useBlogEditor";
import dynamic from "next/dynamic";
import ToolbarLoading from "../loading/ToolbarLoading";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";
import useAlertModal from "@/hooks/useAlertModal";

import BubbleMenuImage from "./bubble-menu/BubbleMenuImage";
import BubbleMenuTable from "./bubble-menu/BubbleMenuTable";
import BubbleMenuMain from "./bubble-menu/BubbleMenuMain";
import BubbleMenuOrderedList from "./bubble-menu/BubbleMenuOrderedList";
import BubbleMenuBulletList from "./bubble-menu/BubbleMenuBulletList";
import FloatingMenu from "./FloatingMenu";

const Toolbar = dynamic(() => import("./Toolbar"), { ssr: false, loading: () => <ToolbarLoading /> });

interface BlogEditorProps {
    title: string,
    content: string,
    blogId: string
}

const BlogEditor = ({ content, blogId }: BlogEditorProps) => {
    const { editor } = useBlogEditor({ initialContent: content, blogId })
    const { onOpen } = useAlertModal()
    const match1 = useMediaQuery('only screen and (max-width: 768px)');
    const isMobile = !(navigator.platform.includes('Win') || navigator.platform.includes('Mac') || navigator.platform.includes('Linux'))

    useEffect(() => {
        if (match1 || isMobile) {
            onOpen({ title: 'Notice', description: 'I would recommed you to use a computer for better editing experience, we will work on making the experience better for mobile devices' })
        }
    }, [onOpen, match1, isMobile])

    return (
        <div
            className={cn("mx-auto max-w-5xl ",
                "prose-headings:font-medium prose-headings:my-3 prose-ol:my-3 prose-ul:my-3 prose-table:my-3 prose-h1:mb-3 prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-xl prose-p:mb-4 prose-p:text-sm prose-a:underline prose-a:text-blue-800 prose-li:ml-6 prose-table:mx-auto prose-table:border-2 prose-th:bg-zinc-600/20 prose-th:border-2 prose-th:border-zinc-600 prose-td:border-2 prose-td:border-zinc-600 prose-img:my-3 prose-img:w-[700px] sm:prose-p:text-base"
            )} >
            <Toolbar editor={editor} blog={{ content, blogId }} />

            <EditorContent editor={editor}
                className="no-scrollbar h-[70vh] w-full overflow-y-auto rounded border-2 border-zinc-700 bg-zinc-900 outline-none"
            />

            <BubbleMenuMain editor={editor} />
            <BubbleMenuOrderedList editor={editor} />
            <BubbleMenuBulletList editor={editor} />
            <BubbleMenuImage editor={editor} />
            <BubbleMenuTable editor={editor} />
            <FloatingMenu editor={editor} />
        </div>
    )
}

export default BlogEditor