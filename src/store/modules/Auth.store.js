import { api } from "boot/axios";
import { Notify } from "quasar";

const state = {
  isLoggedIn: false,
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  token: null,
};

const mutations = {
  SET_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
};

const actions = {
  login({ commit, dispatch }, credential) {
    return new Promise((resolve, reject) => {
      const access = {
        grant_type: "password",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        ...credential,
      };
      api
        .post("/oauth/token", access)
        .then((res) => {
          const token = res.data;
          api.defaults.headers.common.Accept = "application/json";
          api.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
          dispatch("getUser")
            .then((res2) => {
              commit("SET_TOKEN", token);
              commit("SET_LOGGED_IN", true);
              commit("SET_USER", res2.data);
              resolve(token);
            })
            .catch((err) => {
              Notify.create({
                type: "negative",
                message: "Anda tidak memiliki akses ke halaman ini",
                position: "top-right",
                timeout: 5000,
              });
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .get("/api/admin/user")
        .then((res) => {
          const user = res.data;
          commit("SET_USER", user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_LOGGED_IN", false);
      commit("SET_USER", {
        id: null,
        name: null,
        email: null,
        avatar: null,
      });
      commit("SET_TOKEN", null);
      resolve();
    });
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
  token: (state) => state.token,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
