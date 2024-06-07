import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";

function UserLayout() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        <AuthHeader />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
