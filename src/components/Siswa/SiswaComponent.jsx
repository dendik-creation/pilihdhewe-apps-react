import axios from "axios";
import React, { Component, Fragment } from "react";
import { ACTIVE_USER, APP_URL } from "../../utils/constant";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  FaceFrownIcon,
  QueueListIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default class SiswaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      siswa: [],
      kelas: [],
      transition: false,
      searchName: "",
    };
  }
  componentDidMount() {
    this.getSiswa();
    this.getListKelas();
    setTimeout(() => {
      this.setState({ transition: true });
    }, 800);
  }

  getSiswa() {
    axios
      .get(`${APP_URL}/siswa-all`, {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      })
      .then((response) => {
        let siswa = response.data;
        this.setState({ siswa });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getListKelas() {
    axios
      .get(`${APP_URL}/kelas`, {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      })
      .then((response) => {
        let kelas = response.data;
        this.setState({ kelas });
      })
      .catch((err) => console.log(err));
  }

  createSiswa() {
    Swal.fire({
      title: "Tambah Siswa",
      width: 800,
      padding: "1em",
      html: `
      <div class="flex flex-col gap-7">
      <input
        type="text"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
        placeholder="Nama Siswa"
        name="name"
        id="name"
      />
      <select
        name="gender"
        id="gender"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
      >
        <option value="" selected disabled>
          Pilih Gender
        </option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
      <select
        name="kelas"
        id="kelas"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
      >
        <option value="" selected disabled>
          Pilih Kelas
        </option>
        ${this.generateKelasList(this.state.kelas)}
      </select>
      <input
        type="password"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
        placeholder="Password"
        name="password"
        id="password"
      />
    </div>
      `,
      confirmButtonText: "Tambah",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const gender = Swal.getPopup().querySelector("#gender").value;
        const password = Swal.getPopup().querySelector("#password").value;
        const kelas = Swal.getPopup().querySelector("#kelas").value;
        if (!name || !password || !gender || !kelas) {
          Swal.showValidationMessage(`Isi data dengan lengkap`);
        }
        return {
          form: {
            name: name,
            gender: gender,
            password: password,
            kelas_id: kelas,
          },
        };
      },
    }).then((form) => {
      axios
        .post(`${APP_URL}/siswa`, form.value.form, {
          headers: {
            Authorization: `Bearer ${ACTIVE_USER.token}`,
          },
        })
        .then((response) => {
          this.successResponse(response);
          this.getSiswa();
        })
        .catch((err) => console.log(err));
    });
  }

  editSiswa(id) {
    axios
      .get(`${APP_URL}/siswa/${id}`, {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Edit Siswa",
          width: 800,
          padding: "1em",
          html: `
        <div class="flex flex-col gap-7">
        <div class="flex flex-col">
          <label class=" text-start mb-2">Nama Siswa</label>
          <input
            type="text"
            class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
            placeholder="Nama Siswa"
            name="name"
            id="name"
            value="${response.data.name}"
        />
        </div>
        <div class="flex flex-col">
        <label class=" text-start mb-2">Kelas</label>
        <select
        name="kelas"
        id="kelas"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
      >
        ${this.generateKelasList(this.state.kelas, response.data.kelas.id)}

      </select>
        </div>
        <div class="flex flex-col">
        <label class=" text-start mb-2">Gender</label>
        <select
        name="gender"
        id="gender"
        class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
      >
        <option value="Laki-laki" ${
          response.data.gender == "Laki-laki" ? "selected" : ""
        }>Laki-laki</option>
        <option value="Perempuan" ${
          response.data.gender == "Perempuan" ? "selected" : ""
        }>Perempuan</option>
      </select>
        </div>
      </div>
        `,
          confirmButtonText: "Update",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          focusConfirm: false,
          preConfirm: () => {
            const name = Swal.getPopup().querySelector("#name").value;
            const gender = Swal.getPopup().querySelector("#gender").value;
            const kelas = Swal.getPopup().querySelector("#kelas").value;
            if (
              name == response.data.name &&
              gender == response.data.gender &&
              kelas == response.data.kelas_id
            ) {
              Swal.showValidationMessage(`Ubah setidaknya 1 data siswa`);
            }
            return {
              form: {
                name: name,
                gender: gender,
                kelas_id: kelas,
              },
            };
          },
        }).then((form) => {
          axios
            .put(`${APP_URL}/siswa/${id}`, form.value.form, {
              headers: {
                Authorization: `Bearer ${ACTIVE_USER.token}`,
              },
            })
            .then((response) => {
              this.successResponse(response);
              this.getSiswa();
            })
            .catch((err) => {
              this.errorResponse(err);
            });
        });
      });
  }

  generateKelasList(kelas, myClassID) {
    // const isMyClass = kelas.filter(item => item.id != kelas )
    const options = kelas.map(
      (item) =>
        `<option value="${item.id}" ${item.id == myClassID ? "selected" : ""}>${
          item.name
        }</option>`
    );
    return options;
  }

  errorResponse(err) {
    const Toast = Swal.mixin({
      toast: true,
      width: 500,
      position: "bottom-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "error",
      title: err.response.data.message,
    });
  }

  successResponse(response) {
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
    Toast.fire({
      icon: "success",
      title: response.data.message,
    });
  }

  destroy(e, id, i) {
    e.preventDefault();
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Akan menghapus seluruh data siswa yang terpilih",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${APP_URL}/siswa/${id}`, {
            headers: {
              Authorization: `Bearer ${ACTIVE_USER.token}`,
            },
          })
          .then((response) => {
            this.successResponse(response);
            this.setState((prevState) => {
              let filterSiswa = prevState.siswa.filter(
                (item) => item.id !== id
              );
              return {
                siswa: filterSiswa,
              };
            });
          })
          .catch((err) => console.log(err.response));
      }
    });
  }

  resetPassword(e, id) {
    e.preventDefault();
    Swal.fire({
      title: "Reset Password?",
      text: "Aksi ini akan mereset password siswa yang dipilih ke default (12345)",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Reset!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${APP_URL}/siswa/reset-password/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${ACTIVE_USER.token}`,
              },
            }
          )
          .then((res) => this.successResponse(res))
          .catch((err) => console.log(err.response));
      }
    });
  }

  showImgProfile(img, name) {
    Swal.fire({
      title: `Avatar ${name}`,
      showConfirmButton: false,
      html: `
        <div class="overfow-hidden rounded-full w-full h-full">
          <img src="${img}" class="object-cover rounded-md object-center w-full h-full" />
        </div>
      `,
    });
  }

  serachHandle(e) {
    this.setState({
      searchName: e.target.value,
    });
  }

  render() {
    const filterSiswa = this.state.siswa.filter((item) =>
      item.name.toLowerCase().includes(this.state.searchName.toLowerCase())
    );
    let { siswa } = this.state;
    return (
      <>
        <div className="flex flex-col overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <Transition
                show={this.state.transition}
                enter="transform transition duration-300 delay-300"
                enterFrom="opacity-0 -translate-y-12"
                enterTo="opacity-100 translate-y-0"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
              >
                <div className=" relative flex mb-4 justify-start gap-8 items-center mx-5 md:mx-0">
                  {siswa.length > 0 ? (
                    <div className="relative flex justify-start gap-8 items-center">
                      <input
                        className="group ps-8 py-2 w-60 border-b-2 border-red-100 transition-all outline-none  focus:outline-none focus:border-gray-800 focus:transition-all"
                        type="search"
                        value={this.state.searchName}
                        onChange={(e) => this.serachHandle(e)}
                        placeholder="Cari Berdasarkan Nama"
                      />
                      <MagnifyingGlassIcon className="w-5 h-5 absolute text-slate-500" />
                    </div>
                  ) : (
                    <span className="text-sm">Tambah Data Siswa</span>
                  )}
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md group hover:bg-gray-800 hover:transition-all"
                    onClick={() => this.createSiswa()}
                  >
                    <UserPlusIcon className="w-5 h-5 text-gray-800 group-hover:text-white group-hover:transition-all" />
                  </button>
                </div>
              </Transition>
              {filterSiswa.length >= 1 ? (
                <div className="block">
                  {this.state.searchName !== "" ? (
                    <div className="flex flex-start my-2 mx-5 md:mx-0">
                      <QueueListIcon className="w-6 h-6 me-2" />
                      <div className="text-slate-600">
                        {filterSiswa.length} Siswa
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <Transition
                    show={this.state.transition}
                    enter="transform transition duration-[500ms]"
                    enterFrom="opacity-0 -translate-y-12"
                    enterTo="opacity-100 translate-y-0"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95"
                    className="hidden lg:block"
                  >
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="font-medium border-gray-800 border-b-2">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Number Card
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Avatar
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Kelas
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Gender
                          </th>
                          <th scope="col" className="px-6 py-4" colSpan={3}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterSiswa.map((item, i) => (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-yellow-100 odd:bg-gray-100 even:bg-white transition-all"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.number_card}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <img
                                src={item.gambar}
                                alt=""
                                className="w-10 h-10 cursor-pointer hover:brightness-90 hover:transition-all transition-all rounded-full object-cover ring-2 ring-offset-1 ring-emerald-300"
                                onClick={() =>
                                  this.showImgProfile(item.gambar, item.name)
                                }
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.kelas.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.gender}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button onClick={() => this.editSiswa(item.id)}>
                                <PencilSquareIcon className="w-6 h-6 text-sky-400 hover:text-blue-500" />
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <form
                                onSubmit={(e) => this.destroy(e, item.id, i)}
                              >
                                <button type="submit">
                                  <TrashIcon className="w-6 h-6 text-red-400 hover:text-rose-600" />
                                </button>
                              </form>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              <form
                                onSubmit={(e) => this.resetPassword(e, item.id)}
                              >
                                <button type="submit">
                                  <KeyIcon className="w-6 h-6 text-lime-400 hover:text-lime-500" />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Transition>
                  <div className="flex flex-col lg:hidden mx-4 mt-12">
                    <ul className="flex flex-col gap-8">
                      {filterSiswa.map((item, i) => (
                        <li key={i} className="">
                          <Transition
                            show={this.state.transition}
                            enter={`transform transition duration-[200ms] delay-[${
                              i + 1 * 100
                            }ms]`}
                            enterFrom="transform opacity-0 scale-110"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-110"
                            className="flex flex-col shadow-md rounded-md px-3 py-1.5 overflow-hidden relative"
                          >
                            <div className="absolute -top-2 -right-2 px-2.5 py-1.5 rounded-md bg-emerald-200">
                              <Menu as="div" className="relative mt-1.5 me-1.5">
                                <div>
                                  <Menu.Button className="flex items-center group">
                                    <div className="flex justify-start items-center">
                                      <i className="bi bi-three-dots-vertical text-xl"></i>
                                    </div>
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div className="">
                                          <button
                                            onClick={() =>
                                              this.editSiswa(item.id)
                                            }
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "flex px-4 py-2 text-sm text-gray-700 w-full items-center"
                                            )}
                                          >
                                            <PencilSquareIcon className="w-4 h-4 text-blue-500 me-2" />
                                            <span className="">Edit</span>
                                          </button>
                                          <form
                                            className="my-2"
                                            onSubmit={(e) =>
                                              this.destroy(e, item.id, i)
                                            }
                                          >
                                            <button
                                              className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "flex px-4 py-2 text-sm text-gray-700 w-full items-center"
                                              )}
                                            >
                                              <TrashIcon className="w-4 h-4 text-red-500 me-2" />
                                              <span className="">Hapus</span>
                                            </button>
                                          </form>
                                          <form
                                            onSubmit={(e) =>
                                              this.resetPassword(e, item.id)
                                            }
                                          >
                                            <button
                                              className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "flex px-4 py-2 text-sm text-gray-700 w-full items-center"
                                              )}
                                            >
                                              <KeyIcon className="w-4 h-4 text-emerald-500 me-2" />
                                              <span className="">Reset</span>
                                            </button>
                                          </form>
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                            <div className="flex justify-center my-3 items-center w-full">
                              <div className="rounded mx-2 w-32 h-32 overflow-hidden">
                                <img
                                  src={item.gambar}
                                  alt={item.name}
                                  className="object-cover rounded-full border-2 border-slate-200 w-full h-full object-center"
                                  onClick={() =>
                                    this.showImgProfile(item.gambar, item.name)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="flex flex-col gap-2">
                                <div className="flex justify-start text-slate-600 gap-2">
                                  <i className="bi bi-person"></i>
                                  <span className="">{item.name}</span>
                                </div>
                                <div className="flex justify-start text-slate-600 gap-2">
                                  <i className="bi bi-person-vcard"></i>
                                  <span className="">{item.number_card}</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ms-8">
                                <div className="flex justify-start text-slate-600 gap-2">
                                  <i className="bi bi-person-workspace"></i>
                                  <span className="">{item.kelas.name}</span>
                                </div>
                                <div className="flex justify-start text-slate-600 gap-2">
                                  <i
                                    className={`bi bi-${
                                      item.gender == "Laki-laki"
                                        ? "gender-male"
                                        : "gender-female"
                                    }`}
                                  ></i>
                                  <span className="">{item.gender}</span>
                                </div>
                              </div>
                            </div>
                          </Transition>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : siswa.length > 0 ? (
                <div className="block">
                  <div className="flex flex-start my-2 mx-5 md:mx-0">
                    <FaceFrownIcon className="w-6 h-6 me-2" />
                    <div className="text-slate-600">
                      Pencarian "{this.state.searchName}" tidak ditemukan
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
