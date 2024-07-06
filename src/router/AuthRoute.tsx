import { Outlet } from "react-router";
import Home from "../pages/Home/Home";

export default function AuthRoute() {
  const isLogedIn = localStorage.getItem("accessToken");

  return isLogedIn ? <Home /> : <Outlet />;
}
