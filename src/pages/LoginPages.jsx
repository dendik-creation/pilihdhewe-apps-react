import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Login } from "../API/auth";
export default function LoginPages() {
  const [credentials, setCredentials] = useState({
    number_card: "",
    password: "",
  });
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isIcon, setIcon] = useState(null);
  const checkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    setShow(true);

    if (checkTheme.matches) {
      setIcon("./pilihdhewe-icons-white.svg");
    } else {
      setIcon("./pilihdhewe-icons-dark.svg");
    }
  }, []);

  const { number_card, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const beforeSubmit = (e) => {
    e.preventDefault();
    Login(credentials, setLoading, setSuccess);
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
            className="flex items-center flex-col justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="svg-container-login">
              <img src={isIcon} alt="" className="animate-icon" />
            </div>
            <div className="text-3xl">Pilih Dhewe</div>
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
                    Username {"( NIS )"}
                  </label>
                  <input
                    type="text"
                    required
                    name="number_card"
                    id="number_card"
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
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || (!isLoading && isSuccess)}
                  className={`w-full flex justify-center items-center text-white transition-all hover:transition-all focus:ring-4 focus:outline-none focus:ring-primary-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 group disabled:cursor-not-allowed ${
                    isSuccess && !isLoading
                      ? "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                      : isLoading && !isSuccess
                      ? "disabled:bg-primary-900 disabled:hover:bg-primary-900"
                      : "bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
                  }`}
                >
                  <span className="me-3">
                    {isLoading
                      ? "Checking"
                      : !isLoading && isSuccess
                      ? "Redirecting"
                      : "Log in"}
                  </span>
                  {isLoading && !isSuccess ? (
                    <span className="loader-login transition-all"></span>
                  ) : !isLoading && isSuccess ? (
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <i className="bi bi-door-closed text-xl transition-all"></i>
                  )}
                </button>
              </form>
            </div>
          </Transition>
        </div>
      </section>
    </>
  );
}
