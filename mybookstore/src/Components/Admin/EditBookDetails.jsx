import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { toast } from "react-hot-toast";
import { TextArea } from "../ui/TextArea";
import { SelectDropdown } from "../ui/SelectDropdown";
import { AdminDataObject } from "../services/Controller";

function EditBookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [title, setTitle] = useState(data.name);
  const [author, setAuthor] = useState(data.author);
  const [category, setCategory] = useState(data.categories);
  const [price, setPrice] = useState(data.price);
  const [description, setDescription] = useState(data.description);

  const categoryOptions = [
    { label: "Fantasy", value: "fantasy" },
    { label: "Romantic", value: "romantic" },
    { label: "Thriller", value: "thriller" },
    { label: "Horror", value: "horror" },
    { label: "Autobiography", value: "autobiography" },
    { label: "Scifi", value: "scifi" },
  ];

  const updateBookHandler = () => {
    const token = localStorage.getItem("token");
    if (!title || !author || !category || !price || !description) {
      toast.error("Please fill all the fields");
    }
    const body = {
      bookId: data._id,
      name: title,
      author: author,
      description: description,
      categories: category,
      price: Number(price),
    };
    AdminDataObject.UpdateBook({ token, body }, (result) => {
      if (result.status === 200 && result.data.status) {
        toast.success(result.data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(result.data.data?.[0].msg);
      }
    });
  };

  return (
    <div className="relative">
      <div className="bg-slate-100 my-4 flex flex-col font-poppins items-center justify-end mx-auto w-[90%]">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start mt-4">
            <div
              className="sm:text-2xl md:text-[26px] text-[28px] text-center text-white-A700"
              size="txtPoppinsBold28"
            >
              Update a Book!
            </div>
          </div>
          <div className="bg-white-A700 flex flex-col sm:items-center items-start justify-end sm:justify-end py-[27px] md:px-5 rounded-[5px] shadow-bs1 w-full md:w-full">
            <div className="w-full flex md:flex-col justify-center items-center gap-5">
              <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[40%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Book Title
                  </div>
                  <div className="relative w-full">
                    <Input
                      name="title"
                      placeholder="Enter title"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray bg-white flex h-11 m-auto px-2.5 w-full"
                      onChange={(e) => setTitle(e)}
                      value={title}
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[40%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Author Name
                  </div>
                  <div className="relative w-full">
                    <Input
                      name="author"
                      placeholder="Enter author name"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray bg-white flex h-11 m-auto px-2.5 w-full"
                      onChange={(e) => setAuthor(e)}
                      value={author}
                      shape="round"
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex md:flex-col md:px-5 justify-center items-center gap-5">
            <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[40%] md:w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div
                  className="text-base text-gray-800 w-auto"
                  size="txtPoppinsMedium16"
                >
                  Book Category
                </div>
                <div className="relative w-full">
                  <SelectDropdown
                    name="category"
                    placeholder="Select book category"
                    className="p-0 w-full"
                    wrapClassName="border-2 border-solid border-gray bg-white flex h-11 m-auto px-2.5 w-full"
                    options={categoryOptions}
                    onChange={(e) => setCategory(e?.value)}
                    value={
                      category
                        ? {
                            label: category,
                            value: category,
                          }
                        : null
                    }
                  ></SelectDropdown>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[40%] md:w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div
                  className="text-base text-gray-800 w-auto"
                  size="txtPoppinsMedium16"
                >
                  Book Price
                </div>
                <div className="relative w-full">
                  <Input
                    name="price"
                    placeholder="Enter book price"
                    className="p-0 w-full"
                    wrapClassName="border-2 border-solid border-gray bg-white flex h-11 m-auto px-2.5 w-full"
                    onChange={(e) => setPrice(e)}
                    value={price}
                  ></Input>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80%] md:w-full md:px-5 py-[27px] flex justify-center items-center">
            <div className="flex flex-col gap-2 items-center justify-start w-full">
              <div
                className="text-base text-gray-800 w-auto self-start"
                size="txtPoppinsMedium16"
              >
                Book Description
              </div>
              <div className="relative w-full">
                <TextArea
                  name="description"
                  placeholder="Enter the book description"
                  className="border-2 border-solid border-gray flex m-auto px-2.5 w-full"
                  onChange={(e) => setDescription(e)}
                  value={description}
                  shape="round"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-72 md:gap-24 my-10">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => updateBookHandler()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBookDetails;
