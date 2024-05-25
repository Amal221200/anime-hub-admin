import { create } from "zustand";

interface AlertModalStore {
    open: boolean;
    title: string;
    description: string;
    onOpen: (data: { title: string, description: string }) => void;
    onClose: () => void;
}

const useAlertModal = create<AlertModalStore>((set) => ({
    open: false,
    title: '',
    description: '',
    onOpen({ title, description }) {
        set({ open: true, title, description })
    },
    onClose() {
        set({ open: false, title: '', description: '' })
    }
}));

export default useAlertModal