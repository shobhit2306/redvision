import React from "react";
import { useNavigate } from "react-router-dom";

function BooksCard({ data, index }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col gap-2 justify-start items-start md:items-center w-[250px] md:w-[90%] p-3 rounded-md shadow-md cursor-pointer"
      onClick={() => navigate("/admin/book_details", { state: data })}
      key={index}
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
    </div>
  );
}

export default BooksCard;
