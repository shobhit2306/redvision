import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../Context/CartContext";

function AuthHeader() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { cartItems } = useContext(CartContext);
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className=" w-full flex justify-between items-center px-5 py-2 shadow-sm">
      <div
        className="w-full flex justify-start items-center gap-2 cursor-pointer"
        onClick={() => {
          role === "user"
            ? navigate("/user/dashboard")
            : role === "admin"
            ? navigate("/admin/dashboard")
            : null;
        }}
      >
        <img src="/images/book_logo.png" className="h-[30px] w-[30px]" />
        <div className="font-poppins text-black font-semibold">
          My book store
        </div>
      </div>
      <div className=" w-full flex justify-end items-center gap-8">
        {role === "user" && (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/user/checkout")}
          >
            <TiShoppingCart className="text-[28px] cursor-pointer" />
            {cartItems?.length > 0 && (
              <div className="absolute right-0 top-0 flex justify-center items-center w-4 h-4 rounded-full bg-red-600 text-white">
                {cartItems?.length}
              </div>
            )}
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default AuthHeader;
