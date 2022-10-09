<template>
  <Form :fields="fields" :button="button" @values="save" />
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
        type: "text",
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
  },
};
</script>
