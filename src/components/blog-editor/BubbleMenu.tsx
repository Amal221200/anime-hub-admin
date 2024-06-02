"use client"

import { Bold, Heading2, Italic } from "lucide-react";
import { Toggle } from "../ui/toggle";
import AddLink from "./AddLink";
import { useCallback, useMemo } from "react";
import { Editor } from "@tiptap/react";

const BubbleMenuContent = ({ editor }: { editor: Editor | null }) => {
  const handleAddLink = useCallback((link: string) => {
    editor?.chain().focus().setLink({ href: link }).run();

  }, [editor])
  const isActive = useMemo(() => editor?.isActive("heading") || editor?.isActive("paragraph") || editor?.isActive("link"), [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md border border-input bg-background">
      <Toggle size="xs" className="p-2" pressed={isActive && editor.isFocused} onPressedChange={() => {
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      }}>
        <Heading2 size={15} />
      </Toggle>

      <Toggle size="xs" pressed={isActive && editor.isFocused} onPressedChange={() => {
        editor.chain().focus().toggleBold().run()
      }}>
        <Bold size={15} />
      </Toggle>

      <Toggle size="xs" pressed={isActive && editor.isFocused} onPressedChange={() => {
        editor.chain().focus().toggleItalic().run()
      }}>
        <Italic size={15} />
      </Toggle>

      <AddLink onAddLink={handleAddLink} bubble focused={isActive && editor.isFocused} />
    </div>
  )
}

export default BubbleMenuContent