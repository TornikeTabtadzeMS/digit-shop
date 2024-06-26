import { FieldValues, useForm } from "react-hook-form";
import userServices from "../../services/User";
import authStore from "../../stores/AuthStore";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";

export default function Edit() {
  const { user, setUser } = authStore();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      phoneNumber: user?.phone_number,
    },
    mode: "onTouched",
  });

  const submitChanges = (data: FieldValues) => {
    userServices
      .updateUser({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
      })
      .then((res) => {
        setUser(res.data);
        toast.info("the user has successfully edited");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex justify-around w-screen items-center h-screen">
      <div className="flex justify-cemter items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(submitChanges)}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Information</h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", {})}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", {})}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register("phoneNumber", {})}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Avatar />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{`${user?.first_name} ${user?.last_name}`}</h1>
        <div className="p-6">
          <p className="text-center text-gray-600 mb-4">{user?.role}</p>
          <p className="text-gray-600 mb-4">First Name: {user?.first_name}</p>
          <p className="text-gray-600 mb-4">Last Name: {user?.last_name}</p>
        </div>
        <div className="space-y-4">
          <div className="p-6">
            <h2 className="p-6 text-lg font-semibold">Contact Information</h2>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Phone: {user?.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
