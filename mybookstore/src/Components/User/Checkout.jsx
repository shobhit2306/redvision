import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { UserDataObject } from "../services/Controller";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useContext(CartContext);
  let totalAmount = cartItems.reduce((acc, obj) => acc + obj.price, 0);
  const bookArray = cartItems.map((item) => item._id);

  const checkoutHandler = () => {
    const token = localStorage.getItem("token");
    const body = {
      items: bookArray,
      total: totalAmount,
    };
    UserDataObject.Checkout({ token, body }, (result) => {
      if (result.status === 200 && result.data.status) {
        toast.success(result.data.message);
        dispatch({ type: "clearCart" });
        navigate("/user/dashboard");
      } else {
        toast.error(result.data.data?.[0].msg);
      }
    });
  };

  return (
    <>
      <div className="w-full mt-10 mb-4 bg-slate-100">
        <div className="w-full  p-4 px-24  flex justify-between items-center">
          <div className="text-[24px] fond-bold">Books</div>
          <div className="text-[24px] fond-bold">Amount</div>
        </div>
        {cartItems.map((item, index) => {
          return (
            <div className="w-full flex justify-start items-center p-4 px-24 gap-5">
              <img src="/images/book1.jpg" className="w-[100px] h-[100px]" />
              <div className="w-full flex flex-col justify-start items-start">
                <div className="text-black text-2xl">{item.name}</div>
                <div className="text-gray-600 text-lg">{`By:-${item.author}`}</div>
                <div className="text-gray-600 text-md">{item.categories}</div>
              </div>
              <div>{`$${item.price}`}</div>
            </div>
          );
        })}
        <div className="w-full flex justify-between items-center p-4 px-24 ">
          <div className="text-[24px] fond-bold">Total Amount</div>
          <div className="text-[24px] fond-bold">{`$${totalAmount}`}</div>
        </div>
      </div>
      <div className="w-full flex justify-end px-24">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => checkoutHandler()}
        >
          Checkout
        </button>
      </div>
    </>
  );
}

export default Checkout;
