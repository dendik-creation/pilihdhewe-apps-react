import axios from "axios";
import React, { useEffect, useState } from "react";
import { ACTIVE_USER, APP_URL } from "../utils/constant";
import Swal from "sweetalert2";

export const httpGetMe = async () => {
  const response = await axios.get(`${APP_URL}/me`, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return response.data.data;
};

export const showImageDetail = (image) => {
  return Swal.fire({
    html: `
    <div class="overfow-hidden rounded-full w-full h-full">
      <img src="${image}" class="object-cover rounded-md object-center w-full h-full" />
    </div>
  `,
  });
};

export const httpUpdateMe = async (data, id, setLoadingUpdate) => {
  setLoadingUpdate(true);
  await axios
    .put(`${APP_URL}/siswa/${id}`, data, {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    })
    .then((response) => {
      const getMe = httpGetMe();
      getMe
        .then((response) => {
          localStorage.setItem(
            "credentials",
            JSON.stringify({
              user: response,
              token: ACTIVE_USER.token,
            })
          );
        })
        .then(() => {
          window.location.reload();
        });
    })
    .catch((err) => {
      setLoadingUpdate(false);
      Swal.fire({
        icon: "error",
        title: "Aksi Gagal",
        text: err.response.data.message,
      });
    });
};

export const httpUpdateProfileImage = async (
  gambar,
  loading,
  end,
  modalImage
) => {
  loading(true);
  await axios
    .post(
      `${APP_URL}/img-update`,
      { gambar },
      {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      const getMe = httpGetMe();
      getMe.then((response) => {
        localStorage.setItem(
          "credentials",
          JSON.stringify({
            user: response,
            token: ACTIVE_USER.token,
          })
        );
      });
    })
    .then(() => {
      loading(false);
      end(true);
      setTimeout(() => {
        modalImage(false);
        setTimeout(() => {
          window.location.reload();
        }, 350);
      }, 500);
    })
    .catch((err) => {
      loading(false);
      Swal.fire({
        icon: "error",
        title: "Aksi Gagal",
        text: err.response.data.errors
          ? err.response.data.errors.gambar
          : err.response.data.message,
      });
    });
};

export const httpPostCheckPassword = async (password) => {
  const response = await axios.post(
    `${APP_URL}/check-password`,
    { password: password },
    {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    }
  );
  return response.data;
};

export const httpPutChangePassword = async (data) => {
  const response = await axios.put(`${APP_URL}/change-password`, data, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return response.data;
};
