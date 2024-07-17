import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const Transaction_Management = () => {
  const { user } = useAuth();
  // console.log(user);

  const axiosPublic = useAxiosPublic();

  const { data: Management = [] } = useQuery({
    queryKey: ["Transaction-Management"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/Transaction-Management/${user?.Email}`
      );
      return res.data;
    },
  });
  console.log(Management);
  return (
    <div>
      <h1>This is Transaction Management page</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
            {
            Management.map((M,idx)=><tr key={idx}>
            <th>{idx+1}</th>
            <td>{M?.Name}</td>
            <td>{M?.Email}</td>
            <td>{M?.Phone}</td>
            <td>{M?.Cash_Outed_Amount}</td>
            <td>{M?.Requested_Amount}</td>
          </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction_Management;
