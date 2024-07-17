import React from "react";
import useAuth from "../../hooks/useAuth";

const Overview = () => {
  const { user } = useAuth();
  return (
    <section className="bg-white">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          <span>{user?.Role}</span> Profile
        </h1>
        <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
          <div className="absolute w-full bg-blue-600 -z-10 md:h-80 rounded-2xl"></div>

          <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
            <img
              className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[24rem] md:w-80 md:rounded-2xl"
              src="https://i.ibb.co/x19M7TG/blank-profile-picture-973460-1280.png"
              alt={user?.Name}
            />

            <div className="mt-2 md:mx-6">
              <div>
                <h1 className="text-xl font-medium tracking-tight text-white">
                  Name: <span>{user?.Name}</span>
                </h1>
                <p className="text-blue-200">
                  Email: <span>{user?.Email}</span>
                </p>
                <p className="leading-relaxed text-blue-200">
                  Phone: <span>{user?.Phone}</span>
                </p>
              </div>
              <h4 className="text-xl font-semibold text-yellow-200">
                Current Balance:{" "}
                <span className="text-white">{user?.Balance}</span>
              </h4>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Overview;
