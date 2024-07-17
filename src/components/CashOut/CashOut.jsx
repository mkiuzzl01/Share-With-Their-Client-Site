import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CashOut = () => {
  const [showPass, setShowPass] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const handleCashOut = async (e) => {
    e.preventDefault();
    const form = e.target;
    const agent = form.receiver.value;
    const amount = form.amount.value;
    const pin = form.pin.value;
    const info = { user, agent, amount, pin };
    console.log(info);

    try {
      const { data } = await axiosPublic.post("/cash-out", info);
      if (data.message === "Cash out request successful") {
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
    <div className="max-w-lg m-auto mt-20">
      <h1 className="text-2xl text-center font-semibold mb-10">Cash Out</h1>
      <form
        onSubmit={handleCashOut}
        className="space-y-4 border-2 p-10 rounded-lg"
      >
        <div className="flex items-center">
          <label htmlFor="receiver" className="px-4">
            <span>Agent</span>
          </label>
          <input
            required
            type="tel"
            id="receiver"
            name="receiver"
            placeholder="Agent Number"
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
            placeholder="Amount"
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
        <div className="flex justify-center items-center">
          <input type="submit" value="Send" className="btn w-48" />
        </div>
      </form>
    </div>
  );
};

export default CashOut;
