import { Avatar } from "@mui/material";
import authStore from "../../stores/AuthStore";
import userServices from "../../services/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser, clearTokens } = authStore();
  const navigate = useNavigate();

  const handleDeleteUser = (id: string) => {
    userServices
      .deleteUser(id)
      .then((res) => {
        console.log(res.data);
        setUser(null);
        clearTokens();
        toast.warning("the user deleted");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("someting went wrong deleting user");
      });
  };
  return (
    <div className="min-h-screen w-full bg-secondary flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Avatar />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{`${user?.first_name} ${user?.last_name}`}</h1>
        <p className="text-center text-gray-600 mb-4">{user?.role}</p>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Phone: {user?.phone_number}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to={"/editprofile"}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </Link>
          <button
            onClick={() => handleDeleteUser(user!.id)}
            className="px-4 mx-4 py-2 hover:bg-error text-white rounded bg-light-error"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
