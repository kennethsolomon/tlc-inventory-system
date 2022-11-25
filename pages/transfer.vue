<template>
  <v-row class="container fluid">
    <v-col cols="8">
      <v-card>
        <v-card-title>
          Transaction List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="transactions" :search="search">
          <template v-slot:[`item.created_at`]="{ item }">
            <p>{{ item.created_at.split("T")[0] }}</p>
          </template>
          <template v-slot:[`item.property_count`]="{ item }">
            <p>{{ item.item_data.length }}</p>
          </template>
          <template v-slot:[`item.info`]="{ item }">
            <v-menu
              :close-on-content-click="false"
              open-on-hover
              :nudge-width="200"
              offset-y
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon style="cursor: pointer" color="primary"
                    >mdi-information</v-icon
                  >
                </span>
              </template>
              <v-card flat>
                <v-simple-table dense>
                  <template v-slot:default>
                    <h2 class="mx-3 my-3">Property List:</h2>
                    <divider></divider>
                    <tbody v-for="(item, index) in item.item_data" :key="index">
                      <th>Number</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Description</th>
                      <th>SN</th>
                      <th>Cost</th>
                      <th>Date Acquired</th>
                      <th>Date Received</th>
                      <th>Type</th>
                      <th>Purchaser</th>
                      <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.property_name }}</td>
                        <td>{{ item.property_code }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.serial_number }}</td>
                        <td>{{ item.cost }}</td>
                        <td>{{ item.date_acquired }}</td>
                        <td>{{ item.date_received }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.purchaser }}</td>
                      </tr>
                      <v-divider></v-divider>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="pa-3">
        <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
          <form class="d-flex flex-column" @submit.prevent="onSubmit">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Property List"
            >
              <v-autocomplete
                v-model="form.item_data"
                :items="items"
                dense
                chips
                small-chips
                label="Property List"
                multiple
                solo
                item-text="property_code"
                return-object
                name="item_data"
                :error-messages="errors"
                :success="valid"
              >
                <template v-slot:item="data">
                  <v-text-field
                    readonly
                    label="Date Acquired"
                    hide-details="auto"
                    :value="data.item.date_acquired"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    label="Property Code"
                    hide-details="auto"
                    :value="data.item.property_code"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    label="Description"
                    hide-details="auto"
                    :value="data.item.description"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    label="Amount"
                    hide-details="auto"
                    :value="data.item.cost"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    label="Category"
                    hide-details="auto"
                    :value="data.item.item_category_info.name"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    label="Purchaser"
                    hide-details="auto"
                    :value="data.item.purchaser"
                  ></v-text-field>
                </template>
              </v-autocomplete>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Transaction No."
            >
              <v-text-field
                label="Transaction No."
                hide-details="auto"
                v-model="form.transaction_no"
                name="transaction_no"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <p class="font-weight-black mt-5">I. Transfer Information</p>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Condition of PPE"
            >
              <v-select
                v-model="form.condition"
                :items="condition"
                label="Condition of PPE"
                name="condition"
                :error-messages="errors"
                :success="valid"
              ></v-select>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Transfer Type"
            >
              <v-select
                v-model="form.transfer_type"
                :items="transfer_type"
                label="Transfer Type"
                dense
                name="transfer_type"
                :error-messages="errors"
                :success="valid"
              ></v-select>
            </ValidationProvider>

            <v-text-field
              v-if="form.transfer_type === 'Others'"
              label="Transfer Type (Others)"
              hide-details="auto"
              v-model="form.transfer_type_others"
            ></v-text-field>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Reason for Transfer"
            >
              <v-textarea
                v-model="form.reason_for_transfer"
                name="reason_for_transfer"
                label="Reason for Transfer"
                rows="2"
                :error-messages="errors"
                :success="valid"
              ></v-textarea>
            </ValidationProvider>

            <p class="font-weight-black">II. Borrower's Information</p>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Received By"
            >
              <v-text-field
                label="Received by"
                hide-details="auto"
                v-model="form.received_by"
                name="received_by"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Borrower Designation"
            >
              <v-text-field
                label="Designation"
                hide-details="auto"
                v-model="form.borrower_designation"
                name="borrower_designation"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Borrower Agency"
            >
              <v-text-field
                label="Agency"
                hide-details="auto"
                v-model="form.borrower_agency"
                name="borrower_agency"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>
            <p class="font-weight-black mt-5">III. Lender's Information</p>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Received from"
            >
              <v-text-field
                label="Agency"
                hide-details="auto"
                v-model="form.received_from"
                name="received_from"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Lender Designation"
            >
              <v-text-field
                label="Designation"
                hide-details="auto"
                v-model="form.lender_designation"
                name="received_from"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Lender Agency"
            >
              <v-text-field
                label="Agency"
                hide-details="auto"
                v-model="form.lender_agency"
                name="lender_agency"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <p class="font-weight-black mt-5">IV. Approver's Information</p>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Approved by"
            >
              <v-text-field
                label="Approved by"
                hide-details="auto"
                v-model="form.approved_by"
                name="approved_by"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Designation"
            >
              <v-text-field
                label="Designation"
                hide-details="auto"
                v-model="form.approver_designation"
                name="approver_designation"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <div class="d-flex justify-end">
              <v-btn
                class="mt-3 align-self-end"
                type="submit"
                color="primary"
                :disabled="invalid"
              >
                <v-icon> mdi-content-save </v-icon>
                Save
              </v-btn>
            </div>
          </form>
        </ValidationObserver>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    transfer_type: ["Donation", "Relocate", "Others"],
    items: [],
    condition: ["New", "Used", "Damaged"],
    form: {
      item_data: [],
      transfer_type_others: null,
    },
    search: "",
    headers: [
      {
        text: "Info",
        align: "start",
        sortable: false,
        value: "info",
      },
      { text: "Transaction Date", value: "created_at" },
      { text: "PTR Number", value: "transaction_no" },
      { text: "Property Count", value: "property_count" },
      { text: "Transfer Type", value: "transfer_type" },
      { text: "Received Type", value: "received_by" },
      { text: "Received From", value: "received_from" },
      { text: "Approved By", value: "approved_by" },
      { text: "Status", value: "condition" },
      { text: "Actions", value: "actions" },
    ],

    transactions: [],
  }),
  methods: {
    onSubmit() {
      this.$store
        .dispatch("postTransferProperty", this.form)
        .then((result) => {
          this.$toast.success(
            `Transfer Property with ${result.data.transaction_no} Transaction No. has been added successfully.`
          );

          this.$refs.observer.reset();

          this.form = {
            item_data: [],
            transfer_type_others: null,
          };
          this.getTransactions();
          // this.$store.dispatch("getItemCategories");
          // this.category.options.push(result.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    getTransactions() {
      this.$store.dispatch("getTransactions").then((result) => {
        this.transactions = result;
      });
    },
  },
  mounted() {
    this.getTransactions();
    this.items = this.$store.state.items.items.data;
    // console.log(this.$store.state.items.items.data);

    // console.log(this.$store.state.items.transactions.data, "transactions");
  },
};
</script>

<style scoped></style>
