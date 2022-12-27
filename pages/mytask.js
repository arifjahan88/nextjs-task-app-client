import React, { useContext } from "react";
import { AuthContext } from "./Component/Contexts/AuthProvider";
import Navber from "./Component/Navber";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const mytask = () => {
  const { user } = useContext(AuthContext);

  const { data: taskdata = [], refetch } = useQuery({
    queryKey: ["taskdata", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/addtaskall?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handledelete = (data) => {
    fetch(`http://localhost:5000/taskdelete/${data._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((taskdata) => {
        if (taskdata.deletedCount > 0) {
          toast.success(`${data.name} Deleted SuccessFully`);
          refetch();
        }
      });
  };

  const handleupdate = () => {
    toast.success("successfully add in");
    console.log("fast");
  };
  return (
    <div>
      <Navber></Navber>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
        {taskdata.map((data) => (
          <div className="flex justify-center items-center border-2 p-5 bg-slate-300 rounded-lg mx-5">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center m-5">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={data.image}
                  alt="image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {data.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.email}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.Task}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <a
                    onClick={handleupdate}
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </a>
                  <a
                    onClick={() => handledelete(data)}
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    Delete
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    Task Completed
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default mytask;
