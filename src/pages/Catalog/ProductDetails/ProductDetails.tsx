import { useEffect, useState } from "react";
import { useParams } from "react-router";
import productService from "../../../services/Product";
import { IProduct } from "../../../interfaces/productInterfaces";
import { toast } from "react-toastify";
import authStore from "../../../stores/AuthStore";
import loginStore from "../../../stores/LoginStore";
import Login from "../../Auth/Login/Login";
import cartService from "../../../services/Cart";

export default function ProductDetails() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams<{ id: string }>();
  const { user } = authStore();
  const { setIsOpen, isOpen } = loginStore();

  useEffect(() => {
    productService
      .getOne(id!)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleAddToCart = (id: string) => {
    if (user) {
      cartService
        .addOne({ product_id: id })
        .then((res) => {
          console.log(res.data);
          toast.success(`the product: ${product!.title} has added to wishlist`);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setIsOpen(true);
    }
  };

  if (product == null) return <h1>loading</h1>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white relative shadow-md rounded-lg">
      <div className={`${!isOpen && "hidden"} left-0 fixed z-10 w-full h-full`}>
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
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{product.category_name}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold text-green-500 mr-2">
          ${product.salePrice}
        </span>
        <span className="text-xl text-gray-500 line-through">
          ${product.price}
        </span>
      </div>
      <button
        onClick={() => handleAddToCart(product.id)}
        className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-secondary"
      >
        Add to Cart
      </button>
    </div>
  );
}
