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
      @stocks="stocks"
      @template="propertyTemplateData"
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
            <v-icon left>mdi-plus</v-icon>
            Add Property
          </v-btn>

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
            prepend-inner-icon="mdi-filter"
          ></v-select>

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

          <PropertyTemplate
            v-if="property_template_dialog === true"
            :property_template_dialog="property_template_dialog"
            :property_template_data="property_template_data"
            @form="formSave"
            @closeModal="property_template_dialog = false"
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

          <StocksProperty
            v-if="stocks_property_dialog === true"
            :dialog="stocks_property_dialog"
            title="Stocks Property"
            end_point="update_or_create_item"
            :stocks_data="stocks_data"
            @closeModal="stocks_property_dialog = false"
            @confirmStocks="confirmStocks"
          />
        </div>
      </template>
    </Tab>
  </div>
</template>

<script>
import AddProperty from "../components/property/dialog.add.property.vue";
import EditProperty from "../components/property/dialog.edit.property.vue";
import PropertyTemplate from "../components/property/dialog.template.property.vue";
import DeleteProperty from "../components/dialog/dialog.delete.vue";
import StocksProperty from "../components/property/dialog.stocks.property.vue";
export default {
  components: {
    AddProperty,
    EditProperty,
    PropertyTemplate,
    DeleteProperty,
    StocksProperty,
  },
  data: () => ({
    edit_data: null,
    property_template_data: null,
    delete_data: null,
    stocks_data: null,
    group_by: "",
    select: { name: "", text: "" },
    items: [
      { name: "", text: "" },
      { name: "property_name", text: "Property Name" },
      { name: "purchaser", text: "Purchaser" },
      { name: "property_code", text: "Property Code" },
      { name: "description", text: "Description" },
    ],
    overlay: false,
    // TAB
    add_property_dialog: false,
    edit_property_dialog: false,
    property_template_dialog: false,
    delete_property_dialog: false,
    stocks_property_dialog: false,
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
      { text: "Stocks", value: "stocks" },
      { text: "Actions", value: "actions" },
      { text: "Template", value: "template" },
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
    propertyTemplateData(data) {
      let form_data = { ...data };
      let property_template = {
        type: form_data.type,
        property_name: form_data.property_name,
        purchaser: form_data.purchaser,
        property_code: form_data.property_code,
        assigned_person_id: form_data.assigned_person_id,
        item_category_id: form_data.item_category_id,
        item_status_id: form_data.item_status_id,
        location_id: form_data.location_id,
        received_by_id: form_data.received_by_id,
        received_from_id: form_data.received_from_id,
        item_category_info: form_data.item_category_info,
        description: form_data.description,
        quantity: 0,
        cost: 0,
      };
      this.property_template_data = property_template;
      this.property_template_dialog = true;
    },
    editData(data) {
      let form_data = { ...data };
      this.edit_data = form_data;
      console.log(form_data);
      this.edit_property_dialog = true;
    },
    stocks(data) {
      this.stocks_data = data;
      this.stocks_property_dialog = true;
    },
    confirmStocks(data) {
      let index = this.getIndex(
        this.$store.state.items.items.data,
        data.data.id
      );

      this.table_data[0][0].data.splice(index, 1, data.data);

      this.$store.commit("SET_ITEMS", this.table_data[0][0]);

      this.getItem();

      this.$toast.success("Stocks updated successfully.");
    },
    deleteData(data) {
      this.delete_data = data;
      this.delete_property_dialog = true;
    },
    confirmDelete(data) {
      let index = this.getIndex(this.$store.state.items.items.data, data.id);

      this.table_data[0][0].data.splice(index, 1);

      this.$store.commit("SET_ITEMS", this.table_data[0][0]);

      this.getItem();
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
          this.property_template_dialog = false;
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
