import { PluginKey } from "@tiptap/pm/state";

export const bubbleMenuData = {
    main: {
        class: "bubble-menu-main",
        pluginKey: new PluginKey("bubbleMenuMain")
    },
    table: {
        class: "bubble-menu-table",
        pluginKey: new PluginKey("bubbleMenuTable")
    },
    image: {
        class: "bubble-menu-image",
        pluginKey: new PluginKey("bubbleMenuImage")
    },
    orderedList: {
        class: "bubble-menu-ordered-list",
        pluginKey: new PluginKey("bubbleMenuOrderedList")
    },
    bulletList: {
        class: "bubble-menu-bullet-list",
        pluginKey: new PluginKey("bubbleMenuBulletList")
    },
}