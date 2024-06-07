import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

function UserBooksCard({ data, index }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  return (
    <div
      className="flex flex-col gap-2 justify-start items-start md:items-center w-[250px] md:w-[90%] p-3 rounded-md shadow-md cursor-pointer"
      onClick={() => navigate("/user/book_details", { state: data })}
    >
      <img
        src="/images/book1.jpg"
        className="w-[230px] md:w-full md:h-full h-[230px] object-cover"
      />
      <div className="flex w-full justify-center items-center font-semibold">
        {data.name}
      </div>
      <div className="flex gap-1">
        <span className="text-md">Author:</span>
        <span className="text-gray-500 text-md">{data.author}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-md">Category:</span>
        <span className="text-gray-500 text-md">{data.categories}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-md">Price:</span>
        <span className="text-gray-500 text-md">{`$${data.price}`}</span>
      </div>
      {/* <div className="w-full mt-2 flex justify-center items-center z-1000">
        <button
          className="bg-transparent text-[14px] hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            dispatch({ type: "addItem", payload: data });
          }}
        >
          Buy now
        </button>
      </div> */}
    </div>
  );
}

export default UserBooksCard;
