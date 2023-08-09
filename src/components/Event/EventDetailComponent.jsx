import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { httpGetMyVoteShow, httpGetShow, httpStoreVote } from "../../API/event";
import { RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ACTIVE_USER, PUBLIC_URL } from "../../utils/constant";
import Swal from "sweetalert2";

export default function EventDetailComponent() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState("");
  const [btnVote, setBtnVote] = useState(true);
  const [transition, setTransition] = useState(false);
  const [isMeVote, setVoteState] = useState(false);
  const [meVote, setMeVote] = useState("");
  useEffect(() => {
    httpGetShow(id).then((response) => {
      setEvent(response);
      setCandidates(response.candidates);
    });

    if (ACTIVE_USER.user.role == "siswa") {
      httpGetMyVoteShow(id)
        .then((response) => {
          if (response.data !== null) {
            if (response.data.event_id == id) {
              setVoteState(true);
              setMeVote(response.data);
            }
          }
        })
        .catch((err) => console.log(err));
    }

    setTimeout(() => {
      setTransition(true);
    }, 250);
  }, []);

  useEffect(() => {
    if (ACTIVE_USER.user.role == "admin") {
    } else if (event == null || candidates == null) {
      navigate("/events");
      Swal.fire({
        icon: "error",
        title: "Missing Event",
        text: "Event yang dimaksud tidak ada",
      });
    } else if (event.status == "Inactive") {
      navigate("/events");
      Swal.fire({
        icon: "warning",
        title: "Error Event",
        text: "Event belum dimulai",
      });
    }
  }, [event]);

  useEffect(() => {
    if (!selected) {
      setBtnVote(false);
    } else {
      setBtnVote(true);
    }
  }, [selected]);
  const voteMyChoose = async (e) => {
    e.preventDefault();
    let form = {
      event_id: event.id,
      candidate_id: selected,
    };
    Swal.fire({
      title: "Apakah Yakin ?",
      text: "Pilihan Anda akan sangat berpengaruh bagi kedepannya",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak, Saya Belum Yakin",
      confirmButtonText: "Ya, Saya Yakin!",
    }).then((result) => {
      if (result.isConfirmed) {
        httpStoreVote(form, navigate);
      }
    });
  };

  const detailCandidate = (name, gambar, visi, misi) => {
    const listMisi = misi.split("\n").filter((item) => item.trim() !== "");
    Swal.fire({
      title: name,
      html: `
        <div class="overfow-hidden rounded-full mb-3 w-full h-72">
          <img
            src="${gambar}"
            class="object-cover rounded-md object-center w-full h-full"
          />
        </div>
        <div class="flex flex-col w-full justify-start items-start mb-3">
          <h2 class="font-semibold text-2xl text-center w-full mb-1">Visi</h2>
          <p class="text-center w-full">${visi}</p>
        </div>

        <div class="flex flex-col w-full justify-start items-start">
          <h2 class="font-semibold text-2xl text-center w-full mb-1">Misi</h2>
          <ol class="text-start flex-col flex px-8 list-decimal gap-3">
            ${listMisi
              .map((item, i) => `<li>${i > 0 ? item.substring(0) : item}</li>`)
              .join("")}
          <ol>
        </div>
      `,
    });
  };
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {!event ? "Event yang dimaksud tidak ada" : event.name}
          </h1>
        </div>
      </header>
      {event && candidates ? (
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Transition
              show={transition}
              enter="transition transform duration-500"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="transition transform duration-500"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 lg:translate-y-full -translate-y-full"
              className="flex flex-col mx-3 sm:mx-auto bg-teal-50 shadow-inner px-5 py-5 rounded-lg mb-6"
            >
              <div className="text-xl font-semibold mb-6" id="header">
                Informasi Event
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-start gap-3">
                    <i className="bi bi-activity"></i>
                    <span className="">{event.status}</span>
                  </div>
                  <div className="hidden sm:block" id="spacer">
                    |
                  </div>
                  <div className="flex flex-start gap-3">
                    <i className="bi bi-calendar2-event"></i>
                    <span className="">
                      {event.start_date} - {event.end_date}
                    </span>
                  </div>
                  <div className="hidden sm:block" id="spacer">
                    |
                  </div>
                  <div className="flex flex-start gap-3">
                    <i className="bi bi-person-check"></i>
                    <span className="">
                      {event.partisipan.length} / {event.total_partisipan}{" "}
                      Partisipan
                    </span>
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <i className="bi bi-blockquote-left"></i>
                  <span className="">{event.description}</span>
                </div>
              </div>
            </Transition>

            {event.status == "Active" ||
            ACTIVE_USER.user.role == "admin" ||
            event.status == "Active" ? (
              <div className="">
                {!isMeVote ? (
                  <form
                    method="POST"
                    onSubmit={(e) => voteMyChoose(e)}
                    className="mx-3 sm:mx-auto"
                  >
                    <Transition
                      show={transition}
                      enter="transition transform duration-500 delay-[200ms]"
                      enterFrom="opacity-0 translate-y-12"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition transform duration-500"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                      className="flex flex-col bg-teal-50 shadow-inner px-5 py-5 rounded-lg mb-3"
                    >
                      <div className="text-xl font-semibold mb-6" id="header">
                        Pilih Kandidat Anda
                      </div>
                      <RadioGroup value={selected} onChange={setSelected}>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full">
                          {candidates.map((candidate, i) => (
                            <RadioGroup.Option
                              key={candidate.id}
                              value={candidate.id}
                              className={({ active, checked }) =>
                                `${
                                  active
                                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                    : ""
                                }
                              ${
                                checked
                                  ? "bg-gray-800 text-white transition-colors"
                                  : "bg-white hover:bg-orange-50"
                              }
                                relative flex cursor-pointer overflow-hidden rounded-lg px-5 py-4 shadow-md focus:outline-none`
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <div className="flex w-full justify-between">
                                    <div className="flex gap-4">
                                      <div className="w-36 h-36 overflow-hidden">
                                        <img
                                          src={candidate.user.gambar}
                                          alt=""
                                          className="object-cover w-full h-full object-center rounded-md"
                                        />
                                      </div>
                                      <div className="w-80 relative">
                                        <RadioGroup.Label
                                          as="p"
                                          className={`font-medium text-md mb-2 flex justify-start  ${
                                            checked
                                              ? "text-white"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          <i className="bi bi-person me-2"></i>
                                          <span>{candidate.user.name}</span>
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as="span"
                                          className={`flex justify-start text-sm mb-1 ${
                                            checked
                                              ? "text-sky-100"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          <i className="bi bi-bookmark-check me-2"></i>
                                          <span className="line-clamp-1">
                                            {candidate.visi}
                                          </span>{" "}
                                        </RadioGroup.Description>
                                        <RadioGroup.Description
                                          as="span"
                                          className={`flex justify-start text-sm ${
                                            checked
                                              ? "text-sky-100"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          <i className="bi bi-blockquote-left me-2"></i>
                                          <span className="line-clamp-1">
                                            {candidate.misi}
                                          </span>{" "}
                                        </RadioGroup.Description>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            detailCandidate(
                                              candidate.user.name,
                                              candidate.user.gambar,
                                              candidate.visi,
                                              candidate.misi
                                            )
                                          }
                                          className={`flex justify-start border-2 px-4 py-2 rounded-md transition-all hover:transition-all absolute bottom-2 text-sm ${
                                            checked
                                              ? "text-sky-100 hover:bg-sky-100 hover:text-gray-500"
                                              : "text-gray-500 hover:bg-gray-500 hover:text-sky-100"
                                          }`}
                                        >
                                          <i className="bi bi-info-circle-fill me-2"></i>
                                          <span className="line-clamp-2">
                                            Detail
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    {checked && (
                                      <div className="text-white flex ms-1 justify-end items-center">
                                        <CheckCircleIcon className="h-9 w-9 opacity-40" />
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </Transition>
                    <div className="flex justify-center items-center">
                      {selected ? (
                        <Transition
                          show={btnVote}
                          enter="transition transform duration-500 delay-[100ms]"
                          enterFrom="opacity-0 translate-y-12"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition transform duration-500"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                          className="w-full flex justify-center items-center"
                        >
                          {ACTIVE_USER.user.role == "siswa" ? (
                            <button
                              type="submit"
                              className="bg-orange-200 px-2 py-2 w-4/5 rounded-lg hover:transition-colors hover:bg-gray-800 hover:text-white opacity-100 transition-all"
                            >
                              <i className="bi bi-pin-angle me-2"></i>
                              <span>Kirim Vote</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="bg-orange-200 cursor-not-allowed disabled:opacity-40 px-2 py-2 w-1/2 rounded-lg transition-all"
                            >
                              <i className="bi bi-pin-angle me-2"></i>
                              <span>Admin tidak dapat berpartisipasi</span>
                            </button>
                          )}
                        </Transition>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="mx-3 sm:mx-auto">
                    <Transition
                      show={transition}
                      enter="transition transform duration-500 delay-[1000ms]"
                      enterFrom="opacity-0 translate-y-12"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition transform duration-500"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                      className="flex flex-col bg-teal-50 shadow-inner px-5 py-5 mb-6 rounded-lg"
                    >
                      <div className="text-xl font-semibold mb-6" id="header">
                        Kandidat Yang Anda Pilih
                      </div>
                      {meVote !== null ? (
                        <RadioGroup value={selected} onChange={setSelected}>
                          <div className="grid grid-cols-1 gap-4 w-full">
                            <div className="bg-white relative flex flex-col overflow-hidden rounded-lg px-5 py-8 shadow-md focus:outline-none">
                              <div className="absolute flex justify-center overflow-hidden items-center top-0 left-0 h-full w-32">
                                <img
                                  src={meVote.user.gambar}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                              <div className="block ms-32">
                                <div className="flex justify-start text-lg font-semibold text-gray-900 mb-2">
                                  <i className="bi bi-person me-2"></i>
                                  <span>{meVote.user.name}</span>
                                </div>
                                <div className="flex justify-start text-sm text-gray-500 mb-1">
                                  <i className="bi bi-bookmark-check me-2 text-md"></i>
                                  <span>{meVote.visi}</span>
                                </div>

                                <div className="flex justify-start text-sm text-gray-500">
                                  <i className="bi bi-blockquote-left me-2 text-md"></i>
                                  <span>{meVote.misi}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      ) : (
                        ""
                      )}
                    </Transition>
                    {event.status == "Selesai" || meVote !== null ? (
                      <Transition
                        show={transition}
                        enter="transition transform duration-500"
                        enterFrom="opacity-0 translate-y-12"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition transform duration-500"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                        className="flex flex-col bg-teal-50 shadow-inner px-5 py-5 rounded-lg mb-6"
                      >
                        <div className="text-xl font-semibold mb-3" id="header">
                          Lihat Hasil Secara Langsung
                        </div>
                        <div className="flex justify-start mb-2 items-center">
                          <i className="bi bi-list-nested me-3"></i>
                          <span className="text-slate-700 text-sm">
                            Hasil Event Ditampilkan pada halaman web yang
                            berbeda
                          </span>
                        </div>
                        <div className="flex justify-start items-center">
                          <i className="bi bi-link-45deg me-3"></i>
                          <NavLink
                            target="_blank"
                            className="text-slate-700 text-sm underline hover:no-underline"
                            to={`${PUBLIC_URL}/event/result/${event.id}`}
                          >
                            Lihat Hasil
                          </NavLink>
                        </div>
                      </Transition>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="">
                {event.status == "Selesai" ? (
                  <Transition
                    show={transition}
                    enter="transition transform duration-500 delay-[200ms]"
                    enterFrom="opacity-0 translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition transform duration-500"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                    className="flex flex-col bg-teal-50 shadow-inner px-5 py-5 rounded-lg mb-6"
                  >
                    <div className="text-xl font-semibold mb-3" id="header">
                      Event Telah Selesai
                    </div>
                    <div className="flex justify-start mb-2 items-center">
                      <i className="bi bi-list-nested me-3"></i>
                      <span className="text-slate-700 text-sm">
                        Hasil Event Ditampilkan pada halaman web yang berbeda
                      </span>
                    </div>
                    <div className="flex justify-start items-center">
                      <i className="bi bi-link-45deg me-3"></i>
                      <NavLink
                        target="_blank"
                        className="text-slate-700 text-sm underline hover:no-underline"
                        to={`${PUBLIC_URL}/event/result/${event.id}`}
                      >
                        Lihat Hasil
                      </NavLink>
                    </div>
                  </Transition>
                ) : (
                  ""
                )}

                <div className="mx-3 mt-5 sm:mx-auto">
                  <Transition
                    show={transition}
                    enter="transition transform duration-500 delay-[200ms]"
                    enterFrom="opacity-0 translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition transform duration-500"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 lg:translate-y-12 -translate-y-12"
                    className="flex flex-col bg-teal-50 shadow-inner px-5 py-5 rounded-lg mb-3"
                  >
                    <div
                      className={`text-xl font-semibold ${
                        meVote ? "mb-6" : "mb-0"
                      }`}
                      id="header"
                    >
                      {meVote
                        ? "Kandidat Yang Anda Pilih"
                        : ACTIVE_USER.user.role == "admin"
                        ? "Admin Tidak Berpartisipasi Dalam Event"
                        : "Anda Tidak Memilih Kandidat Pada Event Ini"}
                    </div>
                    {meVote && meVote !== null ? (
                      <RadioGroup value={selected} onChange={setSelected}>
                        <div className="grid grid-cols-1 gap-4 w-full">
                          <div className="bg-white relative flex flex-col overflow-hidden rounded-lg px-5 py-8 shadow-md focus:outline-none">
                            <div className="absolute flex justify-center overflow-hidden items-center top-0 left-0 h-full w-32">
                              <img
                                src={meVote.user.gambar}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="block ms-32">
                              <div className="flex justify-start text-gray-900 mb-2">
                                <i className="bi bi-person me-2"></i>
                                <span>{meVote.user.name}</span>
                              </div>
                              <div className="flex justify-start text-sm text-gray-500">
                                <i className="bi bi-bookmark-check me-2 text-md"></i>
                                <span>{meVote.visi_misi}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    ) : (
                      ""
                    )}
                  </Transition>
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
