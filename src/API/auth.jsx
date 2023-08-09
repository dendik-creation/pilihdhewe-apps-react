import axios from "axios";
import { ACTIVE_USER, APP_URL } from "../utils/constant";
import Swal from "sweetalert2";

export const Login = (credentials, navigate) => {
  axios
    .post(`${APP_URL}/auth/login`, credentials)
    .then((response) => {
      localStorage.setItem("credentials", JSON.stringify(response.data));
    })
    .then(() => {
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      if (credentials.user.role == "siswa") {
        window.location.reload();
        navigate("/events");
      } else {
        window.location.reload();
        navigate("/");
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response.data.message,
      });
    });
};

export const Logout = async () => {
  axios
    .post(
      `${APP_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${ACTIVE_USER.token}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem("credentials");
      window.location.reload();
    })
    .catch((err) => console.log(err));
};
