import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        <Header />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
