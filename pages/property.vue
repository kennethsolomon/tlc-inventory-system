<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Tab
      :tab_name="tab_name"
      :table_data="table"
      :table_headers="table_headers"
      :group_by="group_by"
      @edit_data="editData"
      @destroy_data="deleteData"
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

          <DeleteProperty
            v-if="delete_property_dialog === true"
            :dialog="delete_property_dialog"
            title="Delete Property"
            end_point="delete_item"
            :delete_data="delete_data"
            @closeModal="delete_property_dialog = false"
            @confirmDelete="confirmDelete"
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
import DeleteProperty from "../components/dialog/dialog.delete.vue";
export default {
  components: {
    AddProperty,
    EditProperty,
    DeleteProperty,
  },
  data: () => ({
    edit_data: null,
    delete_data: null,
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
    delete_property_dialog: false,
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
    table() {
      return this.table_data;
    },
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
      let form_data = { ...data };
      this.edit_data = form_data;
      this.edit_property_dialog = true;
    },
    deleteData(data) {
      this.delete_data = data;
      this.delete_property_dialog = true;
    },
    confirmDelete(data) {
      let index = this.getIndex(this.$store.state.items.items.data, data.id);

      this.table_data[0][0].data.splice(index, 1);
    },
    selected(selected) {
      this.group_by = selected.name;
    },
    formSave(data, action) {
      this.$store.dispatch("postItem", data).then((result) => {
        this.$store.dispatch("getItems");

        if (action === "add") {
          this.$toast.success(
            "Add New Property " + data.type + " successfully!"
          );

          if (data.type === "Consumable") {
            this.table_data[1][0].data.push(data);
          } else if (data.type === "Non-Consumable") {
            this.table_data[2][0].data.push(data);
          }

          // All Property
          this.table_data[0][0].data.push(data);

          this.add_property_dialog = false;
        } else if (action === "edit") {
          this.$toast.success("Edit Property " + data.type + " successfully!");

          let index = this.getIndex(
            this.$store.state.items.items.data,
            result.data.id
          );

          this.table_data[0][0].data.splice(index, 1, result.data);

          this.$store.commit("SET_ITEMS", this.table_data[0][0]);

          this.edit_property_dialog = false;

          this.getItem();
        }
      });
    },
    getItem() {
      this.overlay = true;

      this.table_data[0][0].data = this.$store.state.items.items.data;
      this.table_data[1][0].data = this.consumable;
      this.table_data[2][0].data = this.nonConsumable;

      this.overlay = false;
    },
    getIndex(array, id) {
      const index = array.map((e) => e.id).indexOf(id);

      return index;
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>

<style scoped></style>
