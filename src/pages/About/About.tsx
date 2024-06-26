export default function About() {
  return (
    <div className="flex w-full bg-baout_bg flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          About Us
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to our website! We are committed to providing you with the
          best service possible. Our team is dedicated to ensuring your
          satisfaction and we are always here to help.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Our mission is to deliver high-quality products and services that meet
          your needs. We value our customers and strive to exceed your
          expectations with every interaction.
        </p>
        <p className="text-gray-700 text-lg">
          Thank you for choosing us. We look forward to serving you!
        </p>
      </div>
    </div>
  );
}
