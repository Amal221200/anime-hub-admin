"use client"
import { Editor, FloatingMenu } from "@tiptap/react"
import { Heading2, List, ListOrdered, Pilcrow, Table2 } from "lucide-react"
import { useCallback, useMemo } from "react"
import AddImage from "./AddImage"
import { Toggle } from "../ui/toggle"

const FloatingMenuContent = ({ editor }: { editor: Editor | null }) => {

  const handleUpload = useCallback((url: string) => {
    editor?.chain().focus().setImage({ src: url, alt: `${name} ${crypto.randomUUID()}` }).run()
  }, [editor])

  const handleHeading = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }, [editor])

  const handleParagraph = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }, [editor])

  const isActive = useMemo(() => editor?.isActive("heading") || editor?.isActive("paragraph") || editor?.isActive("link") || !editor?.isActive("image"), [editor])

  if (!editor) {
    return null
  }

  return (
    <FloatingMenu editor={editor}>
      <div className="flex items-center gap-x-2 rounded-md border border-input bg-background/10 backdrop-blur">
        <Toggle size="xs" title="heading" className="p-2" pressed={editor.isActive("heading")} onPressedChange={handleHeading}>
          <Heading2 size={15} />
        </Toggle>
        <Toggle size="xs" title="table" pressed={editor?.isActive("table")} onPressedChange={() => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }}>
          <Table2 size={15} />
        </Toggle>
        <Toggle size="xs" title="bullet-list" pressed={editor?.isActive("bulletList")} onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run()
          editor.chain().focus().toggleBulletList().run()
        }}>
          <List size={15} />
        </Toggle>
        <Toggle size="xs" title="ordered-list" pressed={editor?.isActive("orderedList")} onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run()
          editor.chain().focus().toggleOrderedList().run()
        }}>
          <ListOrdered size={15} />
        </Toggle>
        <AddImage bubble onUploadComplete={handleUpload} focused={editor?.isActive("image")} />
      </div>
    </FloatingMenu>
  )
}

export default FloatingMenuContent