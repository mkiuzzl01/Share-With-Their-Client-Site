import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendMoney = () => {
  const { user } = useAuth();
  const [showPass, setShowPass] = useState(false);
    const axiosSecure = useAxiosSecure();

  const handleSendMoney = async (e) => {
    e.preventDefault();
    const form = e.target;
    const receiver = form.receiver.value;
    const amount = form.amount.value;
    const pin = form.pin.value;
    const info = { user, receiver, amount, pin };

    try {
      const { data } = await axiosSecure.post("/send-money", info);
      console.log(data);
      if (data.message === "Transaction successful") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      {user?.Status === "Approved" ? (
        <div className="max-w-lg m-auto mt-20">
          <h1 className="text-2xl text-center font-semibold mb-10">
            Send Money
          </h1>
          <form
            onSubmit={handleSendMoney}
            className="space-y-4 border-2 p-10 rounded-lg bg-green-200 border-sky-300"
          >
            <div className="flex items-center">
              <label htmlFor="receiver" className="px-2">
                <span>Receiver</span>
              </label>
              <input
                required
                type="tel"
                id="receiver"
                name="receiver"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="amount" className="px-2">
                <span>Amount</span>
              </label>
              <input
                required
                type="number"
                id="amount"
                name="amount"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center">
              <span className="px-6">PIN</span>
              <label className="input w-full input-bordered flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="PIN"
                  className="w-full"
                  name="pin"
                  required
                />
                <div className="badge">
                  <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
            </div>
            <div className="flex justify-end">
              <input type="submit" value="Send" className="btn w-[239px] md:w-[357px]" />
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="font-bold text-4xl">
            Your Status{" "}
            <span
              className={
                user?.Status === "pending" ? "text-yellow-600" : "text-red-500"
              }
            >
              {user?.Status}
            </span>
          </p>
          <p className="text-3xl">Please wait for admin approval!</p>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
