"use client"
import { Ruler, Trash2 } from "lucide-react";
import { Toggle } from "../../ui/toggle";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import AddImage from "../AddImage";
import { bubbleMenuData } from "@/lib/constants";

const BubbleMenuImage = ({ editor }: { editor: Editor | null }) => {
  const handleUpload = useCallback((url: string, name: string) => {
    editor?.chain().focus().setImage({ src: url, alt: `${name} ${crypto.randomUUID()}` }).run()
  }, [editor])


  const applyClass = useCallback(() => {
    if (!editor) {
      return
    }
    const { state, dispatch } = editor.view
    const { tr, selection } = state
    const { $from, $to } = selection
    let updated = false

    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type.name === 'resizable-image') {
        const newAttrs = {
          width: editor.extensionStorage['resizable-image'].width,
          src: node.attrs.src,
          alt: node.attrs.alt,
          class: node.attrs.class.includes('fix-dimension') ? node.attrs.class.replace(' fix-dimension', '') : `${node.attrs.class} fix-dimension`,
        }

        tr.setNodeMarkup(pos, undefined, newAttrs)
        updated = true
      }
    })

    if (updated) {
      dispatch(tr)
      editor.commands.focus()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu editor={editor} className={bubbleMenuData.image.class} shouldShow={({ editor }) => editor?.isActive("resizable-image")}
      pluginKey={bubbleMenuData.image.pluginKey}>
      <div className="flex w-max items-center gap-x-2 rounded-md border border-input bg-background/40 backdrop-blur-sm sm:gap-x-4">
        <div className="flex items-center gap-x-2 rounded-md">
          {/* <AddImage onUploadComplete={handleUpload} bubble focused={editor?.isActive("resizable-image")} />
          <Toggle size="xs" title="fix-dimension" pressed={editor.$node('resizable-image')?.attributes?.class?.includes('fix-dimension')} onPressedChange={applyClass}>
            <Ruler size={15} />
          </Toggle> */}
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