import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const {setUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const emailOrPhone = form.emailOrPhone.value;
    const pin = form.pin.value;
    const info = { emailOrPhone, pin };

    //verify the pin
    const pinRegex = /^\d{5}$/;
    if (!pinRegex.test(pin)) {
      setError("PIN must be a 5-digit number");
      return;
    }

    //query for login in database
    try {
      const { data } = await axiosPublic.post("login", info);
      if(data?.user){
        setUser(data?.user);
      };
      if (data.token) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.setItem("Token", data.token);
      }
      form.reset();
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(error?.response?.data?.message);
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center w-full  mx-auto overflow-hidden rounded-lg lg:max-w-6xl p-10 bg-gray-600">
        <div className="hidden bg-cover lg:block lg:w-2/6">
          <img src="https://i.postimg.cc/GhwPnQ3G/login.png" alt="" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center text-white">
            Login
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-400"></span>

            <span className="text-sm text-center text-gray-100 uppercase dark:text-gray-400 hover:underline">
              Mention Proper information
            </span>

            <span className="w-1/6 border-b dark:border-gray-400"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">
                  Email OR Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Email OR Number"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="emailOrPhone"
                required
              />
            </div>

            <div className="form-control">
              <span className="my-2 block mb-2 text-sm font-medium text-white">
                PIN
              </span>
              <label className="input w-full input-bordered flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="PIN"
                  className="grow"
                  name="pin"
                  required
                />
                <div className="badge">
                  <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
              <p className="text-red-400">{error}</p>
            </div>
            <div className="mt-6">
              <input
                className="w-full btn border-none bg-gray-500 text-white hover:bg-blue-400"
                type="submit"
                value="Login"
              />
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2">
              <p className="text-sm text-white">
                Don't have an account?
                <Link to="/Register" className="text-green-300">
                  Create One
                </Link>
              </p>
            </div>
            <span className="w-1/6 border-b dark:border-gray-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
