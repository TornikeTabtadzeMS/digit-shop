/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProductDTO, IProductsFilter } from "../interfaces/productInterfaces";
import API from "../utils/API";

const productService = {
  getAll: (params?: IProductsFilter) => API.get("product", {params}),
  getOne: (productId: string) => API.get(`product/${productId}`),
  addOne: (body: IProductDTO) => API.post("product", body),
  addMany: (body: IProductDTO[]) => API.post("product/many", {body}),
  deleteProducts: (ids:string[]) => API.delete("product", {data:{ids}}),
  deleteAll: () => API.delete("product/delete-all"),
  updateProduct: (body:{id:string, image:string}) => API.put("product", body),
};

export default productService;
