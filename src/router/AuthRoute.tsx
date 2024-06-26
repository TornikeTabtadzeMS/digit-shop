import { Outlet } from "react-router";
import Home from "../pages/Home/Home";
import authStore from "../stores/AuthStore";

export default function AuthRoute() {
  const isLogedIn = authStore((state) => !!state.user);
  return isLogedIn ? <Home /> : <Outlet />;
}
