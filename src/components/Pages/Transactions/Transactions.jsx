import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const Transactions = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: History = [] } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Transaction/${user?.Email}`);
      return res.data;
    },
  });
  console.log(History);
  return (
    <div>
      {History.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Sender Name</th>
                <th>Sender Email</th>
                <th>Sender Phone</th>
                <th>Receiver Name</th>
                <th>Receiver Email</th>
                <th>Receiver Phone</th>
                <th>Sended Amount</th>
                <th>Sended Fee</th>
                <th>Sended Time</th>
              </tr>
            </thead>
            <tbody>
              {History.map((h, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{h.Sender?.Name}</td>
                  <td>{h.Sender?.Email}</td>
                  <td>{h.Sender?.Phone}</td>
                  <td>{h.Receiver?.Name}</td>
                  <td>{h.Receiver?.Email}</td>
                  <td>{h.Receiver?.Phone}</td>
                  <td>{h.Sender?.Sended_Amount}</td>
                  <td>{h.Sender?.Fee}</td>
                  <td>{h.Sender?.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-col justify-center items-center mt-10 space-y-4">
        <h1 className="text-5xl font-bold">Empty</h1>
        <p className="text-2xl">Your Transaction not found</p>
      </div>
    </div>
  );
};

export default Transactions;
