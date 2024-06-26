import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        theme="colored"
        hideProgressBar={false}
      />
      <RouterProvider router={Router} />
    </>
  );
}
