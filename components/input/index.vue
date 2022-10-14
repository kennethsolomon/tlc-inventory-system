<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="title">
    <v-text-field
      class="pa-0 ma-0"
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
      class="pa-0 ma-0"
      v-if="type === 'text'"
      v-model="model"
      :name="name"
      :label="title"
      :placeholder="title"
      :type="type"
      :error-messages="errors"
      :success="valid"
    ></v-text-field>

    <v-text-field
      class="pa-0 ma-0"
      v-if="type === 'number'"
      v-model.number="model"
      :name="name"
      :label="title"
      :placeholder="title"
      :type="type"
      :error-messages="errors"
      :success="valid"
    ></v-text-field>

    <v-textarea
      class="pa-0 ma-0"
      v-if="type === 'textarea'"
      v-model="model"
      :name="name"
      :label="title"
      :rows="row"
      :error-messages="errors"
      :success="valid"
    ></v-textarea>

    <v-autocomplete
      class="pa-0 ma-0"
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

    <v-combobox
      class="pa-0 ma-0"
      v-if="type === 'combobox'"
      v-model="model"
      :name="name"
      :items="options"
      :label="title"
      :error-messages="errors"
      :success="valid"
    ></v-combobox>

    <div class="pa-0 ma-0" v-if="type === 'radio'">
      <div class="text-overline">{{ title }}</div>
      <v-radio-group
        class="pa-0 ma-0"
        v-model="model"
        :name="name"
        :error-messages="errors"
        :success="valid"
        row
      >
        <v-radio
          v-for="(option, index) in options"
          :key="index"
          :label="option.label"
          :value="option.value"
        ></v-radio>
      </v-radio-group>
    </div>

    <v-dialog
      v-if="type === 'date'"
      ref="dialog"
      v-model="date_modal"
      :return-value.sync="model"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          class="pa-0 ma-0"
          v-model="model"
          :label="title"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :error-messages="errors"
          :success="valid"
        ></v-text-field>
      </template>
      <v-date-picker v-model="model" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="date_modal = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(model)">
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>

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
    row: String, // for textarea
    hasIcon: Object, // status, icon, data {fields(Array){Object} rules, title, type; button{Object} color, btn_name, icon }
  },
  components: {
    DialogAddIcon,
  },
  data: () => ({
    model: null,
    dialog: false,
    date_modal: false,
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
      this.options.push(Object.values(data)[0]);
      this.$emit("modalInput", data);
    },
  },
  mounted() {
    if (this.value) this.model = this.value;
    if (this.type === "date")
      this.model = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
  },
};
</script>

<style scoped></style>
