import { create } from "zustand";

interface ILoginInterface {
  isOpen: boolean;
  setIsOpen: (isItOpen: boolean) => void;
}

const loginStore = create<ILoginInterface>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default loginStore;
