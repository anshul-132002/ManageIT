import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateData } from "../Features/Userslice";
import { Bounce, ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

function UpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.app);
  const [updateUser, setUpdateUser] = useState(); // Initialize as null

  useEffect(() => {
    if (!loading && id) {
      const singleUser = user.find((elem) => elem.id === id);
      if (id) {
        setUpdateUser(singleUser);
      }
    }
  }, [id, loading, user]);

  const newData = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateData(updateUser));

    toast.success("User updated successfully!");

    setTimeout(() => {
      navigate("/read");
    }, 1500);
  };

  if (!updateUser) {
    return <div>Loading...</div>; // Show a loading message while user data is being fetched
  }

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="font-black text-lg md:text-xl mb-8 px-8 underline flex justify-center items-center">
          Update the User
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={updateUser.name}
            onChange={newData}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={updateUser.email}
            placeholder="Enter your email"
            onChange={newData}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={updateUser.age}
            onChange={newData}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={updateUser.gender === "Male"}
              className="mr-2"
              onChange={newData}
            />
            <label className="mr-4">Male</label>

            <input
              type="radio"
              name="gender"
              value="Female"
              className="mr-2"
              checked={updateUser.gender === "Female"}
              onChange={newData}
            />
            <label>Female</label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>

      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
    </div>
  );
}

export default UpdateUser;
