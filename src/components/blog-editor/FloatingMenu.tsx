"use client"
import { Editor } from "@tiptap/react"
import { Heading2, Pilcrow } from "lucide-react"
import { useCallback, useMemo } from "react"
import AddImage from "./AddImage"
import { Toggle } from "../ui/toggle"

const FloatingMenuContent = ({ editor }: { editor: Editor | null }) => {

  const handleUpload = useCallback((url: string) => {
    const imageNode = editor?.schema.nodes.image.create({ 'src': url })!
    const transaction = editor?.state.tr.replaceSelectionWith(imageNode)!
    editor?.view.dispatch(transaction)
  }, [editor])

  const handleHeading = useCallback(() => {
    const headingNode = editor?.schema.nodes.heading.create({ 'level': 2 })!
    const transaction = editor?.state.tr.replaceSelectionWith(headingNode)!
    editor?.view.dispatch(transaction)
  }, [editor])

  const handleParagraph = useCallback(() => {
    const paragraphNode = editor?.schema.nodes.paragraph.create({})!
    const transaction = editor?.state.tr.replaceSelectionWith(paragraphNode)!
    editor?.view.dispatch(transaction)
  }, [editor])
  
  const isActive = useMemo(() => editor?.isActive("heading") || editor?.isActive("paragraph") || editor?.isActive("link"), [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md border border-input bg-background/10 backdrop-blur">
      <Toggle size="xs" className="p-2" pressed={isActive && editor.isFocused} onPressedChange={handleHeading}>
        <Heading2 size={15} />
      </Toggle>
      <Toggle size="xs" className="p-2" pressed={isActive && editor.isFocused} onPressedChange={handleParagraph}>
        <Pilcrow size={15} />
      </Toggle>
      <AddImage onUploadComplete={handleUpload} bubble focused={isActive && editor.isFocused} />
    </div>
  )
}

export default FloatingMenuContent