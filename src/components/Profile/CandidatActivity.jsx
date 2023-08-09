import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIVE_USER } from "../../utils/constant";

export default function CandidatActivity({ candidate_of }) {
  const [show, setShow] = useState(false);
  const [tabsShow, setTabsShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setShow(true);
    setTabsShow(true);
  }, []);
  return (
    <>
      <Transition
        show={tabsShow}
        enter="transition transform duration-300 delay-300"
        enterFrom="opacity-0 md:translate-y-0 md:-translate-x-12"
        enterTo="opacity-100 md:translate-y-0 md:translate-x-0"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 md:translate-y-0 md:translate-x-0"
        leaveTo="opacity-0 md:translate-y-0 md:translate-x-12"
        className="text-xl font-bold mb-9 md:mb-5 bg-emerald-50 px-4 py-2 rounded-md w-full md:w-fit flex justify-center items-center"
      >
        History Keikutsertaan Kandidat
      </Transition>
      <div className="flex flex-col mb-20 md:mb-0">
        <Transition
          show={tabsShow}
          enter="transition transform duration-300"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition transform duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-12"
          className=""
        >
          {candidate_of.length > 0 ? (
            <div className="flex justify-start items-center text-lg font-medium">
              Anda berpartisipasi sebagai kandidat pada {candidate_of.length}{" "}
              event
            </div>
          ) : ACTIVE_USER.user.role == "admin" ? (
            <div className="flex justify-start items-center text-lg font-medium">
              Administrator tidak dapat berpartisipasi dalam event
            </div>
          ) : (
            <div className="flex justify-start items-center text-lg font-medium">
              Anda belum pernah berpartisipasi di event apapun
            </div>
          )}
        </Transition>
        <div className="flex flex-col justify-start text-md mt-8">
          {candidate_of.length > 0 &&
            candidate_of.map((item, i) => (
              <Transition
                show={show}
                enter={`transition transform duration-300`}
                enterFrom="opacity-0 translate-y-12"
                enterTo="opacity-100 translate-y-0"
                leave="transition transform duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-12"
                className="w-full relative bg-slate-50 shadow-md mb-5 px-6 py-3 overflow-hidden rounded-md"
                key={i}
              >
                <div
                  className={`absolute right-0 cursor-pointer top-0 h-full group hover:w-24 hover:transition-all transition-all rounded-sm flex justify-center items-center ${
                    item.event.status == "Inactive"
                      ? "bg-yellow-300 w-12 text-slate-900"
                      : item.event.status == "Active"
                      ? " bg-blue-300 w-12 text-slate-900"
                      : " bg-red-300 w-12 text-slate-900"
                  }`}
                  onClick={() => navigate(`/events/${item.event.id}`)}
                >
                  <span className="hidden group-hover:block group-hover:transition-all transition-all">
                    Check
                  </span>
                  <i className="bi bi-arrow-right-short font-bold group-hover:ms-1 text-xl"></i>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col gap-3">
                    <div className="text-xl mb-1 me-8">{item.event.name}</div>
                    <div className="flex flex-col justify-start items-start gap-3 lg:gap-4 lg:flex-row lg:items-center">
                      <div className="flex flex-start gap-3">
                        <i className="bi bi-activity"></i>
                        <span className="">{item.event.status}</span>
                      </div>
                      <div className="hidden lg:block" id="spacer">
                        |
                      </div>
                      <div className="flex flex-start gap-3">
                        <i className="bi bi-calendar2-event"></i>
                        <span className="">
                          {item.event.start_date} - {item.event.end_date}
                        </span>
                      </div>
                      <div className="hidden lg:block" id="spacer">
                        |
                      </div>
                      <div className="flex flex-start items-center gap-3">
                        <i className="bi bi-pin-angle"></i>
                        <span className="">
                          <span className="text-xl font-bold">
                            {item.my_total_vote}
                          </span>{" "}
                          / {item.event.total_partisipan} Orang Memilih Anda
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col"></div>
                </div>
              </Transition>
            ))}
        </div>
      </div>
    </>
  );
}
