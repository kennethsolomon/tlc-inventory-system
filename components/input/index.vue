<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="title">
    <v-text-field
      v-if="type === 'text'"
      v-model="model"
      :name="name"
      :label="title"
      :placeholder="title"
      :type="type"
      :error-messages="errors"
      :success="valid"
    ></v-text-field>

    <v-autocomplete
      v-if="type === 'autocomplete'"
      v-model="model"
      :name="name"
      :items="options"
      :label="title"
      :error-messages="errors"
      :success="valid"
    ></v-autocomplete>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    title: String,
    name: String,
    rules: String,
    type: String,
    valid: Boolean,
    value: String,
    options: Array,
  },
  data: () => ({
    model: null,
  }),
  mounted() {
    if (this.value) this.model = this.value;
  },
};
</script>

<style scoped></style>
