import { IProductCategory } from "./categoryInterfaces";

export interface IProductDTO {
    title:string,
    category_name:string,
    description:string,
    image:string,
    salePrice:number| null,
    price: number
}

export interface IProductsFilter {
  categoryName?: string[];
  page?: string;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  productName?: string;
  onlySales?: boolean;
}

export interface IProduct extends IProductDTO{
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ICartProduct {
  id: string
  created_at: string
  updated_at: string
  product_id: string
  user_id: string
  count: number
  cartProduct: CartProduct
}

interface CartProduct {
  id: string
  created_at: string
  updated_at: string
  title: string
  description: string
  image: string
  price: number
  salePrice: number
  category_name: string
  category: IProductCategory
}

export interface IRootLikedProduct {
  id: string
  created_at: string
  updated_at: string
  product_id: string
  user_id: string
  likedProduct: ILikedProduct
}

export interface ILikedProduct {
  id: string
  created_at: string
  updated_at: string
  title: string
  description: string
  image: string
  price: number
  salePrice: number
  category_name: string
  category: IProductCategory
}

