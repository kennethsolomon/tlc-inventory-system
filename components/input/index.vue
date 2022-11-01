<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules ? rules : ''"
    :name="title"
  >
    <!-- SAMPLE TEXT
    :valid="valid"
    title="Property Code"
    name="property_code"
    type="password"
    rules="required"
    @model="model($event, 'property_code')" -->
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

    <!-- SAMPLE Password
    :valid="valid"
    title="Property Code"
    name="property_code"
    type="text"
    rules="required"
    @model="model($event, 'property_code')" -->
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

    <!-- SAMPLE Number
    :valid="valid"
    title="Property Code"
    name="property_code"
    type="number"
    rules="required"
    @model="model($event, 'property_code')" -->
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

    <!-- SAMPLE TEXTAREA
    :valid="valid"
    title="Description"
    row="1"
    name="description"
    type="textarea"
    rules="required"
    @model="model($event, 'description')" -->
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

    <!-- AUTOCOMPLETE
    :valid="valid"
    title="Category"
    name="category"
    type="autocomplete"
    rules="required"
    :hasIcon="category.hasIcon"
    :options="category.options"
    @model="model($event, 'category')" -->
    <v-autocomplete
      class="pa-0 ma-0"
      v-if="type === 'autocomplete'"
      v-model="model"
      :name="name"
      :items="options"
      :item-text="item_text"
      :item-value="item_value"
      :label="title"
      :append-outer-icon="hasIcon?.status === true ? hasIcon?.icon : ''"
      @click:append-outer="modal(true)"
      :error-messages="errors"
      :success="valid"
    ></v-autocomplete>

    <!-- SAMPLE COMBOBOX
    :valid="valid"
    title="Property Name"
    name="property_name"
    type="combobox"
    rules="required"
    :options="['Kenneth', 'Lim']"
    @model="model($event, 'property_name')" -->
    <v-combobox
      class="pa-0 ma-0"
      v-if="type === 'combobox'"
      v-model="model"
      :name="name"
      :items="options"
      :item-text="item_text"
      :item-value="item_value"
      :label="title"
      :error-messages="errors"
      :success="valid"
    ></v-combobox>

    <!-- SAMPLE RADIO
    :valid="valid"
    title="Type"
    name="type"
    type="radio"
    rules="required"
    :options="type"
    @model="model($event, 'type')" -->
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

    <!-- title -->
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
    value: [String, Object, Number],
    options: Array,
    row: String, // for textarea
    hasIcon: Object, // status, icon, data {fields(Array){Object} rules, title, type; button{Object} color, btn_name, icon }
    item_text: String, // use for autocomplete and combobox
    item_value: String, // use for autocomplete and combobox
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
