<template>
  <Form
    :fields="fields"
    :button="button"
    @values="save"
    @modalInput="saveModal"
  />
</template>

<script>
// button: Object, //color, btn_name, icon
// fields: Array, //rules, name,title
export default {
  name: "IndexPage",
  middleware: "authUser",
  data: () => ({
    fields: [
      {
        cols: 1,
        name: "first_item",
        title: "First Item",
        rules: "required",
        type: "text",
      },
      {
        cols: 1,
        name: "second_item",
        title: "Second Item",
        rules: "required",
        type: "text",
      },
      {
        cols: 2,
        name: "third_item",
        title: "Third Item",
        rules: "required",
        type: "password",
      },
      {
        cols: 2,
        name: "radio",
        title: "Radio Test",
        rules: "required",
        type: "radio",
        options: [
          { label: "Consumable", value: "Consumable" },
          { label: "Non-Consumable", value: "Non-Consumable" },
        ],
      },
      {
        cols: 2,
        name: "test_icon",
        title: "test_icon",
        rules: "required",
        type: "autocomplete",
        hasIcon: {
          status: true,
          icon: "mdi-map-marker-plus-outline",
          modal: {
            title: "Nested Data",
            fields: [
              {
                cols: 1,
                name: "nested",
                title: "Nested Item",
                rules: "required",
                type: "text",
              },
              {
                cols: 1,
                name: "nested2",
                title: "Nested Item2",
                rules: "required",
                type: "text",
              },
              {
                cols: 2,
                name: "nested3",
                title: "Nested Item3",
                rules: "required",
                type: "text",
              },
              {
                cols: 2,
                name: "nested4",
                title: "Nested Item4",
                rules: "required",
                type: "text",
              },
            ],
            button: {
              color: "success",
              btn_name: "Save",
              icon: "mdi-cash-check",
            },
          },
        },
        options: ["ken", "lim", "solomon"],
      },
      {
        cols: 2,
        name: "fourth_item",
        title: "Fourth Item",
        rules: "required",
        type: "autocomplete",
        options: ["foo", "bar", "fizz", "buzz"],
      },
    ],
    button: {
      color: "success",
      btn_name: "Save",
      icon: "mdi-cash-check",
    },
  }),
  methods: {
    save(test) {
      console.log(test);
    },
    saveModal(modal_data) {
      console.log(modal_data);
    },
  },
};
</script>
