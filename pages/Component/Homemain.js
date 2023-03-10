import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./Contexts/AuthProvider";

const Homemain = () => {
  const { googlelogin } = useContext(AuthContext);
  const handlegooglelogin = () => {
    googlelogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="lg:text-6xl md:text-5xl text-2xl px-10 text-center font-extralight my-10 text-blue-500">
        Organize your Daily Task, work and projects with Task Management tools
      </h2>
      <h3 className="text-center lg:text-2xl sm:text-xl lg:w-1/2 mx-auto pt-5 text-gray-500 my-10">
        Task Management app lets you put all your plans and projects in one
        place so you can work productively without the chaos and confusion.
      </h3>
      <h2 className="mt-5 mb-2 text-orange-600 text-3xl font-semibold font-mono text-center">
        Get Started
      </h2>
      <div className="lg:w-1/4 mx-auto p-8 flex justify-center bg-blue-200 rounded-xl">
        <div className="text-center">
          <button
            onClick={handlegooglelogin}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
          >
            Continue with Google
          </button>
          <br />
          <h2 className="my-3 font-serif">OR</h2>
          <Link href="/signup" className="w-full">
            <button className="btn bg-indigo-500" type="button">
              Continue With Email
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Homemain;
