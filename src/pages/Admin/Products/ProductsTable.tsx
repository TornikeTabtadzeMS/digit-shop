import { useEffect, useState } from "react";
import categoryService from "../../../services/Category";
import { Button } from "@mui/material";
import { IProduct } from "../../../interfaces/productInterfaces";
import productService from "../../../services/Product";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

export default function ProductTable() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [addProductIsOpen, setAddProductIsOpen] = useState<boolean>(false);
  const [editProductIsOpen, setEditProductIsOpen] = useState<boolean>(false);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [addProductIsOpen]);

  const handleDeleteProduct = (id: string) => {
    categoryService
      .deleteOne(id)
      .then((res) => {
        console.log(res.data);
        location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="overflow-x-auto bg-white w-full h-screen">
      <div className="flex justify-between items-center px-6">
        <span>Products</span>
        <Button
          onClick={() => {
            setAddProductIsOpen(true);
          }}
          sx={{ bgcolor: "GrayText", color: "black", margin: 1 }}
        >
          Add +
        </Button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Updated At</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">image</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{item.id}</td>
              <td className="py-3 px-6 text-left">
                {new Date(item.created_at).toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(item.updated_at).toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left">{item.title}</td>
              <td className="py-3 px-6 text-left">
                <img width={50} src={item.image} alt={item.title} />
              </td>
              <td className="py-3 px-6 text-left ">
                <div>
                  <Button
                    onClick={() => handleDeleteProduct(item.id)}
                    color="warning"
                  >
                    delete
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => setEditProductIsOpen(true)}
                    color="info"
                  >
                    edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddProductModal
        isOpen={addProductIsOpen}
        onClose={() => {
          setAddProductIsOpen(false);
        }}
      />
      <EditProductModal
        isOpen={editProductIsOpen}
        onClose={() => {
          setEditProductIsOpen(false);
        }}
      />
    </div>
  );
}
