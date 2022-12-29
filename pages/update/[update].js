import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Component/Contexts/AuthProvider";
import Navber from "../Component/Navber";

const update = () => {
  const router = useRouter();
  const _id = router.query.update;
  const { user } = useContext(AuthContext);
  const photohostkey = "ffddeb2edca954e6ab34fa5f9dcd74ad";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: updatedata = [], isLoading } = useQuery({
    queryKey: ["updatedata", _id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/updatetask/${_id}`);
      const data = await res.json();
      return data;
    },
  });

  const handlaupdatetask = (data) => {
    const taskdata = data.task;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${photohostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        console.log(imgdata);
        if (imgdata.success) {
          const updatedtaskdata = {
            Task: taskdata,
            image: imgdata.data.url,
            name: user.displayName,
            email: user.email,
          };
          fetch(`http://localhost:5000/updatetask/${_id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedtaskdata),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                console.log(data);
                alert("Your review is Updated");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Navber></Navber>
      <form
        onSubmit={handleSubmit(handlaupdatetask)}
        className="lg:w-1/2 mx-auto"
      >
        <div className="mt-4">
          <div>
            <label
              className="text-black dark:text-gray-200 text-3xl font-mono"
              htmlFor="passwordConfirmation"
            >
              Please Update Your Task {updatedata.name}
            </label>
            <textarea
              id="task"
              defaultValue={updatedata.Task}
              type="textarea"
              {...register("task", { required: "Task is required" })}
              placeholder="Add your task here . . ."
              rows="8"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="block text-black text-2xl mt-5">Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-black"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="text-center">Upload your photo </span>
                    <input
                      type="file"
                      className=""
                      {...register("image", { required: "Image is required" })}
                      placeholder="Image"
                    />
                  </label>
                </div>
                <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            Add to Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default update;
