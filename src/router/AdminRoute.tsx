import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";
import { IUser, Roles } from "../interfaces/userInterfaces";
import { Link } from "react-router-dom";

export default function AddminRoute() {
  const isAdmin = () => {
    const token = localStorage.getItem("accessToken");
    const user: IUser = jwtDecode(token!);
    return user.role == Roles.ADMIN;
  };
  return isAdmin() ? (
    <div className="bg-white h-screen w-screen">
      <nav className="bg-gray-800 p-4 flex justify-center w-full">
        <div className=" w-3/12 flex justify-between items-center">
          <Link to="/admin" className="text-white hover:text-gray-400">
            Categories
          </Link>
          /
          <Link to="/products" className="text-white hover:text-gray-400">
            Products
          </Link>
        </div>
      </nav>
      <div className="max-w-screen">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}
