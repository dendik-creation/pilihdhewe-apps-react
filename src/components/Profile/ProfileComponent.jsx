import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import MyProfileComponent from "./MyProfileComponent";
import ProfilePassword from "./ProfilePassword";
import CandidatActivity from "./CandidatActivity";

export const ProfileComponent = () => {
  const [showTab, setShowTab] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [show, setShow] = useState(false);
  const [fromChild, setFromChild] = useState(null);

  const handleAxios = (res) => {
    setFromChild(res);
  };

  const changeTab = (num) => {
    if (fromChild != null) {
      if (tabs !== num) {
        setShow(false);
        setTimeout(() => {
          setShow(true);
        }, 250);
        setTimeout(() => {
          setTabs(num);
        }, 250);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setShowTab(true);
    }, 250);
  }, []);
  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-start mt-4 gap-12 mx-4 md:mx-0">
        <Transition
          show={showTab}
          enter="transition transform duration-300 delay-[400ms]"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition transform duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-12"
          className="bg-gray-900 fixed rounded-md mx-4 py-4 bottom-3 left-0 right-0 z-50 md:rounded-none md:bg-transparent md:py-0 md:static md:w-60 lg:w-60 xl:w-60"
        >
          <div id="tabs">
            <ul className="flex md:justify-start md:items-start justify-evenly items-center flex-row sm:flex-row md:flex-col lg:flex-col xl:flex-col w-full">
              <li
                onClick={() => changeTab(1)}
                className={`xl:mb-6 lg:mb-6 md:mb-6 px-3 py-2 transition-all rounded-md ${
                  tabs == 1
                    ? "bg-emerald-50 md:bg-gray-800 w-16 text-center md:text-start md:w-52 md:text-white cursor-default relative transition-all"
                    : "bg-gray-700 md:bg-emerald-50 w-16 text-center md:text-start md:w-48 cursor-pointer text-white/70 md:text-black transition-all md:hover:bg-emerald-100"
                }`}
              >
                <i className="bi bi-person block md:hidden text-xl"></i>
                <span className="hidden md:block">Akun Saya</span>
              </li>
              <li
                onClick={() => changeTab(2)}
                className={`xl:mb-6 lg:mb-6 md:mb-6 px-3 py-2 transition-all rounded-md ${
                  tabs == 2
                    ? "bg-emerald-50 md:bg-gray-800 w-16 text-center md:text-start md:w-52 md:text-white cursor-default transition-all"
                    : "bg-gray-700 md:bg-emerald-50 w-16 text-center md:text-start md:w-48 cursor-pointer text-white/70 md:text-black transition-all md:hover:bg-emerald-100"
                }`}
              >
                <i className="bi bi-clock-history block md:hidden text-xl"></i>
                <span className="hidden md:block">History Kandidat</span>
              </li>
              <li
                onClick={() => changeTab(3)}
                className={`xl:mb-6 lg:mb-6 md:mb-6 px-3 py-2 transition-all rounded-md ${
                  tabs == 3
                    ? "bg-emerald-50 md:bg-gray-800 w-16 text-center md:text-start md:w-52 md:text-white cursor-default transition-all"
                    : "bg-gray-700 md:bg-emerald-50 w-16 text-center md:text-start md:w-48 cursor-pointer text-white/70 md:text-black transition-all md:hover:bg-emerald-100"
                }`}
              >
                <i className="bi bi-key block md:hidden text-xl"></i>
                <span className="hidden md:block">Ubah Password</span>
              </li>
            </ul>
          </div>
        </Transition>
        <div className="flex-grow" id="content">
          {tabs == 1 ? (
            <Transition
              show={show}
              enter="transition transform duration-300"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="transition transform duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-12"
              className="w-full"
              id="content-profile"
            >
              <MyProfileComponent onAxios={handleAxios} />
            </Transition>
          ) : tabs == 2 ? (
            <Transition
              show={show}
              enter="transition transform duration-300"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="transition transform duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-12"
              className="w-full"
              id="content-activity-candidate"
            >
              <CandidatActivity candidate_of={fromChild.candidate_of} />
            </Transition>
          ) : tabs == 3 ? (
            <Transition
              show={show}
              enter="transition transform duration-300"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="transition transform duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-12"
              className="w-full"
              id="content-password"
            >
              <ProfilePassword />
            </Transition>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
