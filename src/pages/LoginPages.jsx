import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Login } from "../API/auth";
import { PUBLIC_URL } from "../utils/constant";
export default function LoginPages() {
  const [credentials, setCredentials] = useState({
    number_card: "",
    password: "",
  });
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const { number_card, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const beforeSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Login(credentials, navigate, setLoading);
  };
  return (
    <>
      <section className="relative bg-gray-50 h-screen dark:bg-gray-900 transition-all overflow-hidden">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Transition
            show={isShow}
            enter="transition transform duration-500 delay-[200ms]"
            enterFrom="opacity-0 scale-125"
            enterTo="opacity-100 scale-100 "
            leave="transition transform duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            className="flex items-center gap-2 md:gap-4 mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <NavLink to={PUBLIC_URL} target="_blank">
              <div className="svg-container-login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="md:w-28 md:h-28 w-24 h-24 text-white/80 hover:text-amber-300 hover:transition-all transition-all hover:drop-shadow-xl dark:hover:drop-shadow-[0_0_2px_rgba(255,0,0,.2)] building-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  ></path>
                </svg>
              </div>
            </NavLink>
            <div className="flex flex-col cursor-default justify-center items-center">
              <span className="text-3xl">Pilih</span>
              <span className="text-3xl">Dhewe</span>
            </div>
          </Transition>

          <Transition
            show={isShow}
            enter="transition transform duration-300 delay-[400ms]"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100 "
            leave="transition transform duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            className="w-full my-3 relative bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to Your Account
              </h1>
              <form
                method="POST"
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => beforeSubmit(e)}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Number Card
                  </label>
                  <input
                    type="text"
                    name="number_card"
                    id="number_card"
                    placeholder="SMK••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={number_card}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center text-white transition-all hover:transition-all bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 group disabled:bg-primary-900 disabled:hover:bg-primary-900 disabled:cursor-not-allowed"
                >
                  <span className="me-3">
                    {isLoading ? "Checking" : "Log in"}
                  </span>
                  {isLoading ? (
                    <span className="loader-login transition-all"></span>
                  ) : (
                    <i className="bi bi-door-closed text-xl transition-all"></i>
                  )}
                </button>
              </form>
            </div>
          </Transition>

          <Transition
            show={isShow}
            enter="transition transform duration-300 delay-[700ms]"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-500"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            className="flex relative justify-center items-center gap-24 transition-all max-w-md w-full mt-4"
          ></Transition>
        </div>
      </section>
    </>
  );
}
