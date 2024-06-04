"use client"
import { CornerDownRight, CornerLeftUp, Plus, Trash2 } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import { useCallback, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuBulletList = ({ editor }: { editor: Editor | null }) => {
  const handleUpload = useCallback((url: string) => {
    editor?.chain().focus().setImage({ src: url, alt: `${name} ${crypto.randomUUID()}` }).run()
  }, [editor])

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
    <BubbleMenu editor={editor} className={bubbleMenuData.bulletList.class} shouldShow={({ editor }) => editor?.isActive("bulletList")} pluginKey={bubbleMenuData.bulletList.pluginKey}>
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background/40 backdrop-blur-sm sm:gap-x-4">
        <div className="flex items-center gap-x-2 rounded-md">
          <Toggle size="xs" title="add" pressed={!editor.can().splitListItem('listItem')} onPressedChange={() => {
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
          <Toggle size="xs" title="remove-list-item" pressed={!editor.can().deleteNode('bulletList')} className="hover:text-red-400/90" onPressedChange={() => {
            editor.chain().focus().deleteNode('bulletList').run()
          }}>
            <Trash2 size={15} className="text-red-600" />
          </Toggle>
        </div>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuBulletList