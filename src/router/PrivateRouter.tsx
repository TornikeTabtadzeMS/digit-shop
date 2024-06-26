import { Navigate, Outlet } from "react-router";

export default function PrivateRouter() {
  const isAuthorized = !!localStorage.getItem("accessToken");
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
}
