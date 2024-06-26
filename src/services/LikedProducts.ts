import API from "../utils/API";

const likedProductServices = {
    getAll: () => API.get("liked-products"),
    addOne: (product_id:string) => API.post("liked-products",{product_id}),
    delete: (id:string) => API.delete(`liked-products/${id}`)
}

export default likedProductServices;