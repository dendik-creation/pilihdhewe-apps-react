import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";
export default function AboutComponent() {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setTab(1);
    }, 250);
  }, []);

  const changeTab = (num) => {
    if (tab !== num) {
      setTab(null);
      setTimeout(() => {
        setTab(num);
      }, 400);
    }
  };

  const donwloadApp = () => {
    let link = document.createElement("a");
    link.href = "https://pilihdhewe.my.id/apps/PilihDhewe.apk";
    link.download = "PilihDhewe.apk";
    link.click();
    link.remove();
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      ></link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-0">
        <div className="flex justify-center items-center flex-col gap-4 md:h-96 mb-8 md:mb-0">
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
        <div className="relative overflow-hidden flex flex-col gap-8">
          {/* Tabs */}
          <Transition
            show={show}
            enter="transition transform duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            className="w-full flex justify-center items-center"
          >
            <div className="flex text-sm justify-center w-full gap-4 items-center">
              <button
                onClick={() => changeTab(1)}
                className={`flex w-full border-b-4 ${
                  tab == 1 ? "border-blue-500" : "border-gray-200"
                } justify-center items-center py-1 transition-all hover:transition-all cursor-pointer`}
              >
                General
              </button>
              <button
                onClick={() => changeTab(2)}
                className={`flex w-full border-b-4 ${
                  tab == 2 ? "border-blue-500" : "border-gray-200"
                } justify-center items-center py-1 transition-all hover:transition-all cursor-pointer`}
              >
                Teams & Version
              </button>
            </div>
          </Transition>

          {/* Tab1 */}
          <Transition
            show={tab == 1}
            enter="transition transform duration-300"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4">
              <h2 className="uppercase text-lg font-semibold transition-all">
                General Information
              </h2>
              <p className="first-letter:ms-5 selection:bg-emerald-200">
                Proyek Aplikasi Voting adalah upaya kami untuk mengembangkan
                solusi modern untuk melakukan pemungutan suara. Dengan
                memanfaatkan kekuatan framework Laravel dan React JS, bersama
                dengan fitur canggih lainnya, aplikasi ini bertujuan untuk
                menjawab tantangan dalam sistem pemungutan suara tradisional.
                Memanfaatkan teknologi mutakhir, kami bertujuan untuk memastikan
                integritas suara dan meningkatkan partisipasi dalam proses
                demokrasi.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="uppercase text-lg font-semibold transition-all">
                Tech Stack App
              </h2>
              <div className="md:flex-row flex md:flex-wrap flex-col justify-evenly md:gap-0 items-center">
                {/* Be */}
                <div className="flex justify-center gap-4 items-center">
                  <NavLink
                    to={"https://laravel.com"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-3 rounded-full"
                    title="Laravel v9"
                  >
                    <i className="fa-brands fa-laravel text-4xl text-red-400"></i>
                  </NavLink>
                  <NavLink
                    to={"https://mysql.com"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-full"
                    title="MySQL"
                  >
                    <img
                      src="./mysql-icon.png"
                      className="w-12 h-12 object-cover"
                      alt=""
                    />
                  </NavLink>

                  <NavLink
                    to={"https://drive.google.com"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-2 rounded-full"
                    title="Google Drive API v3"
                  >
                    <img
                      src="./google-drive-icon.png"
                      className="w-12 h-12 object-cover"
                      alt=""
                    />
                  </NavLink>
                </div>

                {/* Spacer */}
                <span className="text-lg hidden xl:block rotate-90">
                  <i
                    className="bi bi-arrows-collapse text-slate-400 text-2xl"
                    title="Backend | Frontend"
                  ></i>
                </span>

                {/* Fe */}
                <div className="flex justify-center items-center gap-4">
                  <NavLink
                    to={"https://react.dev"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-3 rounded-full"
                    title="React JS v18"
                  >
                    <i className="fa-brands fa-react text-4xl text-blue-400"></i>
                  </NavLink>
                  <NavLink
                    to={"https://tailwindcss.com"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-3 rounded-full"
                    title="Tailwind CSS v3.3.3"
                  >
                    <img src="./tailwind.svg" alt="" className="w-8 h-8" />
                  </NavLink>
                  <NavLink
                    to={"https://flutter.dev"}
                    target="_blank"
                    className="transition-all hover:bg-blue-400/10 hover:transition-all p-3 rounded-full"
                    title="Flutter Mobile"
                  >
                    <img
                      src="./flutter-icon-48.svg"
                      alt=""
                      className="w-8 h-8"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </Transition>

          {/* Tab2 */}
          <Transition
            show={tab == 2}
            enter="transition transform duration-300"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4">
              <h2 className="uppercase text-lg font-semibold transition-all">
                Team Development
              </h2>
              <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start gap-6 lg:gap-16">
                <div className="flex flex-col justify-start items-start">
                  <div className="text-md font-medium mb-1.5">
                    Dendi' Setiawan
                  </div>
                  <div className="flex justify-center text-gray-600 items-center gap-3">
                    <i className="bi bi-person-gear"></i>
                    <span className="text-sm">
                      Backend {`(API)`} & Frontend {"(Web)"}
                    </span>
                  </div>
                  <div className="flex justify-center text-gray-600 items-center gap-3">
                    <i className="bi bi-tools"></i>
                    <span className="text-sm">Laravel 9 & React JS 18.2.0</span>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <div className="text-md font-medium mb-1.5">
                    Syahrul Imam Said
                  </div>
                  <div className="flex justify-center text-gray-600 items-center gap-3">
                    <i className="bi bi-person-gear"></i>
                    <span className="text-sm">Frontend {"(Mobile Apps)"}</span>
                  </div>
                  <div className="flex justify-center text-gray-600 items-center gap-3">
                    <i className="bi bi-tools"></i>
                    <span className="text-sm">Flutter 3.10.6</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="uppercase text-lg font-semibold transition-all">
                App Version
              </h2>
              <div className="md:flex-row flex md:flex-wrap flex-col justify-around gap-5 md:gap-0 items-center">
                <div className="flex md:flex-row flex-col justify-start gap-4 w-full items-center">
                  <div className="flex justify-start gap-8 w-full items-center">
                    <div className="flex justify-start gap-4 items-center">
                      <i className="bi bi-globe2 text-xl text-gray-400"></i>
                      <span className="text-gray-600 text-sm">1.0.0</span>
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                      <i className="bi bi-android2 text-xl text-gray-400"></i>
                      <span className="text-gray-600 text-sm">1.0.1</span>
                    </div>
                  </div>
                  <div className="flex justify-start gap-8 w-full items-center">
                    <div
                      onClick={() => donwloadApp()}
                      className="flex justify-start gap-4 cursor-pointer transition-all group items-center"
                    >
                      <i className="bi bi-download text-xl text-gray-400"></i>
                      <span className="text-gray-600 text-sm group-hover:underline">
                        Download Pilih Dhewe {"(Mobile)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
