import { create } from "zustand";

interface ISampleStore {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const initialState = 0;

export const useSampleStore = create<ISampleStore>((set) => ({
  count: initialState,
  setCount: (count: number) => set({ count }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: initialState }),
}));
