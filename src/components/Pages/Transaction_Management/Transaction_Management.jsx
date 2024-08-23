import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Transaction_Management = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: Management = [], refetch } = useQuery({
    queryKey: ["Transaction-Management"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/Transaction-Management/${user?.Email}`
      );
      return res.data;
    },
  });
  const handleCashed = async (M) => {
    try {
      const { data } = await axiosSecure.patch("/requested-cash-out", M);
      if (data.message === "Cash Out Approve Successfully") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
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

  const handleRequested = async (M) => {
    try {
      const { data } = await axiosSecure.patch("/requested-cash-in", M);
      if (data.message === "Cash In Request Approve Successfully") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
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
      {
        Management.length > 0 ?
      <div>
      <h1 className="text-center text-2xl font-semibold my-5">
        Transaction Management
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-300">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cash Out Request</th>
              <th>Cash In Request</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {Management.map((M, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{M?.Name}</td>
                <td>{M?.Email}</td>
                <td>{M?.Phone}</td>
                <td>
                  {M?.Cash_Outed_Amount && (
                    <button
                      title="Please Approve Cashed Amount"
                      onClick={() => handleCashed(M)}
                      className="btn btn-sm btn-accent"
                    >
                      <span>Approve</span>
                      {M?.Cash_Outed_Amount}
                    </button>
                  )}
                </td>
                <td>
                  {M?.Requested_Amount && (
                    <button
                      title="Please Approve Requested Amount"
                      onClick={() => handleRequested(M)}
                      className="btn btn-sm btn-warning"
                    >
                      <span>Approve</span>
                      {M?.Requested_Amount}
                    </button>
                  )}
                </td>
                <td>{M?.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      :
      <div>
        <div className="flex justify-center space-y-3 items-center flex-col mt-10">
        <h1 className="text-5xl font-bold">Empty</h1>
        <p className="font-xl font-semibold">Any Transaction Not Found</p>
        </div>
      </div>
      }
    </div>
  );
};

export default Transaction_Management;
