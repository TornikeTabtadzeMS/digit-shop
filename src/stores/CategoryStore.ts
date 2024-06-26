import { create } from "zustand";
import { ICartProduct } from "../interfaces/productInterfaces";

interface ICartStore {
  cart: ICartProduct[] | null;
  setCart: (cart:ICartProduct[]) => void;
}

const cartStore = create<ICartStore>()((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
}));

export default cartStore;
