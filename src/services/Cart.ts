import API from "../utils/API";

const cartService = {
    getAllCartProducts: () => API.get("cart"),
    deleteCartProduct: ({ id, removeAll = false }: { id: string, removeAll: boolean }) => API.delete(`cart/${id}`, {params:{removeAll}}),
    clearCart: () => API.post(`cart/clear`),
    addOne: (body:{product_id:string}) => API.post("cart", body)
}

export default cartService;