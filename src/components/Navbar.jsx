import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userData } from "../Features/Userslice";

const Navbar = () => {
  const allusers = useSelector((state) =>state.app.user)
  const dispatch = useDispatch()
  const [input ,setInput] = useState("")
  useEffect(()=>{
    dispatch(userData(input))
  },[input])
  return (
    <nav className="bg-gray-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/">
        <div className="text-lg font-bold">Redux Toolkit</div>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/">
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Create Post
            </button>
          </Link>

          <Link to="/read">
            <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              All Posts ({allusers.length})
            </button>
          </Link>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 text-black rounded-md focus:outline-none"
            onChange={(e)=> setInput(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden mt-4 flex justify-center space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          All Post ({allusers.length})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
