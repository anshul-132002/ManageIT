import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Popup({ id, setPopup, showPopup }) {
    const allUser = useSelector((state)=>state.app.user)
    const singleUser = allUser.filter((elem)=>elem.id === id)
    // console.log(singleUser)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p>
          <b>Name:</b> - {singleUser[0].name}
        </p>
        <p>
          <b>Email:</b> - {singleUser[0].email}
        </p>
        <p>
          <b>Age:</b> - {singleUser[0].age}
        </p>
        <p>
          <b>Gender:</b> - {singleUser[0].gender}
        </p>

        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={()=>setPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
