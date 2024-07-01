import { ChangeEvent, useEffect, useState } from "react";
import categoryService from "../services/Category";
import { toast } from "react-toastify";
import { IProductCategory } from "../interfaces/categoryInterfaces";
import productService from "../services/Product";
import productStore from "../stores/ProductStore";

const Sidebar = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const { setProducts } = productStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    if (query != "" || categories.length > 0) {
      productService
        .getAll({ categoryName: activeCategories, productName: query })
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [activeCategories, categories.length, query, setProducts]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setActiveCategories(() =>
      checked
        ? [...activeCategories, name]
        : activeCategories.filter((category) => category !== name)
    );
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:w-3/12 w-screen fixed md:relative ">
      <div className="flex items-center min-w-full justify-between md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-black focus:outline-none"
        >
          {!isOpen && (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`md:h-full h-5/6 overflow-scroll	md:overflow-auto bg-secondary text-white flex flex-col md:min-w-5/12 flex flex-col p-4 space-y-5 transition-transform transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 ftop-50 left-0 w-64 md:w-auto md:flex md:flex-col`}
      >
        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="text-black focus:outline-none md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {/* Search Form */}
        <div className="flex items-center justify-center h-20 shadow-md">
          <div className="flex items-center justify-center p-4 w-full max-w-md">
            <form className="w-full">
              <div className="relative">
                <input
                  type="text"
                  className="w-full text-gray-800 py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M17.65 11a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className={`flex flex-col p-4 space-y-5`}>
          {categories.map((cat) => (
            <label key={cat.id} className="text-white hover:text-gray-300">
              <input
                type="checkbox"
                name={cat.name}
                className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">{cat.name}</span>
            </label>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
