"use client"
import { Trash2, CornerDownRight, CornerLeftUp, Plus } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuOrderedList = ({ editor }: { editor: Editor | null }) => {
  

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu editor={editor} className={bubbleMenuData.orderedList.class} shouldShow={({ editor }) => editor?.isActive("orderedList")} pluginKey={bubbleMenuData.orderedList.pluginKey}>
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background sm:gap-x-4">
        <div className="flex items-center gap-x-2 rounded-md">
          <Toggle size="xs" title="add" pressed={!editor.can().splitListItem('orderedList')} onPressedChange={() => {
            editor.chain().focus().splitListItem('listItem').run()
          }}>
            <Plus size={15} />
          </Toggle>
          <Toggle size="xs" title="sink" pressed={!editor.can().sinkListItem('listItem')} onPressedChange={() => {
            editor.chain().focus().sinkListItem('listItem').run()
          }}>
            <CornerDownRight size={15} />
          </Toggle>
          <Toggle size="xs" title="lift" pressed={!editor.can().liftListItem('listItem')} onPressedChange={() => {
            editor.chain().focus().liftListItem('listItem').run()
          }}>
            <CornerLeftUp size={15} />
          </Toggle>
          <Toggle size="xs" title="remove-list-item" pressed={!editor.can().deleteNode('orderedList')} className="hover:text-red-400/90" onPressedChange={() => {
            editor.chain().focus().deleteNode('orderedList').run()
          }}>
            <Trash2 size={15} className="text-red-600" />
          </Toggle>
        </div>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuOrderedList