import React from "react";
import { Input } from "./Input";
import { HiXMark } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";

const Searchbar = ({ searchedValue, setSearchedValue }) => {
  return (
    <>
      <div className="relative border-gray border-2 rounded-md h-[42px]  px-3">
        <Input
          color="gray_50_01"
          // size="md"
          name="search"
          placeholder={"search"}
          value={searchedValue}
          onChange={(e) => setSearchedValue(e)}
          className="text-black-900_91 flex h-[38px] w-full  items-center justify-between gap-[3px]!px-3"
        />
        <div className="absolute right-2 top-2">
          {searchedValue?.length > 0 ? (
            <HiXMark
              className="cursor-pointer text-2xl"
              onClick={() => setSearchedValue("")}
            />
          ) : (
            <IoSearch className="text-xl" />
          )}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
