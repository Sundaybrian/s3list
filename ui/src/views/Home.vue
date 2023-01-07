<template>
  <v-data-table
    :headers="headers"
    :items="recordings"
    sort-by="calories"
    class="elevation-1"
    :loading="loading"
    v-if="!hideFilesTables"
    :footer-props="{
      'items-per-page-options': [10, 20, 30, 40, 50, 100],
    }"
    :items-per-page="30"
    :loading-text="loading_text"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Claimflux Files</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon @click.prevent="fetchRecordings">
          <v-icon color="primary">mdi-file-refresh</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">{{
      formatDate(item.createdAt)
    }}</template>

    <template v-slot:[`item.updatedAt`]="{ item }">{{
      formatDate(item.updatedAt)
    }}</template>
    <template v-slot:[`item.progress`]="{ item }">
      <v-progress-linear
        :value="getPercentage(item)"
        color="blue-grey"
        height="25"
      >
        <template>
          <strong>{{ getPercentage(item) }}%</strong>
        </template>
      </v-progress-linear>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchRecordings"> Refresh </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import dayjs from "dayjs";
import lodash from "lodash";
export default {
  components: {},
  watch: {
    search() {
      this.loading_text = "Waiting for you to stop typing...";
      this.debouncedSearch();
    },
  },
  data: () => ({
    dialog: false,
    loading: false,
    hideFilesTables: false,
    dialogDelete: false,
    search: "",
    loading_text: "",
    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "Key",
      },
      { text: "Key", value: "Key" },
      { text: "Size", value: "Size" },
      { text: "updatedAt", value: "LastModified" },
    ],

    invoices: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    recordings() {
      const records = this.$store.getters["getRecordings"];
      return records;
    },
  },

  mounted() {
    this.fetchRecordings();
    this.debouncedSearch = lodash.debounce(this.fetchRecordings, 500);
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format("DD-MM-YYYY:HH:mm:ss:SSS");
    },

    getPercentage(item) {
      return Math.ceil((item.reportedCount / item.uploadedCount) * 100);
    },
    fetchRecordings() {
      console.log("hello");
      if (!this.search) this.$store.dispatch("getRecordings", {});

      this.$store.dispatch("getRecordings", {
        search: this.search,
      });
      this.loading_text = "";
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.recordings[this.editedIndex], this.editedItem);
      } else {
        this.recordings.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>