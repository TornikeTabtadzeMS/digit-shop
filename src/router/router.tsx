import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PrivateRouter from "./PrivateRouter";
import Catalog from "../pages/Catalog/Catalog";
import Error from "../pages/Error/Error";
import AddminRoute from "./AdminRoute";
import Admin from "../pages/Admin/Admin";
import Auth from "../pages/Auth/Auth";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/Catalog/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Profile";
import CartPage from "../pages/Cart/CartPage";
import Edit from "../pages/Profile/Edit";
import Favorites from "../pages/Catalog/WishList/Favorites";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      {
        path: "/shop",
        element: <Catalog />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetails />,
      },

      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/editprofile",
            element: <Edit />,
          },
          {
            path: "/liked",
            element: <Favorites />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            element: <AddminRoute />,
            children: [{ path: "/admin", element: <Admin /> }],
          },
        ],
      },
    ],
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
        children: [
          { path: "/auth", element: <Login /> },
          { path: "/auth/login", element: <Login /> },
          { path: "/auth/register", element: <Register /> },
        ],
      },
    ],
  },
]);

export default Router;