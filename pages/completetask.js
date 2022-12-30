import React, { useContext } from "react";
import { AuthContext } from "./Component/Contexts/AuthProvider";
import Navber from "./Component/Navber";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Loading from "./Component/Loading/Loading";

const completetask = () => {
  const { user } = useContext(AuthContext);

  const {
    data: completeddata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["completeddata", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://task-app-server-kappa.vercel.app/taskcompleted?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  //   Not Completed Task.
  const handletasknotcompleted = (data) => {
    const notcompleteddata = {
      Task: data.Task,
      image: data.image,
      name: data.name,
      email: data.email,
    };
    fetch("https://task-app-server-kappa.vercel.app/addtask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(notcompleteddata),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        fetch(
          `https://task-app-server-kappa.vercel.app/taskcompleted/${data._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((taskdata) => {
            if (taskdata.deletedCount > 0) {
              toast.error(
                `${data.name} Task Not Completed. Please Go my Task.`
              );
              refetch();
            }
          });
      });
  };

  //  Delete Task.
  const handledelete = (data) => {
    fetch(
      `https://task-app-server-kappa.vercel.app/taskcompleted/${data._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((taskdata) => {
        if (taskdata.deletedCount > 0) {
          toast.success(`${data.name} Task Deleted SuccessFully`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Navber></Navber>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
        {completeddata.map((data) => (
          <div
            key={data._id}
            className="py-6 flex flex-col justify-center sm:py-12"
          >
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white hover:scale-110 ease-in duration-150 shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div className="flex flex-col items-center m-5">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={data.image}
                      alt="image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">
                      {data.name}
                    </h5>
                    <span className="text-sm text-gray-500">{data.email}</span>
                    <div>
                      <h2 className="text-sm font-medium text-center text-black">
                        Your task
                      </h2>
                      <div className="mt-3 bg-slate-200 p-2 rounded-xl text-justify">
                        <span className="text-sm dark:text-gray-900 text-gray-600">
                          {data.Task}
                        </span>
                      </div>
                    </div>

                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <Link
                        href=""
                        onClick={() => handledelete(data)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      >
                        Delete
                      </Link>
                      <Link
                        href=""
                        onClick={() => handletasknotcompleted(data)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      >
                        Task Not Completed
                      </Link>
                    </div>
                  </div>
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

export default completetask;
