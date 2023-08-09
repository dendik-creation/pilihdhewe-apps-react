import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  httpPostCheckPassword,
  httpPutChangePassword,
} from "../../API/profile";
import { Logout } from "../../API/auth";
import Swal from "sweetalert2";

export default function ProfilePassword() {
  const [showCheckPass, setShow] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, []);

  const handlePassword = (e) => {
    const { name } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const beforeCheck = (e) => {
    e.preventDefault();
    httpPostCheckPassword(passwordData.password)
      .then((res) => {
        setShow(false);
        setTimeout(() => {
          setShowChangePass(res);
        }, 250);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Aksi Gagal",
          text: "Password lama tidak cocok",
        });
      });
  };

  const beforeSubmit = (e) => {
    e.preventDefault();
    let data = {
      new_password: passwordData.new_password,
      new_password_confirmation: passwordData.new_password_confirmation,
    };
    Swal.fire({
      title: "Yakin Ubah Password ?",
      text: "Mengubah password menyebabkan anda logout dan harus login menggunakan password baru",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Ubah Password!",
    }).then((result) => {
      if (result.isConfirmed) {
        httpPutChangePassword(data)
          .then(() => Logout())
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Aksi Gagal",
              text: err.response.data.message,
            });
          });
      }
    });
  };

  return (
    <>
      <Transition
        show={showCheckPass}
        enter="transition transform duration-300 delay-300"
        enterFrom="opacity-0 md:translate-y-0 md:-translate-x-12"
        enterTo="opacity-100 md:translate-y-0 md:translate-x-0"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 md:translate-y-0 md:translate-x-0"
        leaveTo="opacity-0 md:translate-y-0 md:translate-x-12"
        className="text-xl font-bold mb-9 md:mb-5 bg-emerald-50 px-4 py-2 rounded-md w-full md:w-fit flex justify-center items-center"
      >
        Konfirmasi Password Lama
      </Transition>

      <Transition
        show={showChangePass}
        enter="transition transform duration-300 delay-300"
        enterFrom="opacity-0 md:translate-y-0 md:-translate-x-12"
        enterTo="opacity-100 md:translate-y-0 md:translate-x-0"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 md:translate-y-0 md:translate-x-0"
        leaveTo="opacity-0 md:translate-y-0 md:translate-x-12"
        className="text-xl font-bold mb-9 md:mb-5 bg-emerald-50 px-4 py-2 rounded-md w-full md:w-fit flex justify-center items-center"
      >
        Buat Password Baru
      </Transition>

      <Transition
        show={showCheckPass}
        enter="transition transform duration-300"
        enterFrom="opacity-0 translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-12"
        className="flex flex-col"
      >
        <form onSubmit={(e) => beforeCheck(e)} className="mb-5 flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password Lama
          </label>
          <input
            type="password"
            name="password"
            required
            id="password"
            value={passwordData.password}
            onChange={(e) => handlePassword(e)}
            className="text-sm mb-3 w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
          />
          <button
            type="submit"
            className="bg-blue-300 hover:shadow-md px-2 py-1 font-medium rounded-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-blue-300 disabled:transition-all transition-all"
          >
            Berikutnya
          </button>
        </form>
      </Transition>

      <Transition
        show={showChangePass}
        enter="transition transform duration-300 delay-700"
        enterFrom="opacity-0 translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-12"
        className="flex flex-col"
      >
        <form onSubmit={(e) => beforeSubmit(e)} className="mb-5 flex flex-col">
          <div className="mb-3">
            <label htmlFor="new_password" className="mb-1">
              Password Baru (Kombinasikan angka,simbol,dan huruf untuk keamanan)
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              required
              value={passwordData.new_password}
              onChange={(e) => handlePassword(e)}
              className="text-sm mb-3 w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="new_password_confirmation" className="mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              name="new_password_confirmation"
              id="new_password_confirmation"
              required
              value={passwordData.new_password_confirmation}
              onChange={(e) => handlePassword(e)}
              className="text-sm mb-3 w-full px-2 py-1.5 border-2 border-stone-200 rounded-md outline-none focus:border-blue-400 focus:transition-all transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-red-300 hover:shadow-md px-2 py-1 font-medium rounded-md disabled:opacity-30 transition-all"
          >
            Ubah Password
          </button>
        </form>
      </Transition>
    </>
  );
}
