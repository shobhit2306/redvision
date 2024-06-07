import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

function UserBookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { dispatch } = useContext(CartContext);
  return (
    <div className="relative">
      <div className=" flex flex-col font-poppins items-center justify-end mx-auto w-[90%]">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="border-gray border shadow-lg my-4 flex flex-col gap-[15px] items-center justify-end pt-3 p-12 md:px-10 sm:px-5 w-full">
            <div className="flex flex-col items-start justify-start mt-4">
              <div className="sm:text-2xl md:text-[26px] text-[36px] mb-4 text-center text-white-A700">
                {data?.name}
              </div>
            </div>
            <div className="w-full flex md:flex-col md:justify-center md:items-center justify-start items-start gap-5">
              <img src="/images/book1.jpg" className="w-[30%] md:w-[90%]" />
              <div className="flex flex-col gap-8">
                <div>{data?.description}</div>
                <div className="font-semibold">{`By- ${data.author}`}</div>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={() => {
                      dispatch({ type: "addItem", payload: data });
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookDetails;
