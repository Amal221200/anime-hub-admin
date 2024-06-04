"use client"
import { AlignCenter, AlignLeft, AlignRight, Heading2, List, ListOrdered, Table2 } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"
import AddImage from "./AddImage"
import { useCallback } from "react"

const Toolbar = ({ editor }: { editor: Editor | null, blog: { content: string, blogId: string } }) => {
    const handleUpload = useCallback((url: string, name: string) => {
        editor?.chain().focus().setImage({ src: url, alt: `${name} ${crypto.randomUUID()}`}).run()
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-input bg-transparent p-2">
            <div className="flex flex-wrap items-center gap-x-3">
                <Toggle size="sm" title="heading" pressed={editor?.isActive("heading")} onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}>
                    <Heading2 />
                </Toggle>
                <Toggle size="sm" title="table" pressed={editor?.isActive("table")} onPressedChange={() => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                }}>
                    <Table2 />
                </Toggle>
                <Toggle size="sm" title="bullet-list" pressed={editor?.isActive("bulletList")} onPressedChange={() => {
                    editor.chain().focus().toggleOrderedList().run()
                    editor.chain().focus().toggleBulletList().run()
                }}>
                    <List />
                </Toggle>
                <Toggle size="sm" title="ordered-list" pressed={editor?.isActive("orderedList")} onPressedChange={() => {
                    editor.chain().focus().toggleBulletList().run()
                    editor.chain().focus().toggleOrderedList().run()
                }}>
                    <ListOrdered />
                </Toggle>
                <AddImage onUploadComplete={handleUpload} focused={editor?.isActive("image")} />
            </div>
            <div className="ml-auto flex items-center gap-x-3 rounded-md md:ml-0">
                <Toggle title="left" className="p-2" pressed={editor?.isActive({ textAlign: 'left' })} onPressedChange={() => {
                    editor.chain().focus().setTextAlign('left').run()
                }}>
                    <AlignLeft />
                </Toggle>

                <Toggle title="center" pressed={editor?.isActive({ textAlign: 'center' })} onPressedChange={() => {
                    editor.chain().focus().setTextAlign('center').run()
                }}>
                    <AlignCenter />
                </Toggle>

                <Toggle title="right" pressed={editor?.isActive({ textAlign: 'right' })} onPressedChange={() => {
                    editor.chain().focus().setTextAlign('right').run()
                }}>
                    <AlignRight />
                </Toggle>
            </div>
        </div>
    )
}

export default Toolbar