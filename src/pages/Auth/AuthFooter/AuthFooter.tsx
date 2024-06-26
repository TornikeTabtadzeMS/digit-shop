export default function AuthFooter() {
  return (
    <footer className="bg-primary text-white py-6 bottom-0 fixed w-screen md:block hidden ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h1 className="text-2xl font-bold">Cowboy Ranch</h1>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 Cowboy Ranch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
