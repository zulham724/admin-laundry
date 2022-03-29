import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";

const api = axios.create({ baseURL: API_URL });

export default boot(({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // membuat default header pada axios setiap baru buka aplikasi
  const token = store.getters["Auth/token"];
  if (token && token.access_token) {
    api.defaults.headers.common.Accept = "application/json";
    api.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
    store.dispatch("Auth/getUser");
  }
  //-------------------------------------------------------------

  //----------------------------------
  api.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.response.status == 401) {
        store.dispatch("Auth/logout").then((res) => {
          Notify.create("Silahkan login kembali");
        });
      }
    }
  );
  //-------------------------------------
});

export { axios, api };
