import { Link } from "react-router-dom";
import {
  IProduct,
  IRootLikedProduct,
} from "../../interfaces/productInterfaces";
import loginStore from "../../stores/LoginStore";
import authStore from "../../stores/AuthStore";
import { toast } from "react-toastify";
import cartService from "../../services/Cart";
import likedProductServices from "../../services/LikedProducts";
import productStore from "../../stores/ProductStore";
import { useState } from "react";

interface IProp {
  product: IProduct;
}

export default function ProductCard({ product }: IProp) {
  const { setIsOpen } = loginStore();
  const { user } = authStore();
  const { favorites } = productStore();
  const [favoriteItems, setFavoriteItems] =
    useState<IRootLikedProduct[]>(favorites);
  const isFavorite = favoriteItems.some((f) => f.product_id == product.id);

  const handleAddToCart = () => {
    if (user) {
      cartService
        .addOne({ product_id: product.id })
        .then((res) => {
          console.log(res.data);
          toast.success(`the product ${product.title} added to cart`);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setIsOpen(true);
    }
  };

  const handleAddToWishlist = () => {
    if (user) {
      likedProductServices
        .addOne(product.id)
        .then((res) => {
          console.log(res.data);
          setFavoriteItems(favorites);
          toast.success(`the product: ${product.title} has added to wishlist`);
          location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden relative mt-4 shadow-lg bg-white">
        {product.image && (
          <img className="w-full" src={product.image} alt={product.title} />
        )}
        <div className="px-6 py-4 mb-6 pb-6">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className="text-gray-700 text-base ">{product.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between w-full absolute bottom-0">
          <div>
            <button
              className="inline-block hover:bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              onClick={handleAddToCart}
            >
              add to cart
            </button>
            {!isFavorite ? (
              <button
                onClick={handleAddToWishlist}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                <i className="fa-solid fa-heart hover:text-error"></i>
              </button>
            ) : (
              <i className="fa-solid fa-heart text-error"></i>
            )}
          </div>
          <Link to={`${product.id}`}>details</Link>
        </div>
      </div>
    </>
  );
}
