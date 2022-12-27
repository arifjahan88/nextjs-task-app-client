import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Contexts/AuthProvider";

const Navber = () => {
  const [shadow, setShadow] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);
  return (
    <nav
      className={
        shadow
          ? " h-15 z-[100] ease-in-out duration-300 w-full bg-[#ecf0f3] shadow-xl"
          : " h-15 z-[100] w-full bg-[#ecf0f3]"
      }
    >
      <div className="justify-between lg:justify-between px-4 mx-auto lg:max-w-7xl lg:items-center lg:flex lg:px-8">
        <div>
          <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
            <p className="text-2xl font-bold text-gray-500">Arif Jahan</p>
            {/* <img className="w-40" src={navlogo} alt=""></img> */}

            <div className="lg:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              <li className="text-gray-500 font-semibold hover:text-indigo-500">
                <Link href="/">Home</Link>
              </li>
              {user?.uid && (
                <>
                  <li className="text-gray-500 font-semibold hover:text-indigo-500">
                    <Link href="/addtask">Add Task</Link>
                  </li>

                  <li className="text-gray-500 font-semibold hover:text-indigo-500">
                    <Link href="/mytask">My Task</Link>
                  </li>
                  <li className="text-gray-500 font-semibold hover:text-indigo-500">
                    <a href="">Completed Task</a>
                  </li>
                  <li className="text-gray-500 font-semibold hover:text-indigo-500">
                    <a className="hover:cursor-pointer" onClick={logout}>
                      Log Out
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
