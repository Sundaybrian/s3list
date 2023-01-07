<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog.value"
      >
        <template>
          <v-card>
            <v-toolbar :color="dialog.color" dark>Hello There</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-8">{{ dialog.message }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="closeModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    dialog() {
      return this.$store.state.modalState;
    },
  },

  methods: {
    closeModal() {
      this.$store.dispatch("toggleModal", {
        value: false,
        message: "",
        color: "#C2185B",
      });
    },
  },
};
</script>