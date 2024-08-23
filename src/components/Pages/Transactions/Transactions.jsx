import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Transactions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: History = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Transaction/${user?.Email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      {History.length > 0 ? (
        <div className="overflow-x-auto">
          <h1 className="text-center font-semibold text-2xl">Your All Transaction</h1>
          <table className="table">
            {/* head */}
            <thead className="bg-gray-300">
              <tr>
                <th>SL</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Time and Date</th>
              </tr>
            </thead>
            <tbody>
              {History.map((h, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{h?.Type}</td>
                  <td>{h?.Email}</td>
                  <td>{h?.Phone}</td>
                  <td>{h?.Name}</td>
                  <td>{h?.Received_Amount || h?.Sended_Amount}</td>
                  <td>{h?.Fee}</td>
                  <td>{h?.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10 space-y-4">
          <h1 className="text-5xl font-bold">Empty</h1>
          <p className="text-2xl">Your Transaction not found</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
