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
        <StocksProperty
          v-if="stocks_property_dialog === true"
          :dialog="stocks_property_dialog"
          title="Stocks Property"
          end_point="update_or_create_item"
          :stocks_data="stocks_data"
          @closeModal="stocks_property_dialog = false"
          @manageStocks="manageStocks"
        />
        <UpdateStocks
          v-if="update_stocks_dialog === true"
          :dialog="update_stocks_dialog"
          action="postItemList"
          title="Minus Stocks"
          :id="stocks_data"
          @closeModal="update_stocks_dialog = false"
          @callBack="minusStock()"
          :fields="minus_stock_fields"
          :button="minus_stock_button"
        />
      </template>
    </Tab>
  </div>
</template>

<script>
import AddProperty from "../components/property/dialog.add.property.vue";
import UpdateStocks from "../components/dialog/dialog.update.vue";
import PropertyTemplate from "../components/property/dialog.template.property.vue";
import DeleteProperty from "../components/dialog/dialog.delete.vue";
import StocksProperty from "../components/property/dialog.stocks.property.vue";
export default {
  middleware: "admin",
  components: {
    AddProperty,
    UpdateStocks,
    PropertyTemplate,
    DeleteProperty,
    StocksProperty,
  },
  data: () => ({
    update_stocks_dialog: false,
    group_by_description: false,
    edit_data: null,
    property_template_data: null,
    delete_data: null,
    stocks_data: null,
    group_by: "",
    select: { name: "", text: "" },
    minus_stock_button: {
      color: "primary",
      btn_name: "Save",
      icon: "mdi-content-save",
    },
    minus_stock_fields: [
      {
        cols: 1,
        name: "quantity",
        title: "Quantity",
        rules: "required",
        type: "text",
      },
    ],
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
      { text: "Quantity", value: "quantity" },
      { text: "Cost", value: "cost" },
      { text: "Manage Stocks", value: "stocks" },
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
      return this.$store.getters.getItemList.data.filter(
        (item) => item.type === "Consumable"
      );
    },
    nonConsumable() {
      return this.$store.getters.getItemList.data.filter(
        (item) => item.type === "Non-Consumable"
      );
    },
  },
  watch: {
    group_by_description: function (val) {
      let items = [
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
        { text: "Template", value: "template" },
        { text: "QR Code", value: "qr" },
      ];

      let item_list = [
        { text: "Property Name", align: "start", value: "property_name" },
        { text: "Description", value: "description" },
        { text: "Purchaser", value: "purchaser" },
        { text: "Quantity", value: "quantity" },
        { text: "Cost", value: "cost" },
      ];
      if (val) {
        this.table_headers = item_list;
        this.getItemList();
      } else {
        this.table_headers = items;
        this.getItem();
      }
    },
  },
  methods: {
    async minusStock() {
      this.update_stocks_dialog = false;
      await this.$store.dispatch("getItemList");
      this.getItemList();
    },
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
      if (data.type === "add") {
        this.stocks_data = data;
        this.stocks_property_dialog = true;
      } else if (data.type === "deduct") {
        this.update_stocks_dialog = true;
        this.stocks_data = Number(data.item.id);
      }
    },
    manageStocks(data, action) {
      this.$store.dispatch("postItem", data).then(async (result) => {
        await this.$store.dispatch("getItemList");
        if (action === "add") {
          this.getItemList();
        }

        this.stocks_property_dialog = false;
      });
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
      // this.getItemList();
    },
    selected(selected) {
      this.group_by = selected.name;
    },
    getItem() {
      this.overlay = true;

      this.table_data[0][0].data = this.$store.state.items.items.data;
      this.table_data[1][0].data = this.consumable;
      this.table_data[2][0].data = this.nonConsumable;

      this.overlay = false;
    },

    getItemList() {
      this.overlay = true;

      this.table_data[0][0].data = this.$store.state.item_list.item_list.data;
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
    this.$store.dispatch("getItemList").then(() => {
      this.getItemList();
    });
  },
};
</script>

<style scoped></style>
