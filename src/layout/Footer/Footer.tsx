export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 px-6 bottom-0 max-w-full ">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h1 className="text-2xl font-bold">Cowboy Ranch</h1>
            <div className="mt-2 flex items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 12.713l11.985-6.713c-.216-.492-2.094-1.979-3.822-2.763l-8.163 5.148-8.163-5.148c-1.728.784-3.606 2.271-3.822 2.763l11.985 6.713zm0 2.287l-12-6.714v11.714c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2v-11.714l-12 6.714z" />
              </svg>
              <span>info@CowboyRanch.com</span>
            </div>
            <div className="mt-2 flex items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.6 6.6l2.2-2.2a1.73 1.73 0 011.87-.4 11.72 11.72 0 003.67.6 1.75 1.75 0 011.75 1.75V22.5a1.75 1.75 0 01-1.75 1.75C7.84 24.25.75 17.16.75 8.25A1.75 1.75 0 012.5 6.5h3.68a1.75 1.75 0 011.75 1.75c0 1.25.2 2.5.6 3.67a1.75 1.75 0 01-.4 1.87l-2.2 2.2z" />
              </svg>
              <span>(123) 456-7890</span>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right mt-4 md:mt-0">
            <ul className="list-none">
              <li className="inline-block mx-2">
                <a
                  href="https://facebook.com"
                  className="text-white hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.332v21.335C0 23.403.597 24 1.325 24h11.492v-9.294H9.847v-3.622h2.971V8.413c0-2.945 1.794-4.553 4.414-4.553 1.257 0 2.56.235 2.56.235v2.818H17.99c-1.58 0-2.073.982-2.073 1.987v2.379h3.528l-.565 3.622h-2.963V24h5.808C23.403 24 24 23.403 24 22.667V1.332C24 .598 23.403 0 22.675 0z" />
                  </svg>
                </a>
              </li>
              <li className="inline-block mx-2">
                <a
                  href="https://linkedin.com"
                  className="text-white hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="text-blue-500"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.18c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 11.18h-3v-5.5c0-1.38-.02-3.17-1.94-3.17-1.94 0-2.24 1.52-2.24 3.08v5.58h-3v-10h2.88v1.37h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.67v5.5z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 Cowboy Ranch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
