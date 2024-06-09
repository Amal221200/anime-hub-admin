"use client"
import { Trash2 } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuImage = ({ editor }: { editor: Editor | null }) => {
  
  if (!editor) {
    return null
  }

  return (
    <BubbleMenu editor={editor} className={bubbleMenuData.image.class} shouldShow={({ editor }) => editor?.isActive("image")}
      pluginKey={bubbleMenuData.image.pluginKey}>
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background/40 backdrop-blur-sm sm:gap-x-4">
        <div className="flex items-center gap-x-2 rounded-md">
          <Toggle size="xs" title="delete-image" pressed={!editor.can().deleteSelection()} className="hover:text-red-400/90" onPressedChange={() => {
            editor.chain().focus().deleteSelection().run()

          }}>
            <Trash2 size={15} className="text-red-600" />
          </Toggle>
        </div>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuImage