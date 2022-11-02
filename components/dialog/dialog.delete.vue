<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          {{ title }}
          <v-icon @click="$emit('closeModal')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-subtitle
                >Are you sure you want to delete this
                data?</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="100">
              <v-img src="trash.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="destroy()" color="primary">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    end_point: String, // for api call
    delete_data: Object,
    dialog: Boolean,
    title: String,
  },
  data: () => ({}),
  methods: {
    async destroy() {
      const data = await this.$axios
        .$delete(`${this.end_point}/${this.delete_data.id}`)
        .then((result) => {
          this.$emit("confirmDelete", result);
          this.$emit("closeModal");
        });
    },
  },
};
</script>

<style scoped></style>
