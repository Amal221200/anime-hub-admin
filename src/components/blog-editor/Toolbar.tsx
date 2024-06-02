"use client"
import { Bold, Heading2, Italic } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"
import AddImage from "./AddImage"
import { use, useCallback, useMemo } from "react"
import AddLink from "./AddLink"
import { Button } from "../ui/button"
import { ActionsContext } from "../providers/ActionsProvider"
import { ActionsProviderType } from "@/lib/types"
import { toast } from "sonner"

const Toolbar = ({ editor, blog }: { editor: Editor | null, blog: { content: string, blogId: string } }) => {
    const { actions } = use(ActionsContext) as ActionsProviderType

    const handleUpload = useCallback((url: string) => {
        const imageNode = editor?.schema.nodes.image.create({ 'src': url })!
        const newDoc = editor?.$doc.content.addToEnd(imageNode)!
        const transaction = editor?.state.tr.replaceWith(0, editor.state.doc.content.size, newDoc)!
        editor?.view.dispatch(transaction)
    }, [editor])

    const handleAddLink = useCallback((link: string) => {
        editor?.chain().focus().setLink({ href: link }).run();
    }, [editor])

    const handleSubmit = useCallback(async () => {
        await actions.updateBlogContent(blog.blogId, editor?.getHTML()!)
        toast.success("Blog Saved");
    }, [actions, editor, blog])

    const isActive = useMemo(() => editor?.isActive("heading") || editor?.isActive("paragraph") || editor?.isActive("link"), [editor])

    if (!editor) {
        return null
    }

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-input bg-transparent p-2">
            <div className="flex flex-wrap items-center gap-x-3">
                <Toggle size="sm" pressed={isActive && editor.isFocused} onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}>
                    <Heading2 />
                </Toggle>

                <Toggle size="sm" pressed={isActive && editor.isFocused} onPressedChange={() => {
                    editor.chain().focus().toggleBold().run()
                }}>
                    <Bold />
                </Toggle>

                <Toggle size="sm" pressed={isActive && editor.isFocused} onPressedChange={() => {
                    editor.chain().focus().toggleItalic().run()
                }}>
                    <Italic />
                </Toggle>

                <AddImage onUploadComplete={handleUpload} focused={isActive && editor.isFocused} />
                <AddLink onAddLink={handleAddLink} focused={isActive && editor.isFocused} />
            </div>

            <Button type="button" className="ml-auto disabled:cursor-not-allowed disabled:opacity-80" disabled={blog.content === editor.getHTML()} onClick={handleSubmit} size="sm">
                Submit
            </Button>
        </div>
    )
}

export default Toolbar