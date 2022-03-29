import { api } from "src/boot/axios";

const state = {
  formModule: {
    tittle: "",
    description: "",
    contents: [],
  },
};

const mutations = {
  ADD_CONTENT(state, payload) {
    state.formModule.contents.push(payload);
  },
  UPDATE_FORM_MODULE(state, payload) {
    state.formModule[payload.key] = payload.value;
  },
  RESET_FORM_MODULE(state) {
    state.formModule = {
      contents: [],
    };
  },
  REMOVED_CONTENT(state, payload) {
    let index = state.formModule.contents.findIndex(
      (item) => item.key === payload.key
    );
    if (index > -1) {
      state.formModule.contents.splice(index, 1);
    }
  },
  UPDATE_CONTENT(state, payload) {
    let index = state.formModule.contents.findIndex(
      (item) => item.key === payload.key
    );
    if (index > -1) {
      state.formModule.contents[index] = payload.content;
    }
  },
};

const actions = {
  getModules() {
    return new Promise((resolve, reject) => {
      api
        .get("/api/admin/module")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  storeModule({ commit }, formData) {
    return new Promise((resolve, reject) => {
      api
        .post("/api/admin/module", formData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateModule({ commit }, formData) {
    return new Promise((resolve, reject) => {
      api
        .put("/api/admin/module", formData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteModule({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .delete("/api/admin/module/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  formModule: (state) => state.formModule,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
