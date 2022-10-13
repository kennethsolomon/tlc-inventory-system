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
      @click:append-outer="modal(true)"
      :error-messages="errors"
      :success="valid"
    ></v-autocomplete>

    <DialogAddIcon
      v-if="hasIcon?.status === true && dialog === true"
      :hasIcon="hasIcon"
      :dialog="dialog"
      @modal="modal"
      @values="modalInput"
    />
  </ValidationProvider>
</template>

<script>
import DialogAddIcon from "../dialog/dialog.add.icon.vue";
export default {
  props: {
    title: String,
    name: String,
    rules: String,
    type: String,
    valid: Boolean,
    value: String,
    options: Array,
    hasIcon: Object, // status, icon, data {fields(Array){Object} rules, title, type; button{Object} color, btn_name, icon }
  },
  components: {
    DialogAddIcon,
  },
  data: () => ({
    model: null,
    dialog: false,
  }),
  watch: {
    model: function (val) {
      this.$emit("model", val);
    },
  },
  methods: {
    modal(status) {
      this.dialog = status;
    },
    modalInput(data) {
      this.$emit("modalInput", data);
    },
  },
  mounted() {
    if (this.value) this.model = this.value;
  },
};
</script>

<style scoped></style>
