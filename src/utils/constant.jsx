export const APP_URL = import.meta.env.VITE_AUTH_API_BASEURL;
export const PUBLIC_URL = import.meta.env.VITE_GUEST_API_BASEURL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const ACTIVE_USER = JSON.parse(localStorage.getItem("credentials"));
