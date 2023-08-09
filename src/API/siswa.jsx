import axios from "axios";
import { ACTIVE_USER, APP_URL } from "../utils/constant";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const httpGetIndex = async () => {
  const response = await axios.get(`${APP_URL}/siswa-all`, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return response.data;
};

export const httpStoreCreate = () => {
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
      if (!name || !password || !gender) {
        Swal.showValidationMessage(`Isikan data dengan benar`);
      }
      return {
        form: {
          name: name,
          gender: gender,
          password: password,
        },
      };
    },
  }).then((form) => {
    axios
      .post(`${APP_URL}/siswa`, form.value.form)
      .then((response) => {
        successResponse(response);
      })
      .catch((err) => console.log(err));
  });
};

export const httpGetEdit = (id) => {
  axios.get(`${APP_URL}/siswa/${id}`).then((response) => {
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
          <label class=" text-start mb-2">Gender</label>
          <select
          name="gender"
          id="gender"
          class="px-4 py-2 bg-slate-50 rounded-md focus:outline-none focus:bg-slate-200 focus:transition-colors"
        >
          <option value="${response.data.gender}" selected disabled>
            ${response.data.gender}
          </option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
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
        if (!name && !gender) {
          Swal.showValidationMessage(`Ubah setidaknya 1 data siswa`);
        }
        return {
          form: {
            name: name,
            gender: gender,
          },
        };
      },
    }).then((form) => {
      axios
        .put(`${APP_URL}/siswa/${id}`, form.value.form)
        .then((response) => {
          successResponse(response);
        })
        .catch((err) => {
          errorResponse(err);
        });
    });
  });
};

export const httpPostDestroy = (e, id, i) => {
  e.preventDefault();
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Aksi tidak dapat dibatalkan",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${APP_URL}/siswa/${id}`)
        .then((response) => {
          this.successResponse(response);
          this.setState((prevState) => {
            let filterSiswa = prevState.siswa.filter((item) => item.id !== id);
            return {
              siswa: filterSiswa,
            };
          });
        })
        .catch((err) => console.log(err.response));
    }
  });
};

export const successResponse = (response) => {
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
};

export const errorResponse = (err) => {
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
};
