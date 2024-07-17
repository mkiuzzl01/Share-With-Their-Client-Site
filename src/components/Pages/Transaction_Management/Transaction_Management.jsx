import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Transaction_Management = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: Management = [], refetch } = useQuery({
    queryKey: ["Transaction-Management"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/Transaction-Management/${user?.Email}`
      );
      return res.data;
    },
  });
  const handleCashed = async (M) => {
    try {
      const { data } = await axiosPublic.patch("/requested-cash-out", M);
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
      const { data } = await axiosPublic.patch("/requested-cash-in", M);
      if (data.message === "Cash In Request Approve Successful") {
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
      <h1 className="text-center text-2xl font-semibold my-5">
        Transaction Management
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cash Outed Amount</th>
              <th>Requested Amount</th>
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
                      className="btn"
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
                      className="btn"
                    >
                      <span>Approve</span>
                      {M?.Requested_Amount}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction_Management;
