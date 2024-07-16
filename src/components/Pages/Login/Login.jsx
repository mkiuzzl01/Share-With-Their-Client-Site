import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailOrPhone = form.emailOrPhone.value;
    const password = form.password.value;

    console.log(emailOrPhone, password);
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
                Password
              </span>
              <label className="input w-full input-bordered flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="grow"
                  name="password"
                  required
                />
                <div className="badge">
                  <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
              {/* <p className="text-red-600">{error}</p> */}
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
