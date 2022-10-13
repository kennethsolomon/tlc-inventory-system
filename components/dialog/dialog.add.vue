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
          <!-- {{ hasIcon.modal.title }} -->
          <!-- <v-icon @click="closeModal" color="white">mdi-close</v-icon> -->
        </v-card-title>
        <v-card-text class="pa-5"> testing data </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    fields: Array,
  },
  data: () => ({}),
  methods: {},
  mounted() {
    console.log(this.fields);
  },
};
</script>

<style scoped></style>
