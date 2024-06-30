import { useEffect } from "react";
import productService from "../../services/Product";

export default function Home() {
  useEffect(() => {
    productService.getAll().then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <main className="flex-grow container mx-auto p-4">
      <section className="text-center my-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cowboy Ranch</h1>
        <p className="text-lg text-gray-700">Buy cool cowboy things.</p>
      </section>
    </main>
  );
}
