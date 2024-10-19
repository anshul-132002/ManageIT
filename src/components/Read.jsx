import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, ShowUser, userData } from "../Features/Userslice";
import Loading from "./Loading";
import Popup from "./Popup";
import { Link } from "react-router-dom";

function Read() {
  const [id, setId] = useState();
  const [showPopup, setPopup] = useState(false);
  const [radio, setRadio] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error, searchData } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(ShowUser());
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const popUp = (id) => {
    setId(id);
    setPopup(true);
  };
  return (
    <div className="container mx-auto py-8">
      {showPopup && (
        <Popup id={id} showPopup={showPopup} setPopup={setPopup}></Popup>
      )}
      <h1 className="text-2xl font-bold text-center mb-8">User List</h1>
      <label className="mr-4">
        All
        <input
          type="radio"
          name="gender"
          value="All"
          checked={radio === ""}
          onChange={() => setRadio("")}
          className="ml-2"
        />
      </label>

      <label className="mr-4">
        Male
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={radio === "Male"}
          onChange={(e) => setRadio(e.target.value)}
          className="ml-2"
        />
      </label>

      <label>
        Female
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={radio === "Female"}
          onChange={(e) => setRadio(e.target.value)}
          className="ml-2"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user
          ?.filter((elm) => {
            if (searchData.length === 0) {
              return elm;
            } else {
              return elm.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
          .filter((ele) => {
            if (radio === "Male") {
              return ele.gender === radio;
            } else if (radio === "Female") {
              return ele.gender === radio;
            } else return ele;
          })
          .map((userData) => (
            <div
              key={userData.id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {userData.name}
              </h2>
              <p className="text-gray-600 mb-1">
                {" "}
                <b>Email:</b> {userData.email}
              </p>
              <p className="text-gray-600 mb-1">
                <b>Age:</b> {userData.age}
              </p>
              <p className="text-gray-600">
                <b>Gender:</b> {userData.gender}
              </p>

              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => popUp(userData.id)}
              >
                View
              </button>
              <Link to={`/edit/${userData.id}`}>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Update
                </button>
              </Link>

              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => dispatch(deleteUser(userData.id))}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Read;
