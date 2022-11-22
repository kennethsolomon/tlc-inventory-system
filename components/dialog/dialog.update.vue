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
            @values="values"
            @submit="update"
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
    action: String, // for api call
    dialog: Boolean,
    title: String,
    id: Number,
    fields: Array,
    button: Object,
  },
  data: () => ({
    form: null,
  }),
  methods: {
    values(form) {
      this.form = form;
      this.form.id = this.id;
    },
    async update() {
      this.$store
        .dispatch(this.action, this.form)
        .then((result) => {
          this.$toast.success("Successfully Updated!");
          this.$emit("callBack");
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
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
