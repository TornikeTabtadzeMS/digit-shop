import { useEffect, useState } from "react";
import authStore from "../../stores/AuthStore";
import { Link } from "react-router-dom";
import { IUser, Roles } from "../../interfaces/userInterfaces";
import admin from "../../assets/images/admin.png";
import {
  FavoriteBorder,
  Logout,
  PermIdentity,
  ShoppingCart,
} from "@mui/icons-material";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState<null | IUser>(null);
  const { user, clearTokens, setUser } = authStore();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setCustomer(user);
  }, [user]);

  const handleLogout = () => {
    clearTokens();
    setUser(null);
    location.reload();
  };

  return (
    <div className="relative inline-block z-20 text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={handleToggle}
        >
          {customer?.email}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <Link
              to="/profile"
              className="flex justify-between text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Profile <PermIdentity />
            </Link>
            {user?.role === Roles.ADMIN && (
              <Link
                to="/admin"
                className="flex justify-between text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Admin <img width={20} height={5} src={admin} alt="admin" />
              </Link>
            )}
            <Link
              to="/cart"
              className="flex justify-between text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Cart <ShoppingCart />
            </Link>
            <Link
              to="/liked"
              className="flex justify-between text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              WishList <FavoriteBorder />
            </Link>
            <button
              onClick={handleLogout}
              className="flex justify-between text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Logout <Logout />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
