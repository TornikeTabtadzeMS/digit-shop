import { useEffect } from "react";
import productService from "../../services/Product";
import Sidebar from "../../layout/SideBar";
import productStore from "../../stores/ProductStore";
import ProductCard from "./ProductCard";
import authStore from "../../stores/AuthStore";
import Login from "../Auth/Login/Login";
import loginStore from "../../stores/LoginStore";

export default function Catalog() {
  const { isOpen, setIsOpen } = loginStore();
  const { products, setProducts } = productStore();
  authStore();

  useEffect(() => {
    productService.getAll().then((res) => {
      setProducts(res.data.products);
    });
  }, [setProducts]);

  if (products == null) return <h1>no products</h1>;
  return (
    <div className={`flex w-full flex-col md:flex-row`}>
      <Sidebar />
      <div
        className={`${
          !isOpen && "hidden"
        } fixed z-10 w-full h-full bg-blend-darken	`}
      >
        <button
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Login />
      </div>
      <div
        className={`md:w-9/12 w-screen item-center justify-around flex flex-wrap ${
          isOpen && "pointer-events-none"
        }`}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
