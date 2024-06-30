import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import cartStore from "../../stores/CartStore";
import orderServices from "../../services/Order";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: Prop) {
  const { cart, setCart } = cartStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });
  if (!isOpen) return null;

  const handleSubmitOrder = () => {
    const totalNumber = cart?.length;
    const totalPrice = cart?.reduce((ac, pr) => {
      return pr.cartProduct.salePrice
        ? ac + pr.cartProduct.salePrice
        : ac + pr.cartProduct.price;
    }, 0);
    if (totalNumber && totalPrice) {
      orderServices
        .buy({ totalItems: totalNumber, totalPrice: totalPrice })
        .then((res) => {
          console.log(res.data);
          setCart([]);
          navigate("/");
          toast.success("a new order has made");
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("something went wrong");
        });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-success rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Checkout</h2>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(handleSubmitOrder)}>
          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <TextField
              maxRows={16}
              {...register("card_number", {
                required: "card required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Not a validemail card",
                },
              })}
              error={!!errors.card_number}
              helperText={errors?.card_number?.message as string}
              type="number"
              size="small"
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVV</label>
            <TextField
              type="number"
              size="small"
              {...register("CVV", {
                required: "CVV is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "the CVV incorrect",
                },
              })}
              error={!!errors.CVV}
              helperText={errors?.CVV?.message as string}
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <TextField className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></TextField>
          </div>
          <button
            type="submit"
            disabled={isValid ? false : true}
            className={`w-full text-white py-2 rounded-md ${
              isValid ? "bg-secondary" : "bg-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
