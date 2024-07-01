import { useEffect, useState } from "react";
import { IProductCategory } from "../../../interfaces/categoryInterfaces";
import categoryService from "../../../services/Category";
import { Button } from "@mui/material";
import AddCategoryModal from "./AddCategoryModal";

export default function CategoryTable() {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [addCategoryIsOpen, setAddCategoryIsOpen] = useState<boolean>(false);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [addCategoryIsOpen]);

  const handleDeleteCategory = (id: string) => {
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
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center px-6">
        <span>Categories</span>
        <Button
          onClick={() => {
            setAddCategoryIsOpen(true);
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
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {categories.map((item) => (
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
              <td className="py-3 px-6 text-left">{item.name}</td>
              <td className="py-3 px-6 text-left ">
                <div>
                  <Button
                    onClick={() => handleDeleteCategory(item.id)}
                    color="warning"
                  >
                    delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCategoryModal
        isOpen={addCategoryIsOpen}
        onClose={() => {
          setAddCategoryIsOpen(false);
        }}
      />
    </div>
  );
}
