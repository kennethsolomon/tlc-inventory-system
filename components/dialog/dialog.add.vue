<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '40vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          {{ title }}
          <v-icon @click="$emit('closeModal')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-5">
          <Form
            :fields="fields"
            :button="button"
            @values="save"
            @modalInput="saveModal"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    className: String, // for api call
    dialog: Boolean,
    title: String,
    fields: Array,
    button: Object,
  },
  data: () => ({}),
  methods: {
    save(test) {
      console.log(test, "add dialog save");
    },
    // Use if fields has icon modal
    saveModal(modal_data) {
      console.log(modal_data);
    },
  },
  mounted() {
    console.log(this.fields);
  },
};
</script>

<style scoped></style>
