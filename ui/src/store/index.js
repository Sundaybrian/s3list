import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordings: {
      Contents: [],
      isTruncated: "",
      Marker: "",
    },
    roles: [],
    loader: false,
    isSearching: false,
    modalState: {
      value: false,
      message: "",
      color: "#C2185B",
    },
    user: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setLoading(state, payload) {
      state.loader = payload;
    },

    toggleModal(state, payload) {
      state.modalState = {
        value: !state.modalState.value,
        ...payload,
      };
    },
    toggleSearch(state, payload) {
      state.isSearching = payload;
    },

    setRecordings(state, payload) {
      state.recordings = payload;
    },
  },
  actions: {
    isLoading({ commit }, payload) {
      commit("setLoading", payload);
    },

    toggleModal({ commit }, message) {
      commit("toggleModal", message);
    },

    toggleSearch({ commit }, payload) {
      commit("toggleSearch", payload);
    },
    async getRecordings({ commit }, payload) {
      const { limit = 100, nextPage = "", search = "" } = payload;
      const url = `?limit=${limit}&nextPage=${nextPage}&search=${search}`;
      let { data } = await axios.get("/claimflux" + url);

      commit("setRecordings", data);
    },
  },
  getters: {
    rolesPresent: (state) => state.roles.length > 0,
    getUser: (state) => state.user,
    getRecordings: (state) => state.recordings["Contents"] || [],
  },
  modules: {},
});
