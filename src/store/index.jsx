import { create } from "zustand";

const useStore = create((set) => ({
  showTextEditor: false,
  user: {},
  setShowTextEditor: () =>
    set((state) => ({
      showTextEditor: !state.showTextEditor,
    })),
  setUser: (userData) =>
    set(() => ({
      user: userData,
    })),
}));

export { useStore };
