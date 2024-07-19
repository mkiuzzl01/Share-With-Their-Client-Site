import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const System_Monitoring = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data = [] } = useQuery({
    queryKey: ["Transaction-History"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Transaction-History");
      return res.data;
    },
  });
  console.log(data);
  return (
    <div>
      <h1>This is System_Monitoring</h1>
    </div>
  );
};

export default System_Monitoring;
