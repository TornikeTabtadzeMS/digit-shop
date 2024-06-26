import API from "../utils/API";

const userServices = {
  getAuthorizedUser: () => API.get("user/current-user"),

  updateUser: (body:{first_name: string, last_name: string, phone_number: string}) =>
    API.put("user", body),

  deleteUser: (id:string) => API.delete(`user/delete/${id}`),
};

export default userServices;
