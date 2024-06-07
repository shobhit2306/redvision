import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex justify-between items-center px-5 py-2 shadow-sm">
      <div
        className="w-full flex justify-start items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/images/book_logo.png" className="h-[30px] w-[30px]" />
        <div className="font-poppins text-black font-semibold">
          My book store
        </div>
      </div>
      <div className=" w-full flex justify-end items-center gap-5">
        {/* <button
          className="w-max bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => navigate("/admin_login")}
        >
          Login as Admin
        </button> */}
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Header;
