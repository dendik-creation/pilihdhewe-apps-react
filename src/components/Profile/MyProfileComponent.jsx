import React, { useEffect, useState } from "react";
import { ACTIVE_USER, APP_URL } from "../../utils/constant";
import axios from "axios";
import {
  httpGetMe,
  httpUpdateMe,
  httpUpdateProfileImage,
  showImageDetail,
} from "../../API/profile";
import { Transition } from "@headlessui/react";
import {
  CameraIcon,
  XCircleIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

import { CloudArrowUpIcon as CloudArrowUpIconSolid } from "@heroicons/react/24/solid";

export default function MyProfileComponent(props) {
  const { onAxios } = props;
  const [initData, setInitData] = useState({
    id: "",
    name: "",
    number_card: "",
    gender: "",
    kelas: "",
    ready_candidate: "",
  });
  const [data, setData] = useState({
    id: "",
    name: "",
    number_card: "",
    gender: "",
    kelas: "",
    ready_candidate: "",
  });

  const [show, setShow] = useState(false);

  const [listKelas, setListKelas] = useState([]);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [selectImage, setImage] = useState({
    selected: ACTIVE_USER.user.gambar,
    preview: ACTIVE_USER.user.gambar,
  });

  const [modalImage, setModalImage] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEnd, setEnd] = useState(false);
  const [isLoadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    httpGetMe()
      .then((response) => {
        setInitData({
          id: response.id,
          name: response.name,
          number_card: response.number_card,
          gender: response.gender,
          gambar: response.gambar,
          ready_candidate: response.ready_candidate,
          kelas: response.role == "admin" ? null : response.kelas,
        });

        onAxios(response);

        setData({
          id: response.id,
          name: response.name,
          number_card: response.number_card,
          gender: response.gender,
          ready_candidate: response.ready_candidate,
          kelas: response.role == "admin" ? null : response.kelas.id,
        });
      })
      .catch((err) => console.log(err));
    if (ACTIVE_USER.user.role == "siswa") {
      getListKelas();
    }
    setShow(true);
  }, []);

  const getListKelas = async () => {
    await axios
      .get(`${APP_URL}/kelas`, {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      })
      .then((response) => {
        setListKelas(response.data);
      })
      .catch((err) => console.log(err));
  };

  const AvailableKelas = () => {
    return (
      <>
        {listKelas.map((item, i) => (
          <option value={item.id} key={i}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const preview = URL.createObjectURL(selected);

    setImage({
      selected,
      preview,
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    setBtnSubmit(true);
  };

  const readySubmitImage = (e) => {
    e.preventDefault();
    const readyImage = selectImage.selected;
    if (readyImage) {
      httpUpdateProfileImage(readyImage, setLoading, setEnd, setModalImage);
    }
  };

  const beforeSubmit = (e) => {
    e.preventDefault();
    let form = {
      name: data.name,
      gender: data.gender,
      kelas_id: data.kelas,
    };

    httpUpdateMe(form, initData.id, setLoadingUpdate, setBtnSubmit);
  };
  return (
    <>
      {data != "" ? (
        <div className="">
          <Transition
            show={show}
            enter="transition transform duration-300 delay-300"
            enterFrom="opacity-0 md:translate-y-0 md:-translate-x-12"
            enterTo="opacity-100 md:translate-y-0 md:translate-x-0"
            leave="transition transform duration-300"
            leaveFrom="opacity-100 md:translate-y-0 md:translate-x-0"
            leaveTo="opacity-0 md:translate-y-0 md:translate-x-12"
            className="text-xl font-bold mb-9 md:mb-5 bg-emerald-50 px-4 py-2 rounded-md w-full md:w-fit flex justify-center items-center"
          >
            Profil Saya
          </Transition>
          <div className="flex flex-col w-full mb-20 md:mb-0">
            <div className="flex flex-col md:flex-row md:ms-4 relative justify-start items-center gap-8 mb-8">
              <div className="relative group">
                <div className="rounded-full ring-4 ring-offset-2 ring-orange-200 overflow-hidden w-48 h-48 md:w-56 md:h-56 shadow-lg hover:transition-all transition-all">
                  <Transition
                    show={show}
                    enter="transition transform duration-300 delay-300"
                    enterFrom="opacity-0 scale-125"
                    enterTo="opacity-100 scale-100"
                    leave="transition transform duration-300"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-50"
                    as="img"
                    src={ACTIVE_USER.user.gambar}
                    className="w-full h-full cursor-pointer hover:brightness-75 object-cover transition-all hover:scale-110 group-hover:transition-all"
                    alt="User Profile"
                    onClick={() => showImageDetail(ACTIVE_USER.user.gambar)}
                  />
                </div>
                <div
                  className="absolute md:w-14 md:h-14 w-12 h-12 ring-4 ring-offset-2 ring-orange-200 hover:bg-gray-800 hover:text-white transition-all  hover:transition-all overflow-hidden rounded-full bottom-3.5 cursor-pointer right-1 z-20 text-dark p-2.5 md:p-3.5 bg-emerald-200"
                  onClick={() => setModalImage(true)}
                >
                  <CameraIcon className=""></CameraIcon>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-3xl font-semibold mb-2">
                  {initData.name}
                </div>
                <div className="flex text-md justify-center md:justify-start gap-3 mb-1">
                  <i className="bi bi-person-vcard text-slate-400"></i>
                  <span className="font-medium">{initData.number_card}</span>
                </div>
                {initData.kelas == null ? (
                  <div className="flex text-md justify-center md:justify-start gap-3 mb-1">
                    <i className="bi bi-person-workspace text-slate-400"></i>
                    <span className="font-medium">
                      {ACTIVE_USER.user.role == "admin" ? "Admin Level" : ""}
                    </span>
                  </div>
                ) : (
                  <div className="flex text-md justify-center md:justify-start gap-3 mb-1">
                    <i className="bi bi-person-workspace text-slate-400"></i>
                    <span className="font-medium">{initData.kelas.name}</span>
                  </div>
                )}
                {ACTIVE_USER.user.role == "siswa" ? (
                  <div className="flex text-md justify-center md:justify-start gap-3 mb-1">
                    <i
                      className={`bi bi-person-${
                        initData.ready_candidate == "yes" ? "check" : "x"
                      } text-slate-400`}
                    ></i>
                    <span className="font-medium">
                      {initData.ready_candidate == "yes"
                        ? "Kandidat Aktif"
                        : initData.ready_candidate == "no"
                        ? "Tidak Menjadi Kandidat"
                        : ""}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                beforeSubmit(e);
              }}
            >
              <div className="block md:flex flex-col md:flex-row w-full justify-start gap-5 items-start">
                <div className="flex flex-col flex-grow">
                  <div className="mb-5 flex flex-col">
                    <label htmlFor="name" className="mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={data.name}
                      onChange={(e) => handleChange(e)}
                      className="text-sm w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                    />
                  </div>

                  {ACTIVE_USER.user.role == "siswa" ? (
                    <div className="mb-5 flex flex-col">
                      <label htmlFor="kelas" className="mb-1">
                        Kelas
                      </label>
                      <select
                        name="kelas"
                        id="kelas"
                        value={data.kelas}
                        onChange={(e) => handleChange(e)}
                        className="text-sm w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                      >
                        <AvailableKelas />
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="mb-5 flex flex-col">
                    <label htmlFor="gender" className="mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={data.gender}
                      onChange={(e) => handleChange(e)}
                      className="text-sm px-2 w-full py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
                    >
                      <option
                        value="Rahasia"
                        disabled={ACTIVE_USER.user.role == "siswa"}
                        hidden={ACTIVE_USER.user.role == "siswa"}
                      >
                        Rahasia
                      </option>
                      <option value="Laki-Laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!btnSubmit || isLoadingUpdate}
                className={`w-full flex justify-center
                    items-center gap-4 bg-blue-200 px-2 py-1 rounded-md transition-all ${
                      !btnSubmit
                        ? "opacity-30"
                        : isLoadingUpdate
                        ? "bg-teal-200"
                        : ""
                    } disabled:hover:bg-blue-200 disabled:hover:text-black
                    disabled:cursor-not-allowed ${
                      btnSubmit ? "hover:bg-gray-800" : ""
                    } hover:transition-all
                    hover:text-white`}
              >
                <span>{isLoadingUpdate ? "Updating" : "Update"}</span>
                {isLoadingUpdate ? (
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  ""
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-start items-center gap-4">
          <span>Loading Content</span>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Modal Upload Image */}
      <Transition
        show={modalImage}
        enter="transition transform duration-300"
        enterFrom="opacity-0 scale-110"
        enterTo="opacity-100 scale-100"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
        className="fixed w-full h-1/2 md:h-full bg-gray-50 shadow-lg rounded-md top-0 left-0 flex justify-center items-center z-30"
      >
        <XCircleIcon
          id="close-btn"
          className={`w-10 text-white bg-slate-700 md:bg-transparent md:text-slate-700
            md:hover:bg-slate-700 md:hover:text-white transition-all hover:transition-all cursor-pointer rounded-full
            h-10 top-4 absolute right-4 z-10 ${isLoading ? "opacity-30" : ""}`}
          onClick={() => {
            if (!isLoading) {
              selectImage.selected = "";
              selectImage.preview = "";
              setModalImage(false);
            }
          }}
        />
        <form onSubmit={(e) => readySubmitImage(e)}>
          <div
            className={`flex flex-col px-6 py-3 md:px-20 md:py-10 lg:px-32 lg:py-16 group rounded-lg border-4
                    border-dashed transition-all hover:border-emerald-400 hover:bg-emerald-100 hover:transition-all
                    border-slate-300 relative justify-center items-center mb-7 ${
                      isLoading
                        ? "hover:border-slate-300 hover:bg-transparent"
                        : "opacity-100"
                    }`}
          >
            <Transition
              show={isLoading}
              enter="transition transform duration-300 delay-300"
              enterFrom="opacity-0 scale-125"
              enterTo="opacity-100 scale-100"
              leave="transition transform duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
              className="absolute w-full h-full top-0 left-0 grid place-items-center opacity-100 rounded-md"
              id="loadAnimation"
            >
              <span className="loader"></span>
            </Transition>
            <div
              className={`flex flex-col justify-center items-center transition-all ${
                isLoading ? "opacity-0 transition-all" : ""
              }`}
            >
              <CloudArrowUpIcon className="w-14 h-14 text-slate-500 mb-2 md:mb-4 transition-all group-hover:transition-all block group-hover:hidden" />
              <CloudArrowUpIconSolid className="w-14 h-14 text-slate-500 mb-2 md:mb-4 transition-all group-hover:transition-all hidden group-hover:block" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Upload Foto Profil Baru
              </h3>
              <span className="text-sm text-slate-500 mb-5">
                JPG File | Max 2 MB
              </span>
              {selectImage.selected.name ? (
                <div
                  className={`text-slate-500 flex justify-start items-center absolute bottom-0.5 md:bottom-5
                            lg:bottom-8 gap-2`}
                >
                  <i className="bi bi-card-image text-lg"></i>
                  <span className="text-sm">
                    {isEnd
                      ? "Foto Profil Tersimpan"
                      : selectImage.selected.name}
                  </span>
                </div>
              ) : (
                ""
              )}
              <input
                type="file"
                disabled={isLoading || isEnd}
                name="gambar"
                id="gambar"
                accept="image/jpeg"
                onChange={(e) => {
                  handleImageChange(e);
                }}
                className={`absolute top-0 left-0 border-0 opacity-0 outline-none w-full h-full ${
                  isLoading
                    ? "cursor-wait"
                    : isEnd
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!selectImage.selected.name || isLoading || isEnd}
            className={`bg-blue-200 w-full px-2 py-1 font-medium rounded-md hover:bg-blue-300 transition-all ${
              isLoading
                ? "bg-yellow-400/40 cursor-wait hover:bg-yellow-400/40"
                : isEnd
                ? "bg-emerald-400/40 cursor-auto hover:bg-emerald-400/40"
                : ""
            } ${
              !selectImage.selected.name
                ? "opacity-30 transition-all cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading
              ? "Uploading , Don't Refresh Page"
              : isEnd
              ? "Upload Berhasil"
              : "Upload"}
          </button>
        </form>
      </Transition>
    </>
  );
}
