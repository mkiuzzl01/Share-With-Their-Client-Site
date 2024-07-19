import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const User_Management = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["user-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const { data } = await axiosSecure.patch("/user-Approve", { id });
      if (data.message === "User Approve Successfully") {
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

  const handleBlock = async (id) => {
    try {
      const { data } = await axiosSecure.patch("/user-block", {id});
      if (data.message === "User Blocked Successfully") {
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{user?.Name}</td>
                <td>{user?.Email}</td>
                <td>{user?.Phone}</td>
                <td>{user?.Role}</td>
                <td>{user?.Status}</td>
                <td className="space-x-2">
                  <button
                    disabled={user?.Status === "Approved"}
                    onClick={() => handleApprove(user?._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    disabled={user?.Status === "Blocked"}
                    onClick={() => handleBlock(user?._id)}
                    className="btn btn-sm btn-error"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User_Management;
