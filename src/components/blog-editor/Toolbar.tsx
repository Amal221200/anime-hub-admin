"use client"
import { Bold, Heading2, ImageIcon, Italic } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"

const Toolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="mb-4 space-x-3 rounded-md border border-input bg-transparent">
            <Toggle size="sm" pressed={editor.isActive("heading")} onPressedChange={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}>
                <Heading2 />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive("heading")} onPressedChange={() => {
                editor.chain().focus().toggleBold().run()
            }}>
                <Bold />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive("heading")} onPressedChange={() => {
                editor.chain().focus().toggleItalic().run()
            }}>
                <Italic />
            </Toggle>
            <Toggle size="sm" pressed={editor.isActive("heading")} onPressedChange={() => {
                const n = editor.schema.nodes.image.create({ 'src': 'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/77e7946c37c8e900ca7693e91a9f0f5d?_a=AQAEuiZ' })

                const ne = editor.$doc.content.addToEnd(n)
                editor.view.dispatch(
                    editor.state.tr.replaceWith(0, editor.state.doc.content.size, ne)
                )
            }}>
                <ImageIcon />
            </Toggle>
        </div>
    )
}

export default Toolbar