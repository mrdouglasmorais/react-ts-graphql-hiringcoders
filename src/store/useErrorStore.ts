import create from 'zustand';

type Props = {
  errors: [];
  updateErros: (newError: []) => void;
}

export const useErrorStore = create<Props>( (set) => ({
  errors: [],
  updateErros: (newError) => set( () => ({ errors: newError }))
}))