<template>
  <v-app id="inspire">
    <Drawer :drawer.sync="drawer" />
    <v-app-bar dark app color="rgb(33,59,148)">
      <v-app-bar-nav-icon @click="toggledrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Claim Flux</v-toolbar-title>
      <v-btn to="/" icon class="ml-2">
        <v-icon> mdi-file-upload </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!--  -->
      <v-container fluid>
        <router-view></router-view>
        <Loader />
        <Modal />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Drawer from "@/components/Drawer.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Drawer,
    Loader,
    Modal,
  },
  mounted() {
    // const user = localStorage.getItem("mambuUser");
    // if (!user) {
    //   this.$router.push({
    //     name: "401",
    //   });
    // }
    this.$store.dispatch("getRecordings");
  },
  data: () => ({ drawer: true }),
  methods: {
    toggledrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>