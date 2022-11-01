<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Tab
      :tab_name="tab_name"
      :table_data="table_data"
      :table_headers="table_headers"
      :group_by="group_by"
      @edit_data="editData"
    >
      <template v-slot:add_dialog>
        <div
          :class="
            $vuetify.breakpoint.xs
              ? 'd-flex flex-column'
              : 'd-flex align-center'
          "
        >
          <v-btn
            :class="$vuetify.breakpoint.xs ? 'mr-0' : 'mr-3'"
            @click="add_property_dialog = true"
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

          <EditProperty
            v-if="edit_property_dialog === true"
            :edit_property_dialog="edit_property_dialog"
            :edit_data="edit_data"
            @form="formSave"
            @closeModal="edit_property_dialog = false"
          />
          <v-select
            :style="
              $vuetify.breakpoint.xs ? 'max-width: 100%' : 'max-width: 7vw'
            "
            @change="selected"
            v-model="select"
            :items="items"
            hint="Group by"
            item-text="text"
            item-value="name"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </div>
      </template>
    </Tab>
  </div>
</template>

<script>
import AddProperty from "../components/property/dialog.add.property.vue";
import EditProperty from "../components/property/dialog.edit.property.vue";
export default {
  components: {
    AddProperty,
    EditProperty,
  },
  data: () => ({
    edit_data: null,
    group_by: "",
    select: { name: "", text: "" },
    items: [
      { name: "", text: "" },
      { name: "purchaser", text: "Purchaser" },
    ],
    overlay: false,
    // TAB
    add_property_dialog: false,
    edit_property_dialog: false,
    tab_name: ["All Property", "Consumable", "Non-Consumable"],
    table_headers: [
      { text: "Property Name", align: "start", value: "property_name" },
      { text: "Description", value: "description" },
      { text: "Purchaser", value: "purchaser" },
      { text: "Property Number", value: "property_code" },
      { text: "Serial Number", value: "serial_number" },
      { text: "Quantity", value: "quantity" },
      { text: "Cost", value: "cost" },
      { text: "Date Acquired", value: "date_acquired" },
      { text: "Date Received", value: "date_received" },
      { text: "Actions", value: "actions" },
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
  computed: {
    consumable() {
      return this.$store.state.items.items.data.filter(
        (item) => item.type === "Consumable"
      );
    },
    nonConsumable() {
      return this.$store.state.items.items.data.filter(
        (item) => item.type === "Non-Consumable"
      );
    },
  },
  methods: {
    editData(data) {
      this.edit_data = data;
      this.edit_property_dialog = true;
    },
    selected(selected) {
      this.group_by = selected.name;
    },
    formSave(data) {
      console.log(data);
      this.$store.dispatch("postItem", data).then((result) => {
        this.$toast.success("Add New Property " + data.type + " successfully!");
        this.add_property_dialog = false;
      });
    },
    getItem() {
      this.overlay = true;

      const all_property = this.$store.state.items.items.data;
      this.table_data[0][0].data = this.$store.state.items.items.data;
      this.table_data[1][0].data = this.consumable;
      this.table_data[2][0].data = this.nonConsumable;

      this.overlay = false;
    },
  },
  mounted() {
    this.getItem();
    console.log(this.$store.state.items);
  },
};
</script>

<style scoped></style>
