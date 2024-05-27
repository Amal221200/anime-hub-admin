import { create } from "zustand";

interface DialogModalStore {
    open: boolean;
    title: string;
    description: string;
    onOpen: (data: { title: string, description: string, action: () => Promise<void> }) => void;
    onClose: (callAction: boolean) => void;
    action: () => Promise<void>,
    disabled?: boolean
}

const useDialogModal = create<DialogModalStore>((set, get) => ({
    open: false,
    title: '',
    description: '',
    onOpen({ title, description, action }) {
        set({ open: true, title, description, action })
    },
    onClose(callAction) {
        const { action } = get()
        if (!callAction) {
            return set({ open: false, title: '', description: '', action: undefined })
        }

        set({ disabled: true })
        action().finally(() =>
            set({ open: false, title: '', description: '', action: undefined, disabled: false })
        )
    },
    async action() {

    },
}));

export default useDialogModal