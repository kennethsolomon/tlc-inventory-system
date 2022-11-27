<template>
  <v-card>
    <v-card-title>
      Trash Data
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-autocomplete
          v-model="value"
          class="mx-5"
          append-icon="mdi-filter-menu"
          :items="table"
          chips
          small-chips
          label="Select Table"
          solo
        ></v-autocomplete>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:[`item.created_at`]="{ item }">
        <p>{{ item.created_at.split("T")[0] }}</p>
      </template>
      <template v-slot:[`item.deleted_at`]="{ item }">
        <p>{{ item.deleted_at.split("T")[0] }}</p>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="restore(Number(item.id))">mdi-backup-restore</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    table: ["Transaction", "Loan", "Property"],
    value: "Transaction",
    search: "",
    items: [],
    headers: [],
  }),
  watch: {
    value: function (val) {
      switch (val) {
        case "Transaction":
          this.transferData();
          break;
        case "Loan":
          this.loanData();
          break;
        case "Property":
          this.itemData();
          break;
        default:
        // code block
      }
    },
  },
  methods: {
    restore(id) {
      switch (this.value) {
        case "Transaction":
          this.$store.dispatch("restoreTransaction", id).then((result) => {
            this.$store.dispatch("getTransactionTrash");
            this.transferData();
            this.$toast.success("Successfully Restored!");
          });
          break;
        case "Loan":
          this.$store.dispatch("restoreLoan", id).then((result) => {
            this.$store.dispatch("getLoanTrash");
            this.loanData();
            this.$toast.success("Successfully Restored!");
          });
          break;
        case "Property":
          this.$store.dispatch("restoreItem", id).then((result) => {
            this.$store.dispatch("getItemTrash");
            this.itemData();
            this.$toast.success("Successfully Restored!");
          });
          break;

        default:
          break;
      }
    },
    itemData() {
      this.headers = [
        { text: "Property Name", align: "start", value: "property_name" },
        { text: "Description", value: "description" },
        { text: "Purchaser", value: "purchaser" },
        { text: "Property Number", value: "property_code" },
        { text: "Serial Number", value: "serial_number" },
        { text: "Quantity", value: "quantity" },
        { text: "Cost", value: "cost" },
        { text: "Date Acquired", value: "date_acquired" },
        { text: "Date Received", value: "date_received" },
        { text: "Transaction Date", value: "created_at" },
        { text: "Deleted Date", value: "deleted_at" },
        { text: "Actions", value: "actions" },
      ];

      this.items = this.$store.getters.getItemTrash.data;
    },
    transferData() {
      this.headers = [
        { text: "Transaction Date", value: "created_at" },
        { text: "PTR Number", value: "transaction_no" },
        { text: "Transfer Type", value: "transfer_type" },
        { text: "Received Type", value: "received_by" },
        { text: "Received From", value: "received_from" },
        { text: "Approved By", value: "approved_by" },
        { text: "Status", value: "condition" },
        { text: "Deleted Date", value: "deleted_at" },
        { text: "Actions", value: "actions" },
      ];

      this.items = this.$store.getters.getTransactionTrash.data;
    },
    loanData() {
      this.headers = [
        { text: "Transaction Date", value: "created_at" },
        { text: "LT Number", value: "transaction_no" },
        { text: "Lender Name", value: "lender_name" },
        { text: "Borrower Name", value: "borrower_name" },
        { text: "Purpose of Loan", value: "purpose_of_loan" },
        { text: "Status", value: "condition" },
        { text: "Deleted Date", value: "deleted_at" },
        { text: "Actions", value: "actions" },
      ];

      this.items = this.$store.getters.getLoanTrash.data;
    },
  },
  mounted() {
    this.$store.dispatch("getItemTrash");
    this.$store.dispatch("getLoanTrash");
    this.$store.dispatch("getTransactionTrash");

    this.transferData();
  },
};
</script>
