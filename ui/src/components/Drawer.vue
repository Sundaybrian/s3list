<template>
  <v-navigation-drawer app v-model="drawerLocal">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Claim flux</v-list-item-title>
        <v-list-item-subtitle> Claim flux</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],

  computed: {
    isAdmin() {
      return this.$store.getters["isAdmin"];
    },

    items() {
      if (this.isAdmin) {
        return this.itemsAdmin;
      }

      return this.itemsNormal;
    },
    drawerLocal: {
      get() {
        return this.drawer;
      },

      set(val) {
        this.$emit("update:drawer", val);
      },
    },
  },
  data() {
    return {
      itemsAdmin: [
        { title: "claimflux", icon: "mdi-file", to: "/" },
      ],
      itemsNormal: [
        { title: "claimflux", icon: "mdi-file", to: "/" },
      ],
      right: null,
    };
  },
};
</script>