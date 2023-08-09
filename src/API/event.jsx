import axios from "axios";
import React, { useEffect, useState } from "react";
import { ACTIVE_USER, APP_URL, PUBLIC_URL } from "../utils/constant";
import Swal from "sweetalert2";

export const httpGetIndex = async () => {
  const events = await axios.get(`${APP_URL}/events`);
  return events.data.data;
};

export const httpGetShow = async (id) => {
  try {
    const event = await axios.get(`${APP_URL}/events/${id}`);
    return event.data.data;
  } catch (error) {
    return;
  }
};

export const httpGetLatest = async () => {
  const event = await axios.get(`${APP_URL}/latest-event`, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return event.data.data;
};

export const httpCreatePost = (form, navigate) => {
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
    title: "Buat Event?",
    text: "Anda dapat mengeditnya sewaktu-waktu bila ada kesalahan",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Buat!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .post(`${APP_URL}/events`, form, {
          headers: {
            Authorization: `Bearer ${ACTIVE_USER.token}`,
          },
        })
        .then((response) => {
          navigate("/events");
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        });
    }
  });
};

export const httpUpdatePut = async (form, navigate, id) => {
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
  await axios
    .put(`${APP_URL}/events/${id}`, form, {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    })
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
      navigate("/events");
    })
    .catch((err) => console.log(err));
};

export const httpGetCandidate = async () => {
  const candidates = await axios.get(`${APP_URL}/siswa-all`, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return candidates.data;
};

export const httpCreateCandidate = async (candidate) => {
  const candidates = await axios.post(
    `${APP_URL}/candidates`,
    { candidates: candidate },
    {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    }
  );
  return candidates.data;
};

export const httpUpdateCandidate = async (candidate) => {
  await axios.put(`${APP_URL}/candidates/${candidate.id}`, candidate, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
};

export const httpDeleteCandidate = async (
  user_id,
  event_id,
  values,
  index,
  setCandidate,
  setTransitionCandidate
) => {
  await Swal.fire({
    title: "Hapus Kandidat ?",
    text: "Menghapus data kandidat lama menyebabkan hasil voting yang di dapatkannya terhapus",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${APP_URL}/candidates/${event_id}/${user_id}`, {
          headers: {
            Authorization: `Bearer ${ACTIVE_USER.token}`,
          },
        })
        .then(() => {
          setTransitionCandidate(false);
          setTimeout(() => {
            setTransitionCandidate(true);
          }, 500);
          values.splice(index, 1);
          setCandidate(values);
        });
    }
  });
};

export const httpStoreVote = async (form, navigate) => {
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
  try {
    const vote = await axios.post(`${APP_URL}/votes`, form, {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    });
    navigate("/events");
    Toast.fire({
      icon: "success",
      title: vote.data.message,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Aksi Gagal",
      text: err.response.data.message,
    });
  }
};

export const httpGetMyVoteIndex = async () => {
  const myVote = await axios.get(`${APP_URL}/isMyVoted`, {
    headers: {
      Authorization: `Bearer ${ACTIVE_USER.token}`,
    },
  });
  return myVote.data;
};

export const httpGetMyVoteShow = async (id) => {
  try {
    const myVoteShow = await axios.get(`${APP_URL}/isMyVoted/${id}`, {
      headers: {
        Authorization: `Bearer ${ACTIVE_USER.token}`,
      },
    });
    return myVoteShow.data;
  } catch (error) {
    console.log(error);
  }
};
