import React, { useState, useEffect } from "react";
import TitleComponent from "../Partials/TitleComponent";
// import CandidateList from "./CandidateList";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import {
  httpCreateCandidate,
  httpDeleteCandidate,
  httpGetCandidate,
  httpGetShow,
  httpUpdateCandidate,
  httpUpdatePut,
  isCandidateUnique,
  isRangeDate,
} from "../../API/event";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";

export const EventEdit = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  // Check For Date Range
  const [isUpdate, setIsUpdate] = useState(true);

  const [transition, setTransition] = useState(false);
  const [transitionCandidate, setTransitionCandidate] = useState(true);
  const [candidateState, setCandidateState] = useState(false);
  const [candidateReadyDelete, setCandidateReadyDelete] = useState([]);

  // on Updating State
  const [isUpdating, setUpdating] = useState(false);

  const [candidate, setCandidate] = useState([]);
  useEffect(() => {
    httpGetShow(id).then((response) => {
      setFormData({
        name: response.name,
        description: response.description,
        start_date: converDate(new Date(response.start_date)),
        end_date: converDate(new Date(response.end_date)),
        candidates: setCandidate(
          response.candidates.map((item) => ({
            id: item.id,
            user_id: item.user.id,
            visi: item.visi,
            misi: item.misi,
            event_id: item.event_id,
            status: "then",

            // For React-Select
            value: item.user.id,
            label: `${item.user.name} | ${item.user.kelas.name}`,
            gambar: item.user.gambar,
          }))
        ),
      });
    });
  }, []);

  const converDate = (date) => {
    const year = date.getFullYear().toString();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const handleForm = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  useEffect(() => {
    httpGetCandidate().then((response) => {
      setCandidateList(
        response.map((item) => ({
          value: item.id,
          label: `${item.name} | ${item.kelas.name}`,
          kelas: item.kelas.name,
          gambar: item.gambar,
          target: "user_id",
        }))
      );
    });
    setTimeout(() => {
      setTransition(true);
    }, 500);
  }, []);

  const handleChange = (e, index) => {
    const values = [...candidate];
    values[index][e.target.name ? e.target.name : e.target] = e.target.value
      ? e.target.value
      : e.value;
    setCandidate(values);
  };

  const CustomCandidateOption = ({ innerProps, isSelected, label, data }) => (
    <div
      {...innerProps}
      className={`flex justify-start transition-all hover:transition-all my-2 px-2 py-1 mx-3 gap-4 items-center cursor-pointer rounded-md ${
        isSelected
          ? "bg-sky-500 hover:bg-sky-600 text-white"
          : "bg-gray-50 hover:bg-gray-200"
      }`}
    >
      <div className="w-8 h-8 overflow-hidden">
        <img
          src={data.gambar}
          className="w-full h-full object-cover rounded-full"
          alt={"Candidate Image"}
        />
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );

  const addCandidate = () => {
    setCandidate([
      ...candidate,
      { user_id: "", visi: "", misi: "", event_id: id, status: "new" },
    ]);
    setTransitionCandidate(false);
    setTimeout(() => {
      setTransitionCandidate(true);
    }, 500);
  };

  const removeCandidate = (index, user_id, event_id, status) => {
    if (status == "then") {
      setCandidateReadyDelete([
        ...candidateReadyDelete,
        {
          user_id: user_id,
          event_id: event_id,
        },
      ]);
    }
    setTransitionCandidate(false);
    setTimeout(() => {
      setTransitionCandidate(true);
    }, 500);
    const values = [...candidate];
    values.splice(index, 1);
    setCandidate(values);
  };

  const beforeSubmit = (e) => {
    e.preventDefault();
    if (isRangeDate(formData.start_date, formData.end_date, isUpdate)) {
      if (isCandidateUnique(candidate)) {
        if (checkBtn) {
          let candidateUpdate = candidate.filter(
            (item) => item.status == "then"
          );
          let candidateNew = candidate.filter((item) => item.status == "new");
          let form = {
            name: formData.name,
            description: formData.description,
            start_date: formData.start_date,
            end_date: formData.end_date,
          };
          Swal.fire({
            title: "Update Event?",
            text: "Anda dapat mengeditnya kembali bila ada kesalahan",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Update!",
          }).then((result) => {
            if (result.isConfirmed) {
              setUpdating(true);
              if (candidateReadyDelete.length > 0) {
                candidateReadyDelete.map((item) => {
                  httpDeleteCandidate(item.user_id, item.event_id);
                });
              }
              if (candidateUpdate.length > 0)
                candidateUpdate.map((item) => {
                  httpUpdateCandidate(item);
                });
              if (candidateNew.length > 0) {
                httpCreateCandidate(candidateNew);
              }
              httpUpdatePut(form, navigate, id);
            }
          });
        }
      }
    }
  };
  const checkBtn = () => {
    if (candidate.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      formData.start_date.length > 0 &&
      formData.end_date.length > 0
    ) {
      setCandidateState(true);
    } else {
      setCandidateState(false);
    }
  }, [formData]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit Event
          </h1>
        </div>
      </header>
      <main>
        <Transition
          show={transition}
          enter="transition transform duration-500"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="lg:mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mx-6 relative">
            {formData != "" && candidate != "" ? (
              <form onSubmit={(e) => beforeSubmit(e)}>
                <div className="block sm:block md:block lg:flex justify-start items-start w-full">
                  <div className="flex relative flex-col justify-start lg:me-10 lg:w-fit me-0 w-full items-start">
                    <div className="mb-4 flex flex-col lg:w-96 w-full gap-2">
                      <label htmlFor="name">Nama Event</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={(e) => handleForm(e)}
                        value={formData.name}
                        id="name"
                        className="text-sm px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                      />
                    </div>

                    <div className="mb-4 flex flex-col lg:w-96 w-full gap-2">
                      <label htmlFor="description">Deskripsi</label>
                      <textarea
                        name="description"
                        required
                        onChange={(e) => handleForm(e)}
                        value={formData.description}
                        id="description"
                        rows={6}
                        className="text-sm px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                      />
                    </div>

                    <div className="mb-4 flex flex-col lg:w-96 w-full gap-2">
                      <label htmlFor="start_date">Tanggal Mulai</label>
                      <input
                        type="date"
                        name="start_date"
                        required
                        onChange={(e) => handleForm(e)}
                        value={formData.start_date}
                        id="start_date"
                        className="text-sm w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                      />
                    </div>

                    <div className="mb-4 flex flex-col lg:w-96 w-full gap-2">
                      <label htmlFor="end_date">Tanggal Selesai</label>
                      <input
                        type="date"
                        name="end_date"
                        required
                        onChange={(e) => handleForm(e)}
                        value={formData.end_date}
                        id="end_date"
                        className="text-sm w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                      />
                    </div>

                    <Transition
                      show={!candidateState}
                      enter="transition transform duration-300"
                      enterFrom="opacity-0 scale-90"
                      enterTo="opacity-100 scale-100"
                      leave="transition transform duration-300"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-90"
                      className="mb-4 mt-2 absolute left-0 -bottom-12 flex flex-col lg:w-96 w-full gap-2 text-slate-700 text-sm py-1 bg-orange-100  rounded-lg text-center"
                    >
                      Lengkapi data event untuk mengakses kandidat
                    </Transition>

                    <Transition
                      show={candidateState}
                      enter="transition transform duration-300"
                      enterFrom="opacity-0 scale-90"
                      enterTo="opacity-100 scale-100"
                      leave="transition transform duration-300"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-90"
                      className="w-full absolute -bottom-8 left-0"
                    >
                      <div className="hidden lg:flex text-sm flex-col justify-center items-center transition-all w-full">
                        {checkBtn() ? (
                          <div className="w-full flex justify-center items-center transition-all bg-orange-50 hover:bg-orange-300 rounded-lg px-2 py-1">
                            <button
                              id="btnSubmit"
                              disabled={isUpdating}
                              type="submit"
                              className="flex justify-center transition-all w-full gap-3 items-center disabled:opacity-70"
                            >
                              <span>{isUpdating ? "Updating" : "Update"}</span>
                              {isUpdating ? (
                                <div className="lds-ellipsis">
                                  <div style={{ background: "#36454F" }}></div>
                                  <div style={{ background: "#36454F" }}></div>
                                  <div style={{ background: "#36454F" }}></div>
                                  <div style={{ background: "#36454F" }}></div>
                                </div>
                              ) : (
                                <ArrowRightCircleIcon className="w-6 h-6" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex w-56 justify-center items-center transition-all bg-blue-50 rounded-lg px-2 py-1">
                            <button
                              id="btnSubmit"
                              disabled
                              type="submit"
                              className="flex transition-all justify-center w-full gap-3 items-center cursor-not-allowed disabled:opacity-40"
                            >
                              <span>Setidaknya 2 Kandidat</span>
                              <i className="bi bi-cone-striped"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </Transition>
                  </div>

                  {/* <CandidateList /> */}
                  <Transition
                    show={candidateState}
                    enter="transition transform duration-500"
                    enterFrom="opacity-0 translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition transform duration-500"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-12"
                    className="flex-col justify-start items-start w-full flex mt-3 lg:mt-0"
                  >
                    <div className="flex justify-between w-full items-center mb-2.5">
                      <span className="">List Kandidat</span>
                      <button
                        onClick={() => {
                          addCandidate();
                        }}
                        type="button"
                      >
                        <PlusCircleIcon
                          id="plus"
                          className=" w-7 h-7  bg-blue-200 rounded-full text-slate-800 hover:bg-blue-500 hover:text-white  transition-colors"
                        />
                      </button>
                    </div>
                    <div className="flex lg:flex-wrap md:flex-col flex-col sm:flex-col gap-5 w-full sm:w-full">
                      {candidate.map((_item, index) => (
                        <Transition
                          show={transitionCandidate}
                          enter="transition transform duration-500"
                          enterFrom="opacity-0 translate-y-12"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition transform duration-500"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-12"
                          key={index}
                          className="flex flex-col transition-all  w-full gap-2 border-2 px-3 py-4 rounded-lg relative"
                        >
                          <div className="flex flex-col ms-14 me-8 mt-1">
                            <div className="absolute top-0 rounded-md flex justify-center items-center left-0 bg-gray-800 hover:bg-gradient-to-b hover:from-gray-800 hover:to-emerald-500 hover:transition-all transition-all h-full w-12">
                              <span className="text-white font-semibold">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex flex-col mb-4">
                              <label htmlFor="user_id" className="text-sm mb-1">
                                Nama
                              </label>
                              <Select
                                required
                                placeholder="Cari Kandidat"
                                className="text-sm"
                                options={candidateList}
                                name="user_id"
                                id="user_id"
                                value={candidate.user_id}
                                defaultValue={
                                  _item.status == "then" ? _item : null
                                }
                                onChange={(e) => handleChange(e, index)}
                                components={{ Option: CustomCandidateOption }}
                                noOptionsMessage={() =>
                                  "Kandidat Tidak Ditemukan"
                                }
                              />
                            </div>
                            <div className="flex flex-col mb-4">
                              <label htmlFor="visi" className="text-sm mb-1">
                                Visi
                              </label>
                              <textarea
                                required
                                name="visi"
                                rows={2}
                                id="visi"
                                className="text-sm px-1.5 py-1 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                                value={_item.visi}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="flex flex-col mb-4">
                              <label htmlFor="misi" className="text-sm mb-1">
                                Misi
                              </label>
                              <textarea
                                required
                                name="misi"
                                rows={4}
                                id="misi"
                                placeholder="Tekan enter untuk banyak misi & akhiri kalimat dengan titik"
                                className="text-sm px-1.5 py-1 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                                value={_item.misi}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                            {index == 0 ? (
                              <span className="absolute w-22 h-7 -top-3.5 right-16 bg-orange-200 text-sm rounded-lg px-2 py-1 font-medium text-slate-800">
                                {_item.status == "then"
                                  ? "Kandidat Lama"
                                  : "Kandidat Baru"}
                              </span>
                            ) : (
                              <div className="">
                                <span
                                  className={`absolute w-22 h-7 -top-3.5 right-16 text-sm rounded-lg px-2 py-1 font-medium ${
                                    _item.status == "then"
                                      ? "bg-orange-200 text-slate-800"
                                      : "bg-slate-800 text-slate-50"
                                  }`}
                                >
                                  {_item.status == "then"
                                    ? "Kandidat Lama"
                                    : "Kandidat Baru"}
                                </span>
                                <button
                                  onClick={() => {
                                    removeCandidate(
                                      index,
                                      _item.user_id,
                                      _item.event_id,
                                      _item.status
                                    );
                                  }}
                                  type="button"
                                >
                                  <MinusCircleIcon
                                    id="minus"
                                    className={`absolute w-7 h-7 -top-3.5 right-3 bg-red-200 rounded-full text-slate-800 ${
                                      _item.status == "then"
                                        ? "hover:bg-red-500"
                                        : "hover:bg-orange-500"
                                    } hover:text-white  transition-colors`}
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </Transition>
                      ))}
                      <Transition
                        show={transitionCandidate}
                        enter="transition transform duration-500"
                        enterFrom="opacity-0 translate-y-12"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition transform duration-500"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-12"
                      >
                        <div className="flex lg:hidden flex-col justify-center items-center transition-all w-full">
                          {checkBtn() ? (
                            <div className="w-full flex justify-center items-center transition-all bg-orange-50 hover:bg-orange-300 rounded-lg px-2 py-1">
                              <button
                                id="btnSubmit"
                                type="submit"
                                disabled={isUpdating}
                                className="flex justify-center transition-all w-full gap-3 items-center disabled:opacity-70"
                              >
                                <span>
                                  {isUpdating ? "Updating" : "Update"}
                                </span>
                                {isUpdating ? (
                                  <div className="lds-ellipsis">
                                    <div
                                      style={{ background: "#36454F" }}
                                    ></div>
                                    <div
                                      style={{ background: "#36454F" }}
                                    ></div>
                                    <div
                                      style={{ background: "#36454F" }}
                                    ></div>
                                    <div
                                      style={{ background: "#36454F" }}
                                    ></div>
                                  </div>
                                ) : (
                                  <ArrowRightCircleIcon className="w-6 h-6" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <div className="flex w-56 justify-center items-center transition-all bg-blue-50 rounded-lg px-2 py-1">
                              <button
                                id="btnSubmit"
                                disabled
                                type="submit"
                                className="flex transition-all justify-center w-full gap-3 items-center cursor-not-allowed disabled:opacity-40"
                              >
                                <span>Setidaknya 2 Kandidat</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </div>
              </form>
            ) : (
              <div className="flex justify-center w-full items-center gap-4">
                <span>Loading</span>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </Transition>
      </main>
    </>
  );
};
