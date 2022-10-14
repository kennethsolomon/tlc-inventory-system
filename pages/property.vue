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
          title: "Add Property",
          fields: [
            {
              cols: 1,
              name: "type",
              title: "Type:",
              rules: "required",
              type: "radio",
              options: [
                { label: "Consumable", value: "Consumable" },
                { label: "Non-Consumable", value: "Non-Consumable" },
              ],
            },

            {
              cols: 1,
              name: "property_name",
              title: "Property Name",
              rules: "required",
              type: "combobox",
              options: ["foo", "bar", "fizz", "buzz"],
            },

            {
              cols: 1,
              name: "purchaser",
              title: "Purchaser:",
              rules: "required",
              type: "radio",
              options: [
                { label: "Provincial Office", value: "Provincial Office" },
                { label: "Regional Office", value: "Regional Office" },
              ],
            },

            {
              cols: 1,
              name: "property_code",
              title: "Property Code",
              rules: "required",
              type: "text",
            },

            {
              cols: 2,
              name: "category",
              title: "Category",
              rules: "required",
              type: "autocomplete",
              hasIcon: {
                status: true,
                icon: "mdi-map-marker-plus-outline",
                modal: {
                  title: "Add Category",
                  fields: [
                    {
                      cols: 1,
                      name: "category",
                      title: "Category",
                      rules: "required",
                      type: "text",
                    },
                  ],
                  button: {
                    color: "success",
                    btn_name: "Save Category",
                    icon: "mdi-cash-check",
                  },
                },
              },
              options: ["ken", "lim", "solomon"],
            },

            {
              cols: 2,
              name: "description",
              title: "Description",
              rules: "required",
              row: "1",
              type: "textarea",
            },

            {
              cols: 1,
              name: "serial_number",
              title: "Serial Number",
              rules: "required",
              type: "text",
            },

            {
              cols: 1,
              name: "location",
              title: "Location",
              rules: "required",
              type: "autocomplete",
              hasIcon: {
                status: true,
                icon: "mdi-map-marker-plus-outline",
                modal: {
                  title: "Add Location",
                  fields: [
                    {
                      cols: 1,
                      name: "location",
                      title: "Location",
                      rules: "required",
                      type: "text",
                    },
                  ],
                  button: {
                    color: "success",
                    btn_name: "Save Location",
                    icon: "mdi-cash-check",
                  },
                },
              },
              options: ["ken", "lim", "solomon"],
            },

            {
              cols: 1,
              name: "received_by",
              title: "Received By",
              rules: "required",
              type: "autocomplete",
              hasIcon: {
                status: true,
                icon: "mdi-map-marker-plus-outline",
                modal: {
                  title: "Received By",
                  fields: [
                    {
                      cols: 1,
                      name: "received_by",
                      title: "Received By",
                      rules: "required",
                      type: "text",
                    },
                  ],
                  button: {
                    color: "success",
                    btn_name: "Save Location",
                    icon: "mdi-cash-check",
                  },
                },
              },
              options: ["ken", "lim", "solomon"],
            },

            {
              cols: 1,
              name: "received_from",
              title: "Received From",
              rules: "required",
              type: "autocomplete",
              options: ["ken", "lim", "solomon"],
            },

            {
              cols: 1,
              name: "assigned_person",
              title: "Assigned Person",
              rules: "required",
              type: "autocomplete",
              options: ["ken", "lim", "solomon"],
            },

            {
              cols: 1,
              name: "status",
              title: "Status",
              rules: "required",
              type: "autocomplete",
              options: ["active", "expired", "test"],
            },

            {
              cols: 1,
              name: "date_acquired",
              title: "Date Acquired",
              rules: "required",
              type: "date",
            },

            {
              cols: 1,
              name: "date_received",
              title: "Date Received",
              rules: "required",
              type: "date",
            },

            {
              cols: 1,
              name: "cost",
              title: "Cost",
              rules: "required",
              type: "number",
            },

            {
              cols: 1,
              name: "quantity",
              title: "Quantity",
              rules: "required",
              type: "number",
            },
          ],

          button: {
            color: "primary",
            btn_name: "Add Property",
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
