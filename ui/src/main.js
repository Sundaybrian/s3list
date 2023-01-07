import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import config from "./config";
import vuetify from "./plugins/vuetify";


axios.defaults.baseURL = config["BACKEND_SERVICE"];
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const isSearching = store.state.isSearching;

    if (isSearching) return config;
    store.dispatch("isLoading", true);
    return config;
  },
  function (error) {
    store.dispatch("isLoading", false).then(() => {
      store.dispatch(
        "toggleModal",
        error.response.data.message || error.message || error
      );
    });
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch("isLoading", false);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(JSON.stringify(error, null, 3));
    // redirect to 401.vue
    if (
      error.response &&
      (error.response.status == "401" || error.response.status == "403")
    ) {
      router.replace({
        name: "401",
      });
    }

    store.dispatch("isLoading", false).then(() => {
      store.dispatch("toggleModal", {
        message: error.response.data.message || error.message || error,
      });
    });

    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
