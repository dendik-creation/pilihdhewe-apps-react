import axios from "axios";
import { ACTIVE_USER, APP_URL } from "../utils/constant";
import Swal from "sweetalert2";

export const Login = (credentials, setLoading, setSuccess) => {
  setLoading(true);
  axios
    .post(`${APP_URL}/auth/login`, credentials)
    .then((response) => {
      localStorage.setItem("credentials", JSON.stringify(response.data));
    })
    .then(() => {
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      if (credentials.user.role == "siswa") {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/events";
        }, 2000);
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    })
    .catch((err) => {
      setLoading(false);
      setSuccess(false);
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
