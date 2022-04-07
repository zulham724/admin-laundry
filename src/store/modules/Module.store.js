import { api } from "src/boot/axios";

const state = {
    formModule: {
        tittle: "",
        description: "",
        contents: [],
        is_public: null,
    },
    tittle: "",
};

const mutations = {
    ADD_CONTENT(state, payload) {
        state.formModule.contents.push(payload);
    },
    UPDATE_FORM_MODULE(state, payload) {
        state.tittle = "asd";
        // state.formModule[payload.key] = payload.value;
    },
    CLEAR_FORM_MODULE(state) {
        state.formModule = {
            tittle: "",
            description: "",
            contents: [],
            is_public: null,
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
    deleteModuleImage({ commit }, id) {
        return new Promise((resolve, reject) => {
            api
                .post(`api/admin/module/delete-image-module/${id}`)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    uploadModuleImage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .post(
                    `api/admin/module/update-image-module/${payload.id}`,
                    payload.formData
                )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    getModuleById({ commit }, moduleId) {
        return new Promise((resolve, reject) => {
            api
                .get(`api/admin/module/get-module-by-id/${moduleId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    doUpdateFormModule({ commit }, payload) {
        commit("UPDATE_FORM_MODULE", JSON.parse(JSON.stringify(payload)));
    },
    getModules() {
        return new Promise((resolve, reject) => {
            api
                .get("/api/admin/module")
                .then((res) => {
                    resolve(res);
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
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    updateModule({ commit }, formData) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: "PUT",
                ...formData,
            };
            api
                .post(`/api/admin/module/${formData.id}`, access)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    deleteModule({ commit }, id) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: "DELETE",
            };
            api
                .post(`/api/admin/module/${id}`, access)
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