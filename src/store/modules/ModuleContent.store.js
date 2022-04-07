import { api } from "src/boot/axios";

const state = {};

const mutations = {};

const actions = {
  deleteVideoContent({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .post(`api/admin/module-content/delete-video-content/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteImageContent({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .post(`api/admin/module-content/delete-image-content/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteThumbnailContent({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .post(`api/admin/module-content/delete-thumbnail-content/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editNewModuleContent({ commit }, formData) {
    return new Promise((resolve, reject) => {
      // const access = {
      //   _method: "PUT",
      //   ...formData,
      // };
      api
        .post(`api/admin/module-content/update-module-content/${formData.id}`, formData.formData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addNewModuleContent({ commit }, formData) {
    return new Promise((resolve, reject) => {
      api
        .post(`api/admin/module-content/add-new-module-content`, formData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteModuleContent({ commit }, id) {
    return new Promise((resolve, reject) => {
      const access = {
        _method: "DELETE",
      };
      api
        .post(`api/admin/module-content/${id}`, access)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getModuleContentById({ commit }, id) {
    return new Promise((resolve, reject) => {
      api
        .get(`api/admin/module-content/get-module-content-by-id/${id}`)
        .then((res) => {
          resolve(res);
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
