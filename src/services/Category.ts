import API from "../utils/API";

interface IaddCategoryDTO {
    name: string,
    image:string
}

const categoryService = {
    getAll: () => API.get("product-category"),
    addOne: (body:IaddCategoryDTO) => API.post("product-category", body),
    addMany: (body:IaddCategoryDTO[]) => API.post("product-category/many", body),
    deleteOne: (categoryId:string) => API.delete(`product-category/${categoryId}`),
    deleteAll: () => API.delete("product-category/delete-all"),
}

export default categoryService;