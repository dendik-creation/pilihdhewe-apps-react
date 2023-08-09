import { LinkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Login } from "../API/auth";
export default function LoginPages() {
  const [credentials, setCredentials] = useState({
    number_card: "",
    password: "",
  });
  const [isShow, setShow] = useState(false);

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
    Login(credentials, navigate);
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      ></link>
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
            className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <NavLink to={"/login"}>
              <LinkIcon className="w-20 h-20 mb-3 fa-bounce hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] hover:transition-all transition-all" />
            </NavLink>
            <div className="text-3xl">Link Vote</div>
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
                  className="w-full flex justify-center items-center text-white transition-all hover:transition-all bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 group"
                >
                  <span className="me-3">Log in</span>
                  <i className="bi bi-door-closed text-xl"></i>
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
          >
            <NavLink
              to={"https://laravel.com"}
              target="_blank"
              className="z-20"
            >
              <i className="fa-brands fa-laravel text-5xl text-red-400 hover:drop-shadow-xl dark:hover:drop-shadow-[0_0_2px_rgba(255,255,255,.6)] hover:transition-all transition-all"></i>
            </NavLink>
            <NavLink to={"https://react.dev"} target="_blank" className="z-20">
              <i className="fa-brands fa-react text-5xl text-blue-400 hover:drop-shadow-xl dark:hover:drop-shadow-[0_0_2px_rgba(255,255,255,.6)] hover:transition-all transition-all"></i>
            </NavLink>
          </Transition>
        </div>
      </section>
    </>
  );
}
