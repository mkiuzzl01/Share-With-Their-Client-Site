import { Outlet } from "react-router-dom";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { GiSplitCross } from "react-icons/gi";
import SideBar from "../components/Sidebar/SideBar";

const Dashboard = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="m-auto">
      <div className="relative min-h-screen md:flex">
        {/* This is NavLink part  */}
        <SideBar isOpen={isOpen} toggleMenu={toggleMenu}></SideBar>
        {/* this is content part */}
        <div className="flex-1 md:ml-64 lg:m-5">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="md:hidden px-4 py-3">
              {isOpen ? (
                <IoMenu className="text-orange-600 text-2xl" />
              ) : (
                <GiSplitCross className="text-orange-600 text-2xl" />
              )}
            </button>
          </div>
          <main className="px-2">
          <Outlet></Outlet>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
