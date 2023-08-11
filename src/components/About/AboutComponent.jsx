import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";
export default function AboutComponent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 250);
  });
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      ></link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-0">
        <div className="flex justify-center items-center flex-col gap-4 mb-8 md:mb-0">
          <Transition
            show={show}
            enter="transition transform duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className="svg-container"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="md:w-64 md:h-64 w-32 h-32 text-gray-800 hover:text-emerald-400 hover:transition-all transition-all hover:drop-shadow-xl dark:hover:drop-shadow-[0_0_2px_rgba(255,0,0,.2)] building-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              ></path>
            </svg>
          </Transition>
        </div>
        <div className="flex flex-col gap-12">
          <Transition
            show={show}
            enter="transition transform duration-300 delay-[200ms]"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className="flex flex-col gap-5"
          >
            <h2 className="uppercase text-lg font-semibold transition-all border-b-2 w-fit">
              General Information
            </h2>
            <p className="first-letter:ms-5">
              Proyek Aplikasi Voting adalah upaya kami untuk mengembangkan
              solusi modern untuk melakukan pemungutan suara. Dengan
              memanfaatkan kekuatan framework Laravel dan React JS, bersama
              dengan fitur canggih lainnya, aplikasi ini bertujuan untuk
              menjawab tantangan dalam sistem pemungutan suara tradisional.
              Memanfaatkan teknologi mutakhir, kami bertujuan untuk memastikan
              integritas suara dan meningkatkan partisipasi dalam proses
              demokrasi.
            </p>
          </Transition>

          <Transition
            show={show}
            enter="transition transform duration-300 delay-[400ms]"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className="flex flex-col gap-5"
          >
            <h2 className="uppercase text-lg font-semibold transition-all border-b-2 w-fit">
              Tech Stack
            </h2>
            <div className="md:flex md:flex-wrap block justify-evenly items-center">
              <div className="flex justify-evenly gap-8 items-center">
                <NavLink
                  to={"https://laravel.com"}
                  target="_blank"
                  className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-md"
                >
                  <i className="fa-brands fa-laravel text-5xl text-red-400"></i>
                </NavLink>
                <NavLink
                  to={"https://mysql.com"}
                  target="_blank"
                  className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-md"
                >
                  <img
                    src="./mysql-icon.png"
                    className="w-16 h-16 object-cover"
                    alt=""
                  />
                </NavLink>

                <NavLink
                  to={"https://drive.google.com"}
                  target="_blank"
                  className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-md"
                >
                  <img
                    src="./google-drive-icon.png"
                    className="w-16 h-16 object-cover"
                    alt=""
                  />
                </NavLink>
              </div>
              <span className="text-lg hidden md:block">
                <i className="fa-solid fa-arrows-left-right text-slate-600"></i>
              </span>
              <div className="flex justify-center items-center gap-8">
                <NavLink
                  to={"https://react.dev"}
                  target="_blank"
                  className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-md"
                >
                  <i className="fa-brands fa-react text-5xl text-blue-400"></i>
                </NavLink>
                <NavLink
                  to={"https://tailwindcss.com"}
                  target="_blank"
                  className="transition-all hover:bg-blue-400/30 hover:transition-all p-2 rounded-md"
                >
                  <img
                    src="./tailwind.svg"
                    alt=""
                    className="w-12 h-12"
                  />
                </NavLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
