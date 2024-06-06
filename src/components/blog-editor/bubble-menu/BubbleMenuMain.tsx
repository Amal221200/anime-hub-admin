"use client"
import { AlignCenter, AlignLeft, AlignRight, Bold, Highlighter, Italic, Strikethrough, Underline } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import AddLink from "../AddLink";
import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuMain = ({ editor }: { editor: Editor | null }) => {
 

  const handleAddLink = useCallback((link: string) => {
    if (editor?.isActive("link")) {
      return editor.chain().focus().unsetLink().run()
    }
    editor?.chain().focus().setLink({ href: link }).run();
  }, [editor])


  if (!editor) {
    return null
  }
  
  
  return (
    <BubbleMenu editor={editor} className={bubbleMenuData.main.class} shouldShow={({ editor }) => !editor.isActive('bulletList') && !editor.isActive('orderedList') && !editor.isActive('resizable-image') && !editor.isActive('table') && !editor?.state.selection.empty}
     pluginKey={bubbleMenuData.main.pluginKey}>
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background/40 backdrop-blur-sm sm:gap-x-4">
        <div className="flex items-center gap-x-1 rounded-md sm:gap-x-2">
          <Toggle size="xs" title="bold" pressed={editor?.isActive("bold")} onPressedChange={() => {
            editor.chain().focus().toggleBold().run()
          }}>
            <Bold size={15} />
          </Toggle>

          <Toggle size="xs" title="italic" pressed={editor?.isActive("italic")} onPressedChange={() => {
            editor.chain().focus().toggleItalic().run()
          }}>
            <Italic size={15} />
          </Toggle>
          <Toggle size="xs" title="strike-through" pressed={editor?.isActive("strike")} onPressedChange={() => {
            editor.chain().focus().toggleStrike().run()
          }}>
            <Strikethrough size={15} />
          </Toggle>
          <Toggle size="xs" title="underline" pressed={editor?.isActive("underline")} onPressedChange={() => {
            editor.chain().focus().toggleUnderline().run()
          }}>
            <Underline size={15} />
          </Toggle>
          <Toggle size="xs" title="highlight" pressed={editor?.isActive("highlight")} onPressedChange={() => {
            editor.chain().focus().toggleHighlight().run()
          }}>
            <Highlighter size={15} />
          </Toggle>
          <AddLink onAddLink={handleAddLink} bubble focused={editor?.isActive("link")} />
        </div>

        <div className="hidden items-center gap-x-2 rounded-md sm:ml-0 sm:flex">
          <Toggle size="xs" title="left" className="p-2" pressed={editor?.isActive({ textAlign: 'left' })} onPressedChange={() => {
            editor.chain().focus().setTextAlign('left').run()
          }}>
            <AlignLeft size={15} />
          </Toggle>

          <Toggle size="xs" title="center" pressed={editor?.isActive({ textAlign: 'center' })} onPressedChange={() => {
            editor.chain().focus().setTextAlign('center').run()
          }}>
            <AlignCenter size={15} />
          </Toggle>

          <Toggle size="xs" title="right" pressed={editor?.isActive({ textAlign: 'right' })} onPressedChange={() => {
            editor.chain().focus().setTextAlign('right').run()
          }}>
            <AlignRight size={15} />
          </Toggle>
        </div>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuMain