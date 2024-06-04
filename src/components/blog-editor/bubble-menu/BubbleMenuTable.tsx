"use client"
import { BetweenHorizonalStart, BetweenVerticalStart, ListX, Merge, Split, Trash2 } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuTable = ({ editor }: { editor: Editor | null }) => {

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu className={bubbleMenuData.table.class}
      editor={editor}
      shouldShow={({ editor }) => editor?.isActive("table")}
      pluginKey={bubbleMenuData.table.pluginKey}>
        
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background/40 backdrop-blur-sm sm:gap-x-4">
        <div className="flex items-center gap-x-2 rounded-md">
          <Toggle size="xs" title="insert-row-after" pressed={!editor.can().addRowAfter()} onPressedChange={() => {
            editor.chain().focus().addRowAfter().run()
          }}>
            <BetweenHorizonalStart size={15} />
          </Toggle>
          <Toggle size="xs" title="insert-column-after" pressed={!editor.can().addColumnAfter()} onPressedChange={() => {
            editor.chain().focus().addColumnAfter().run()
          }}>
            <BetweenVerticalStart size={15} />
          </Toggle>
          <Toggle size="xs" title="delete-row" pressed={!editor.can().deleteRow()} onPressedChange={() => {
            editor.chain().focus().deleteRow().run()
          }}>
            <ListX size={15} className="rotate-180 transform" />
          </Toggle>
          <Toggle size="xs" title="delete-column" pressed={!editor.can().deleteColumn()} onPressedChange={() => {
            editor.chain().focus().deleteColumn().run()
          }}>
            <ListX size={15} className="-rotate-90 transform" />
          </Toggle>
          <Toggle size="xs" title="merge-cell" pressed={!editor.can().mergeCells()} onPressedChange={() => {
            editor.chain().focus().mergeCells().run()
          }}>
            <Merge size={15} />
          </Toggle>
          <Toggle size="xs" title="split-cell" pressed={!editor.can().splitCell()} onPressedChange={() => {
            editor.chain().focus().splitCell().run()
          }}>
            <Split size={15} />
          </Toggle>
          <Toggle size="xs" title="delete-table" pressed={!editor.can().deleteTable()} className="hover:text-red-400/90" onPressedChange={() => {
            editor.chain().focus().deleteTable().run()
          }}>
            <Trash2 size={15} className="text-red-600" />
          </Toggle>
        </div>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuTable