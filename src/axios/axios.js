import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken")
  }
  // withCredentials: true
});

/* instance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response => {
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  error => {
    if (error && error.response && error.response.status === 401) {
      localStorage.clear();
      setTimeout(() => {
        window.location.pathname = "/";
        window.location.reload();
      }, 2000);
    } else {
    }
    return Promise.reject(error);
  }
); */

export default axios;
