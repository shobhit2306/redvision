import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksCard from "./UserBooksCard";
import UserBooksCard from "./UserBooksCard";
import { UserDataObject } from "../services/Controller";
import { SelectDropdown } from "../ui/SelectDropdown";
import Searchbar from "../ui/Searchbar";

function UserDashboard() {
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [category, setCategory] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getAllBooks();
  }, [searchedValue, category]);
  const getAllBooks = () => {
    UserDataObject.BooksList({ token, searchedValue, category }, (result) => {
      if (result.status === 200 && result.data.status) {
        setArr(result.data.data.docs);
      }
    });
  };

  const categoryOptions = [
    { label: "Fantasy", value: "fantasy" },
    { label: "Romantic", value: "romantic" },
    { label: "Thriller", value: "thriller" },
    { label: "Horror", value: "horror" },
    { label: "Autobiography", value: "autobiography" },
    { label: "Scifi", value: "scifi" },
  ];

  return (
    <>
      <div className="w-full flex flex-col py-4">
        <div className="w-full flex justify-center items-center text-3xl mb-4">
          Available Books
        </div>
        <div className="flex md:flex-col md:items-center md:justify-center justify-end items-end gap-4 my-4 pr-5">
          <Searchbar
            searchedValue={searchedValue}
            setSearchedValue={setSearchedValue}
          />
          <div className="relative w-[15%] md:w-[60%]">
            <SelectDropdown
              name="category"
              placeholder="Category filter"
              className="pl-2 w-full"
              wrapClassName="border-2 border-solid border-gray bg-white flex !h-[20px] m-auto px-2.5 w-full"
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
        <div className="w-full h-[2px] bg-blue-100" />
        <div className="w-full flex justify-start items-center md:justify-center md:items-center flex-wrap gap-10 p-5">
          {arr.length > 0 ? (
            arr.map((book, index) => {
              return <UserBooksCard data={book} index={index} />;
            })
          ) : (
            <div className="text-black w-full text-center text-[36px] mt-8">
              No book in the store!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
