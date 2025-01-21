import { create } from "zustand";

const useStore = create((set) => ({
  showTextEditor: false,
  setShowTextEditor: () =>
    set((state) => ({
      showTextEditor: !state.showTextEditor,
    })),
}));

export { useStore };
