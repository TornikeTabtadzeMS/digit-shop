import { userRegisterDTO } from "../interfaces/userInterfaces";
import API from "../utils/API";

const authServices = {
  login: (body:{email: string, password: string}) =>
    API.post("auth/login", body),

  register: (body: userRegisterDTO) => API.post("auth/register", body),

  refreshToken: (refresh_token: string) =>
    API.post("auth/update-tokens", { refresh_token }),
};

export default authServices;
