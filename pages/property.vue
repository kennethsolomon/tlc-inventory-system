<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
  </div>
</template>

<script>
import AddProperty from "../components/property/dialog.add.property.vue";
export default {
  components: {
    AddProperty,
  },
  data: () => ({
    overlay: false,
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
          data: [],
        },
      ],
      [
        {
          tab_name: "Consumable",
          data: [],
        },
      ],
      [
        {
          tab_name: "Non-Consumable",
          data: [],
        },
      ],
    ],
    // END TAB
  }),
  methods: {
    formSave(data) {
      this.$store.dispatch("addItem", data).then((result) => {
        this.$toast.success("Add New Property " + data.type + " successfully!");
        this.add_property_dialog = false;
      });
    },
    getItem() {
      let consumable = [];
      let non_consumable = [];

      this.$store
        .dispatch("getItem")
        .then(async (results) => {
          this.overlay = true;
          await results.forEach((result) => {
            if (result.get("type") === "Consumable") {
              consumable.push(result.attributes);
            } else {
              non_consumable.push(result.attributes);
            }
          });
          return true;
        })
        .then((boolean) => {
          const all_property = [...consumable];
          Array.prototype.push.apply(all_property, non_consumable);

          this.table_data[0][0].data = all_property;
          this.table_data[1][0].data = consumable;
          this.table_data[2][0].data = non_consumable;

          this.overlay = false;
        });
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>

<style scoped></style>
