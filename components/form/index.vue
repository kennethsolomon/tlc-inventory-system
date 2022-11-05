<template>
  <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
    <form class="d-flex flex-column" @submit.prevent="onSubmit">
      <v-row>
        <v-col
          class="ma-0 pa-2"
          v-for="field in fields"
          :key="field.name"
          :cols="12 / field.cols"
        >
          <Input
            :valid="valid"
            :title="field.title"
            :name="field.name"
            :type="field.type"
            :rules="field.rules"
            :value="field?.value"
            :hasIcon="field?.hasIcon"
            :disabled="field?.disabled"
            :row="field?.row"
            :options="field?.options"
            @model="model($event, field.name)"
            @modalInput="modalInput"
          />
        </v-col>
      </v-row>
      <v-btn
        class="mt-3 align-self-end"
        type="submit"
        :color="button.color"
        :disabled="invalid"
      >
        <v-icon class="ml-2">{{ button.icon }}</v-icon>
        {{ button.btn_name }}
      </v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  data: () => ({
    form: {},
  }),
  props: {
    button: Object, //color, btn_name, icon
    fields: Array, //rules, title, type
  },
  methods: {
    model(event, field) {
      this.form[field] = event;

      this.$emit("values", this.form);
    },
    onSubmit() {
      this.$emit("submit", this.form);
    },
    modalInput(data) {
      this.$emit("modalInput", data);
    },
  },
};
</script>

<style scoped></style>
