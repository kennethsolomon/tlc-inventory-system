<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.xs ? '80vw' : '30vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          {{ hasIcon.modal.title }}
          <v-icon @click="closeModal" color="white">mdi-close</v-icon>
        </v-card-title>

        <v-card-text class="pa-5">
          <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
            <form class="d-flex flex-column" @submit.prevent="onSubmit">
              <v-row>
                <v-col
                  v-for="field in hasIcon.modal.fields"
                  :key="field.name"
                  :cols="12 / field.cols"
                >
                  <Input
                    :valid="valid"
                    :title="field.title"
                    :name="field.name"
                    :type="field.type"
                    :rules="field.rules"
                    :hasIcon="field?.hasIcon"
                    :options="field?.options"
                    @model="model($event, field.name)"
                  />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  :color="hasIcon.modal.button.color"
                  :disabled="invalid"
                >
                  <v-icon class="mx-1">
                    {{ hasIcon?.modal?.button?.icon }}</v-icon
                  >
                  {{ hasIcon?.modal?.button?.btn_name }}
                </v-btn>
              </v-card-actions>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    hasIcon: Object,
  },
  data: () => ({
    form: {},
  }),
  methods: {
    model(event, field) {
      this.form[field] = event;
    },
    onSubmit() {
      this.$emit("values", this.form);
      this.$emit("modal", false);
    },
    closeModal() {
      this.$emit("modal", false);
    },
  },
};
</script>

<style scoped></style>
