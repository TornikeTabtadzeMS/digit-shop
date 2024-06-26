import { Navigate } from "react-router";
import authStore from "../stores/AuthStore";
import { Roles } from "../interfaces/userInterfaces";

export default function AddminRoute() {
  const role = authStore((state) => state.user?.role);

  return role === Roles.ADMIN ? <h1>admin</h1> : <Navigate to="/" />;
}
