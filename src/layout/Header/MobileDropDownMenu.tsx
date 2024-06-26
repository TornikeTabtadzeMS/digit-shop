import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../stores/AuthStore";
import { IUser } from "../../interfaces/userInterfaces";

export default function MobileDropDownMenu() {
  const [customer, setCustomer] = useState<null | IUser>(null);
  const { user, clearTokens, setUser } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    setCustomer(user);
  }, [user]);

  const handleLogout = () => {
    clearTokens();
    setUser(null);
    navigate("/");
  };
  return (
    <nav className="md:hidden">
      {customer && (
        <>
          <Link to="/" className="block text-white py-2 px-4 hover:bg-blue-500">
            Profile
          </Link>
        </>
      )}
      <Link to="/" className="block text-white py-2 px-4 hover:bg-blue-500">
        Home
      </Link>
      <Link
        to="/about"
        className="block text-white py-2 px-4 hover:bg-blue-500"
      >
        About
      </Link>
      <Link to="/shop" className="block text-white py-2 px-4 hover:bg-blue-500">
        Catalog
      </Link>
      <hr />
      {customer ? (
        <button
          onClick={handleLogout}
          className="text-white  block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/auth/login"
            className="block text-white py-2 px-4 hover:bg-blue-500"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="block text-white py-2 px-4 hover:bg-blue-500"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
