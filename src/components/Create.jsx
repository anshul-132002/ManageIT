import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../Features/Userslice";
import { useNavigate } from "react-router-dom";

function Create() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(createUser(user));
    navigate("/read");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            onChange={getUserData}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={getUserData}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={getUserData}
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
              className="mr-2"
              onChange={getUserData}
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>

            <input
              type="radio"
              name="gender"
              value="Female"
              className="mr-2"
              onChange={getUserData}
            />
            <label htmlFor="female">Female</label>
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
    </div>
  );
}

export default Create;
