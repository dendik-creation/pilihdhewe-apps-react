import React, { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  PlusIcon,
  FaceFrownIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { httpGetIndex, httpGetMyVoteIndex } from "../../API/event";
import { Transition } from "@headlessui/react";
import { ACTIVE_USER, APP_URL } from "../../utils/constant";
import Swal from "sweetalert2";
import axios from "axios";

export default function EventComponent() {
  const [events, setEvents] = useState([]);
  const [votes, setVotes] = useState([]);
  const [search, setSearch] = useState("");
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    httpGetIndex().then((response) => {
      setEvents(response);
      setTimeout(() => {
        setTransition(true);
      }, 250);
    });

    httpGetMyVoteIndex().then((response) => {
      setVotes(response);
    });
  }, []);

  const serachHandle = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();

  const resultSearch = events.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const httpDeleteDestroy = (id) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Swal.fire({
      title: "Yakin Hapus Event ?",
      text: "Menghapus event akan menghapus juga data kandidat dan jumlah voting",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${APP_URL}/events/${id}`, {
            headers: {
              Authorization: `Bearer ${ACTIVE_USER.token}`,
            },
          })
          .then((response) => {
            setEvents((prev) => {
              let afterDel = prev.filter((item) => item.id !== id);
              return afterDel;
            });
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          });
      }
    });
  };

  return (
    <>
      {events.length > 0 ? (
        <div>
          <Transition
            show={transition}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative flex mb-6 mx-8 lg:mx-2 justify-start gap-8 items-center">
              <input
                className="group ps-8 py-2 w-60 border-b-2 border-red-100 transition-all outline-none  focus:outline-none focus:border-gray-800 focus:transition-all"
                type="search"
                value={search}
                onChange={(e) => serachHandle(e)}
                placeholder="Cari Berdasarkan Nama"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute text-slate-500" />
              {ACTIVE_USER.user.role == "admin" ? (
                <NavLink
                  to={"create"}
                  className="bg-gray-300 px-2 py-1.5 md:px-4 md:py-2 flex justify-center items-center relative rounded-md group hover:bg-gray-800 hover:transition-all"
                >
                  <CalendarDaysIcon className="w-5 h-5 me-1 text-gray-800 relative group-hover:text-white group-hover:transition-all" />
                  <PlusIcon className="w-3 h-3 font-semibold text-gray-800 group-hover:text-white group-hover:transition-all" />
                </NavLink>
              ) : (
                ""
              )}
            </div>{" "}
          </Transition>
          {resultSearch.length >= 1 ? (
            <div className="block">
              {search !== "" ? (
                <div className="flex flex-start mx-8 md:mx-0 mb-6">
                  <QueueListIcon className="w-6 h-6 me-2" />
                  <div className="text-slate-600">
                    {resultSearch.length} Event
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
                {resultSearch.map((item, i) => (
                  <Transition
                    key={item.id}
                    show={transition}
                    enter={`transform transition duration-300 ${`delay-[${
                      i++ * 100
                    }ms]`}`}
                    enterFrom="opacity-0 translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                  >
                    <div className="relative mx-auto w-full">
                      <div className="relative inline-block w-full">
                        <div className="shadow-md p-4 rounded-lg mx-5 md:mx-0 bg-white">
                          <div
                            className={
                              item.status == "Inactive"
                                ? "flex justify-center items-center group relative rounded-lg overflow-hidden h-16 bg-yellow-300"
                                : item.status == "Selesai"
                                ? "flex justify-center items-center group relative rounded-lg overflow-hidden h-16 bg-red-300"
                                : "flex justify-center items-center group relative rounded-lg overflow-hidden h-16 bg-blue-300"
                            }
                          >
                            <span className="absolute top-0 left-0 inline-flex m-3 px-3 py-2 rounded-lg z-10 shadow-inner bg-slate-50 text-sm font-medium text-slate-700 select-none">
                              #{i + 1}
                            </span>
                            {ACTIVE_USER.user.role == "admin" ? (
                              <NavLink
                                to={`/events/edit/${item.id}`}
                                className="absolute shadow-inner lg:-top-14 top-0 right-14 inline-flex m-3 px-3 py-2 rounded-lg z-10 bg-blue-400 hover:bg-blue-700 hover:transition-colors text-sm border-2 border-slate-50 font-medium text-white select-none transition-all group-hover:opacity-100 group-hover:transition-all lg:group-hover:-top-0"
                              >
                                <PencilSquareIcon className="w-5 h-5" />
                              </NavLink>
                            ) : (
                              ""
                            )}
                            {ACTIVE_USER.user.role == "admin" ? (
                              <button
                                onClick={() => httpDeleteDestroy(item.id)}
                                className="absolute shadow-inner lg:-top-14 top-0 border-2 border-slate-50 right-0 inline-flex m-3 px-3 py-2 rounded-lg z-10 bg-red-500 hover:bg-red-700 hover:transition-colors text-sm font-medium text-white select-none group-hover:opacity-100 delay-100 transition-all group-hover:transition-all group-hover:delay-100 lg:group-hover:-top-0"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              ""
                            )}
                            {votes.map((vote, index) => (
                              <Transition
                                show={transition}
                                enter="transform transition duration-500 delay-[400ms]"
                                enterFrom="opacity-0 translate-y-12"
                                enterTo="opacity-100 translate-y-0"
                                leave="transform duration-200 transition ease-in-out"
                                leaveFrom="opacity-100 rotate-0 scale-100 "
                                leaveTo="opacity-0 scale-95"
                                key={index}
                                className={`absolute top-0 group transition-all right-4 flex flex-col justify-center items-center font-medium h-full`}
                              >
                                {vote.user_id == ACTIVE_USER.user.id &&
                                item.id == vote.event_id ? (
                                  <div className="transition-all bg-slate-50 px-2 py-1 rounded-md shadow-inner">
                                    Anda Telah Voting
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Transition>
                            ))}
                          </div>

                          <div className="mt-4">
                            <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
                              {item.name}
                            </h2>
                            <p className="mt-2 text-sm text-gray-800 line-clamp-1">
                              {item.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
                            <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                              <i className="bi bi-activity"></i>
                              <span className="mt-2 xl:ms-3 xl:mt-0">
                                {item.status}
                              </span>
                            </p>
                            <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                              <i className="bi bi-people"></i>
                              <span className="mt-2 xl:ms-3 xl:mt-0">
                                {item.candidates.length} Kandidat
                              </span>
                            </p>
                            <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                              <i className="bi bi-calendar2-event"></i>
                              <span className="mt-2 xl:ms-3 xl:mt-0 line-clamp-1">
                                {item.start_date}
                              </span>
                            </p>
                            <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                              <i className="bi bi-calendar2-check"></i>
                              <span className="mt-2 xl:ms-3 xl:mt-0 line-clamp-1">
                                {item.end_date}
                              </span>
                            </p>
                          </div>

                          <div className="grid grid-cols-2 mt-8">
                            <div className="flex items-center">
                              <p className="text-gray-800 shadow-inner px-2 py-1 rounded-md line-clamp-1">
                                {item.partisipan.length} /{" "}
                                {item.total_partisipan} Partisipan
                              </p>
                            </div>

                            <div className="px-2 py-1 rounded-md">
                              <div className="flex justify-end items-center">
                                {ACTIVE_USER.user.role == "admin" ? (
                                  <button
                                    className="transition-all bg-gray-100 shadow-inner hover:bg-gray-800 hover:text-white hover:transition-colors px-2 py-1 rounded-md group"
                                    onClick={() => navigate(`${item.id}`)}
                                  >
                                    <i className="bi bi-person-fill-gear"></i>
                                    <span className="ms-3">Check</span>
                                  </button>
                                ) : item.status == "Inactive" ? (
                                  <button
                                    disabled
                                    className="transition-all bg-gray-300 shadow-inner disabled:opacity-30 px-2 py-1 rounded-md group"
                                  >
                                    <i className="bi bi-cone-striped"></i>
                                    <span className="ms-3">Belum Dimulai</span>
                                  </button>
                                ) : item.status == "Selesai" ? (
                                  <button
                                    onClick={() => navigate(`${item.id}`)}
                                    className="transition-all bg-gray-300 hover:bg-gray-800 hover:text-white shadow-inner disabled:opacity-30 px-2 py-1 rounded-md group"
                                  >
                                    <i className="bi bi-stop-circle"></i>
                                    <span className="ms-3">Event Selesai</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => navigate(`${item.id}`)}
                                    className="transition-all bg-gray-100 shadow-inner hover:bg-gray-800 hover:text-white hover:transition-colors px-2 py-1 rounded-md group"
                                  >
                                    <span className="me-3">Check</span>
                                    <i className="bi bi-arrow-right-short"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
          ) : (
            <div className="block">
              <div className="flex flex-start my-2 mx-4 md:mx-0">
                <FaceFrownIcon className="w-6 h-6 me-2" />
                <div className="text-slate-600">
                  Pencarian "{search}" tidak ditemukan
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center w-full items-center gap-4">
          <span>Loading</span>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
