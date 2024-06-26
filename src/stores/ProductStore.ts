import { create } from "zustand";
import { IProduct, IRootLikedProduct } from "../interfaces/productInterfaces";

interface IProductStore {
  products: IProduct[];
  favorites: IRootLikedProduct[];
  setFavorites: (products: IRootLikedProduct[]) => void;
  setProducts: (products: IProduct[]) => void;
}

const productStore = create<IProductStore>()((set) => ({
  products: [],
  favorites: [],
  setFavorites: (favorites) => set({favorites}),
  setProducts: (products) => set({ products }),
}));

export default productStore;