import create from 'zustand';

type Props = {
  errors: [];
  updateErrors: (newError: []) => void;
};

export const useErrorStore = create<Props>((set) => ({
  errors: [],
  updateErrors: (newError) => set(() => ({ errors: newError })),
}));
