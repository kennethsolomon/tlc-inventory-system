<template>
  <Tab
    :tab_name="tab_name"
    :table_data="table_data"
    :table_headers="table_headers"
  >
    <template v-slot:add_dialog>
      <v-btn
        @click="add_property_dialog = true"
        class="ma-2"
        tile
        color="primary"
        :width="$vuetify.breakpoint.xs ? '100%' : ''"
      >
        <v-icon left>mdi-close</v-icon>
        Add Property
      </v-btn>

      <AddProperty
        v-if="add_property_dialog === true"
        :add_property_dialog="add_property_dialog"
        @form="formSave"
        @closeModal="add_property_dialog = false"
      />
    </template>
  </Tab>
</template>

<script>
import AddProperty from "../components/property/dialog.add.property.vue";
export default {
  components: {
    AddProperty,
  },
  data: () => ({
    // TAB
    add_property_dialog: false,
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
    // END TAB
  }),
  methods: {
    formSave(data) {
      console.log("property page", data);
    },
  },
};
</script>

<style scoped></style>
