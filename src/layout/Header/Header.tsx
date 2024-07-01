import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/newlogo.png";
import MobileDropDownMenu from "./MobileDropDownMenu";
import authStore from "../../stores/AuthStore";
import UserProfileDropdown from "./UserProfileDropdown";
import userServices from "../../services/User";
import likedProductServices from "../../services/LikedProducts";
import productStore from "../../stores/ProductStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = authStore();
  const { setFavorites } = productStore();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token != "" && token != null) {
      userServices
        .getAuthorizedUser()
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error.message);
          console.log(token);
        });
      likedProductServices
        .getAll()
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [setFavorites, setUser]);

  return (
    <header className="bg-primary max-w-full px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to={"/"}>
            <img width={"100px"} height={"80px"} src={logo} alt="" />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link className="text-white hover:text-gray-300" to={"/"}>
            Home
          </Link>
          <Link to={"/about"} className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to={"/shop"} className="text-white hover:text-gray-300">
            Catalog
          </Link>
          {user ? (
            <UserProfileDropdown />
          ) : (
            <div className="md:flex space-x-4 items-center">
              <Link
                to={"/auth/login"}
                className="text-white hover:text-gray-300"
              >
                LogIn
              </Link>
              <Link
                to={"/auth/register"}
                className="text-white hover:text-gray-300"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && <MobileDropDownMenu />}
    </header>
  );
};

export default Header;
