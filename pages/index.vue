<template>
  <Form
    :fields="fields"
    :button="button"
  />

</template>

<script>

    // button: Object, //color, btn_name, icon
    // fields: Array, //rules, name,title
export default {
  name: 'IndexPage',
  data: () => ({
    fields:
    [
      {
        name: 'first_item',
        title: 'First Item',
        rules: 'required',
        type: 'text',
      },
      {
        name: 'second_item',
        title: 'Second Item',
        rules: 'required',
        type: 'text',
      },

    ],
    button: {
      color: "success",
      btn_name: 'Save',
      icon: 'mdi-cash-check'
    }
  })
}
</script>
