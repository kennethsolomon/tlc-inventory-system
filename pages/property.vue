<template>
  <Tab
    :tab_name="tab_name"
    :table_data="table_data"
    :table_headers="table_headers"
    :buttons="buttons"
  />
</template>

<script>
export default {
  data: () => ({
    // TAB
    tab_name: ["All Property", "Consumable", "Non-Consumable"],
    table_headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    table_data: [
      [
        {
          tab_name: "All Property",
          data: [
            {
              fname: "Kenneth",
              mname: "Lim",
              lname: "Solomon",
            },
            {
              fname: "Kenneth",
              mname: "Lim",
              lname: "Solomon",
            },
            {
              fname: "Kenneth",
              mname: "Lim",
              lname: "Solomon",
            },
          ],
        },
      ],
      [
        {
          tab_name: "Consumable",
          data: [
            {
              fname: "Testing Data",
              mname: "Testing Data2",
              lname: "Testing Data3",
            },
          ],
        },
      ],
      [
        {
          tab_name: "Non-Consumable",
          data: [
            {
              fname: "Testing Dat4",
              mname: "Testing Data5",
              lname: "Testing Data 6",
            },
          ],
        },
      ],
    ],
    buttons: {
      add: {
        color: "primary",
        btn_name: "Add Property",
        icon: "mdi-cash-check",
        // modal data
        modal: {
          title: "Testing modal add",
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
              name: "first_item",
              title: "First Item",
              rules: "required",
              type: "text",
            },
          ],

          button: {
            color: "primary",
            btn_name: "Add Property Button",
            icon: "mdi-cash-check",
          },
        },
      },
      edit: {
        color: "warning",
        btn_name: "Add Property",
        icon: "mdi-cash-check",
      },
      delete: {
        color: "error",
        btn_name: "Add Property",
        icon: "mdi-cash-check",
      },
    },
    // END TAB
  }),
};
</script>

<style scoped></style>
