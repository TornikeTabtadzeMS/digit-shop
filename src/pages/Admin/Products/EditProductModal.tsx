import { TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import productService from "../../../services/Product";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProductModal({ isOpen, onClose }: Prop) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const handleEditProduct = (data: FieldValues) => {
    productService
      .updateProduct({
        id: data.id,
        image: data.image,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("success");
        onClose();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
          <h2 className="text-2xl font-semibold">Edit Product</h2>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(handleEditProduct)}>
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <TextField
              {...register("id", {
                required: "id required",
              })}
              error={!!errors.id}
              helperText={errors?.id?.message as string}
              type="text"
              size="small"
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <TextField
              type="text"
              size="small"
              {...register("image", {
                required: "image required",
              })}
              error={!!errors.image}
              helperText={errors?.image?.message as string}
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isValid ? false : true}
            className={`w-full text-white py-2 rounded-md ${
              isValid ? "bg-secondary" : "bg-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
