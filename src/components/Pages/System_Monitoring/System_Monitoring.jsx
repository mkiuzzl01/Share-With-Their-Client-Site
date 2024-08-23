import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const System_Monitoring = () => {
  const { loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);


  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data } = await axiosSecure.get(
        `/Transaction-History?search=${search}`
      );
      setHistory(data);
    };
    getData();
    setLoading(false);
  }, [search]);

  if (loading) return <Loading></Loading>;

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.Search.value;
    setSearch(value);
    form.reset();
  };
  console.log(history);
  return (
    <div>
      {history.length > 0 ? (
        <div>
          <h1 className="text-center font-semibold text-2xl">System Monitoring <sup className="text-orange-500">{history.length}</sup></h1>
          <form onSubmit={handleSearch}>
            <div className="flex items-center justify-center space-x-2 my-5">
              <input
                placeholder="Search Here..."
                name="Search"
                type="text"
                className="w-full input input-bordered"
              />
              <button type="submit" className="btn">
                Search
              </button>
            </div>
          </form>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-gray-300">
                <tr>
                  <th>SL</th>
                  <th>Type</th>
                  <th>By</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Fee</th>
                  <th>Time and Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={idx} className="bg-base-200">
                    <th>{idx + 1}</th>
                    <td>{h?.Type}</td>
                    <td>{h?.Sender || h?.Receiver}</td>
                    <td>{h?.Name}</td>
                    <td>{h?.Email}</td>
                    <td>{h?.Phone}</td>
                    <td>{h?.Received_Amount || h?.Sended_Amount}</td>
                    <td>{h?.Fee}</td>
                    <td>{h?.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default System_Monitoring;
