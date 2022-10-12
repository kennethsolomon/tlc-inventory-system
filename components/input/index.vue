<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="title">
    <v-text-field
      v-if="type === 'password'"
      v-model="model"
      :name="name"
      :label="title"
      :placeholder="title"
      :type="type"
      :error-messages="errors"
      :success="valid"
    ></v-text-field>

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
      :append-outer-icon="hasIcon?.status === true ? hasIcon?.icon : ''"
      @click:append-outer="showModal"
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
    hasIcon: Object,
  },
  data: () => ({
    model: null,
  }),
  watch: {
    model: function (val) {
      this.$emit("model", val);
    },
  },
  methods: {
    showModal() {
      console.log("show modal");
    },
  },
  mounted() {
    if (this.value) this.model = this.value;
  },
};
</script>

<style scoped></style>
