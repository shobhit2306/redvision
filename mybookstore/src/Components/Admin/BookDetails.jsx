import React from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AdminDataObject } from "../services/Controller";

function BookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const deleteBookHandler = (bookId) => {
    Swal.fire({
      title: "Are you sure, you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        AdminDataObject.Deleteook({ token, bookId }, (result) => {
          if (result.status === 200 && result.data.status) {
            toast.success(result.data.message);
            navigate("/admin/dashboard");
          } else {
            toast.error(result.data.data?.[0].msg);
          }
        });
      }
    });
  };
  return (
    <div className="relative">
      <div className=" flex flex-col font-poppins items-center justify-end mx-auto w-[90%]">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="border-gray border shadow-lg my-4 flex flex-col gap-[15px] items-center justify-end pt-3 p-12 md:px-10 sm:px-5 w-full">
            <div className="w-full flex justify-end items-center gap-5">
              <MdModeEdit
                className="text-[18px] cursor-pointer text-blue-600"
                onClick={() =>
                  navigate("/admin/edit_book_details", { state: data })
                }
              />
              <MdDelete
                className="text-[18px] cursor-pointer text-red-600"
                onClick={() => deleteBookHandler(data?._id)}
              />
            </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
