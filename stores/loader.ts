import { create } from "zustand";

interface LoadStore {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export default create<LoadStore>()((set) => ({
  isLoading: true,
  startLoading: () => set(() => ({ isLoading: true })),
  stopLoading: () => set(() => ({ isLoading: false })),
}));
