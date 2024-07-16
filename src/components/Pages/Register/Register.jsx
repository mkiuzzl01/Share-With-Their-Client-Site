import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [error,setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        setError('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.Mobile_Number.value;
        const pin = form.pin.value;
        const status = 'pending';
        const balance = 0;
        const userInfo = {name,email,phone,pin,status,balance};

        //pin validation
        const pinRegex = /^\d{5}$/;
        if (!pinRegex.test(pin)) {
            setError("PIN must be a 5-digit number");
          return;
        }     

        //sent to database
        try {
            const {data} = await axiosPublic.post('/register',userInfo);
            if(data?.message){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: data?.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
                };
        form.reset();
        navigate('/Login');
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "warning",
                title: error?.message,
                showConfirmButton: false,
                timer: 1500
              });
            // console.log(error);
        }
    }


  return (
    <div className="my-4">
      <div className="flex items-center w-full  mx-auto overflow-hidden rounded-lg lg:max-w-6xl p-10 bg-gray-600">
        <div className="hidden bg-cover lg:block lg:w-2/6">
          <img
            src="https://i.postimg.cc/wM4LPS2d/istockphoto-1408025598-612x612.png"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center text-white">Registration</p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-400"></span>

            <span className="text-sm text-center text-gray-100 uppercase dark:text-gray-400 hover:underline">
              Mention Proper information
            </span>

            <span className="w-1/6 border-b dark:border-gray-400"></span>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">
                  Mobile Number
                </span>
              </label>
              <input
                type="tel"
                placeholder="Mobile Number"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="Mobile_Number"
              />
            </div>
            <div className="form-control">
              <span className="my-2 block mb-2 text-sm font-medium text-white">
                Password
              </span>
              <label className="input w-full input-bordered flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Pin"
                  className="grow"
                  name="pin"
                  required
                />
                <div className="badge">
                  <span onClick={() => setShowPass(!showPass)}>
                  {showPass ? <LuEyeOff/> : <FiEye />}
                  </span>
                </div>
              </label>
              <p className="text-red-400">{error}</p>
            </div>
            <div className="mt-6">
              <input
                className="w-full btn border-none bg-gray-500 text-white hover:bg-blue-400"
                type="submit"
                value="Registration"
              />
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link to="/Login" className="text-green-300">
                  Login
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

export default Register;
