import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const Transactions = () => {
    const {user} = useAuth();    
  const axiosPublic = useAxiosPublic();

  
  const { data:History = [] } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Transaction/${user?.Email}`);
      return res.data;
    },
  });
  console.log(History);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Sender Name</th>
              <th>Sender Email</th>
              <th>Sender Phone</th>
              <th>Sended Amount</th>
              <th>Sended Fee</th>
              <th>Sended Time</th>
            </tr>
          </thead>
          <tbody>
            {
            History.map((h,idx)=><tr key={idx} className="bg-base-200">
            <th>{idx+1}</th>
            <td>{h.Receiver?.Name}</td>
            <td>{h.Receiver?.Email}</td>
            <td>{h.Receiver?.Phone}</td>
            <td>{h.Receiver?.Received_Amount}</td>
            <td>{h.Sender?.Fee}</td>
            <td>{h.Receiver?.time}</td>
          </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
