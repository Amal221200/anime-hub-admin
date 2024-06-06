import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/react'
import { log } from 'console'

const ResizableImage = Image.extend({
    name: 'resizable-image',
    inline: false,
    group: 'block',
    draggable: true,

    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                ...this.parent?.().HTMLAttributes,
                async onResize(content: string) {

                }
            }
        }
    },
    addStorage() {
        return {
            // width: this.options.HTMLAttributes?.width
        }
    },
    addAttributes() {
        return {
            ...this.parent?.(),
            src: {
                default: this.options.HTMLAttributes.src,
            },
            alt: {
                default: this.options.HTMLAttributes.alt,
            },
            width: {
                default: this.storage.width,
            },
            height: {
                default: this.options.HTMLAttributes.height,
            },
            class: {
                default: this.options.HTMLAttributes.class
            },
            id: {
                default: this.options.HTMLAttributes.alt
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        if(!this.storage.width){
            this.storage.width = HTMLAttributes.width || 600
        }
        return ['img', mergeAttributes(HTMLAttributes, { width: this.storage.width, height: HTMLAttributes.height, class: HTMLAttributes.class })]
    },

    addNodeView() {
        return ({ node, HTMLAttributes, editor,extension }) => {
            const wrapper = document.createElement('div')
            wrapper.className = 'resize-container'
            const b = document.createElement('button')
            b.className = 'resize-button'
            b.setAttribute('title', 'resize')
            const img = document.createElement('img')
            img.src = node.attrs.src
            img.alt = node.attrs.alt
            img.width = node.attrs.width || this.storage.width
            img.height = node.attrs.height || this.options.HTMLAttributes.height
            img.className = node.attrs.class || this.options.HTMLAttributes.class
            wrapper.appendChild(img)
            wrapper.appendChild(b)

            b.addEventListener('pointerdown', (event) => {
                event.preventDefault()
                const startX = event.pageX
                const startWidth = parseInt(document.defaultView?.getComputedStyle(img).width || '')

                const onMouseMove = (moveEvent: PointerEvent) => {
                    const currentX = moveEvent.pageX
                    const newWidth = startWidth + (currentX - startX)
                    if (newWidth < 150) {
                        return
                    }
                    this.storage.width = newWidth
                    img.width = newWidth
                }

                const onMouseUp = async (moveEvent: PointerEvent) => {
                    const currentX = moveEvent.pageX
                    const newWidth = startWidth + (currentX - startX)
                    document.removeEventListener('pointermove', onMouseMove)
                    document.removeEventListener('pointerup', onMouseUp)
                    this.storage.width = newWidth
                    // HTMLAttributes.width = newWidth
                    img.width = newWidth
                    queueMicrotask(async () => {
                        await this.options.HTMLAttributes.onResize(editor.getHTML())

                    })
                }

                document.addEventListener('pointermove', onMouseMove)
                document.addEventListener('pointerup', onMouseUp)
            })

            return {
                dom: wrapper,
                update: (updatedNode) => {
                    if (updatedNode.type !== this.type) {
                        return false
                    }
                    if (updatedNode.attrs.src !== img.src) {
                        img.src = updatedNode.attrs.src
                    }
                    if (updatedNode.attrs.alt !== img.alt) {
                        img.alt = updatedNode.attrs.alt
                    }
                    if (updatedNode.attrs.width !== img.style.width) {
                        if (parseInt(updatedNode.attrs.width) < 100) {
                            return
                        }
                        this.storage.width = updatedNode.attrs.width
                        img.width = updatedNode.attrs.width
                    }
                    if (updatedNode.attrs.height !== img.style.height) {
                        img.height = updatedNode.attrs.height
                    }
                    if (updatedNode.attrs.class !== img.className) {

                        img.className = updatedNode.attrs.class || this.options.HTMLAttributes.class
                    }
                    return true
                },
            }
        }
    },
})

export default ResizableImage
