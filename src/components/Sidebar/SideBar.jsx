import PropTypes from "prop-types";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../Share/Menu";
import useUserVerification from "../../hooks/useUserVerification";
import { FiMonitor, FiSend } from "react-icons/fi";
import {
  LuDatabase,
  LuHistory,
  LuList,
  LuMoveDown,
  LuMoveUp,
  LuProjector,
} from "react-icons/lu";

const SideBar = ({ isOpen }) => {
  const navigate = useNavigate();
  const Role = useUserVerification();

  const handleLogOut = () => {
    localStorage.removeItem("Token");
    navigate("/Login");
  };

  return (
    <div
      className={`z-40  flex flex-col justify-between overflow-x-hidden text-white bg-[#2F4F4F] w-64 md:w-1/4 space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && "-translate-x-full"
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div className="">
        <div className="flex justify-center">
          <Link to="/" className="">
            <img
              src="https://i.ibb.co/S7tR0vT/logo-3.png"
              alt=""
              className=" w-24 lg:w-32"
            />
          </Link>
        </div>
        <div className="menu">
          <ul className="ul space-y-2">
            {Role === "User" && (
              <>
                <li>
                  <Menu
                    name={"Send Money"}
                    path={"/SendMoney"}
                    icon={<FiSend />}
                  ></Menu>
                </li>
                <li>
                  <Menu
                    name={"Cash Out"}
                    path={"/CashOut"}
                    icon={<LuMoveUp />}
                  ></Menu>
                </li>
                <li>
                  <Menu
                    name={"Cash In"}
                    path={"/CashIn"}
                    icon={<LuMoveDown />}
                  ></Menu>
                </li>
              </>
            )}
            {Role === "Agent" && (
              <>
                <li>
                  <Menu
                    icon={<LuList />}
                    name={"Transaction Management"}
                    path={"/Transaction_Management"}
                  ></Menu>
                </li>
              </>
            )}
            {Role === "Admin" && (
              <>
                <li>
                  <Menu
                    icon={<LuDatabase />}
                    name={"User Management"}
                    path={"User_Management"}
                  ></Menu>
                </li>
                <li>
                  <Menu
                    icon={<FiMonitor />}
                    name={"System Monitoring"}
                    path={"System_Monitoring"}
                  ></Menu>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="divider divider-accent">OR</div>
        <div className="menu">
          <ul className="ul space-y-4">
            <li>
              <Menu name={"Overview"} path={"/"} icon={<LuProjector />}></Menu>
            </li>
            {Role !== "Admin" && (
              <li>
                <Menu
                  name={"Transactions"}
                  path={"/Transactions"}
                  icon={<LuHistory />}
                ></Menu>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <div className="menu">
          <ul>
            <li>
              <button onClick={handleLogOut} className="btn btn-sm">
                <BiLogOutCircle className="text-2xl text-red-600" /> LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default SideBar;
