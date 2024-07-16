import PropTypes from "prop-types";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen }) => {

  const handleLogOut = async () => {
    
  };

  return (
    <div
      className={`z-40  flex flex-col justify-between overflow-x-hidden text-white bg-[#2F4F4F] w-64 md:w-1/4 space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && "-translate-x-full"
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div className="">
      <div className="flex justify-center"><Link to="/" className="">
            {/* <img src="" alt="" className=" w-24 lg:w-32" /> */}
            <h1>ShareWithTheir</h1>
          </Link></div>
        <div className="menu">
          <ul className="ul space-y-2">
           {/*todo link */}
          </ul>
        </div>
        <div className="divider divider-accent">OR</div>
        <div className="menu">
          <ul className="ul space-y-3">
            {/* todo manu */}
           <li>
           <button className="btn">
            <Link to='/Login'>Login</Link>
            </button>
           </li>
           <li>
           <button className="btn">
            <Link to='/Register'>Register</Link>
            </button>
           </li>
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
