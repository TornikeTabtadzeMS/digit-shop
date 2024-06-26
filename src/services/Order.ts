import API from "../utils/API";

const orderServices = {
    buy: (order:{totalPrice:number, totalItems:number}) => API.post("purchases", order),
    getOneOrder: (id:string) => API.get(`purchases/${id}`),
    cancleOrder: (id:string) => API.delete(`purchases/${id}`),
    getAllHistory: () => API.get("purchases")
}

export default orderServices