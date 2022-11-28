<template>
  <v-row class="container fluid">
    <v-col cols="12" lg="12" md="12" sm="12" xs="12">
      <v-card>
        <v-card-title>
          Loan List
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="destroyLoan(Number(item.id))">mdi-delete</v-icon>
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
    <v-col cols="12" lg="4" md="12" sm="12" xs="12">
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

            <p class="font-weight-black mt-5">I. Lender Information</p>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Lender Name"
            >
              <v-text-field
                label="Lender Name"
                hide-details="auto"
                v-model="form.lender_name"
                name="lender_name"
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
                label="Lender Agency"
                hide-details="auto"
                v-model="form.lender_agency"
                name="lender_agency"
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
                label="Lender Designation"
                hide-details="auto"
                v-model="form.lender_designation"
                name="lender_designation"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <p class="font-weight-black mt-5">II. Borrower's Information</p>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Borrower Name"
            >
              <v-text-field
                label="Borrower's Name"
                hide-details="auto"
                v-model="form.borrower_name"
                name="borrower_name"
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
                label="Borrower Agency"
                hide-details="auto"
                v-model="form.borrower_agency"
                name="borrower_agency"
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
                label="Borrower Designation"
                hide-details="auto"
                v-model="form.borrower_designation"
                name="borrower_designation"
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </ValidationProvider>

            <p class="font-weight-black mt-5">III. Inclusive Date of Loan</p>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Start Date"
            >
              <v-dialog
                ref="start_date_modal"
                v-model="start_date_modal"
                :return-value.sync="form.start_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="form.start_date"
                    name="start_date"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errors"
                    :success="valid"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.start_date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="start_date_modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.start_date_modal.save(form.start_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="End Date"
            >
              <v-dialog
                ref="end_date_modal"
                v-model="end_date_modal"
                :return-value.sync="form.end_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="form.end_date"
                    name="end_date"
                    label="End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errors"
                    :success="valid"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.end_date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="end_date_modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.end_date_modal.save(form.end_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Purpose of Loan"
            >
              <v-textarea
                v-model="form.purpose_of_loan"
                name="purpose_of_loan"
                label="Purpose of Loan"
                rows="2"
                :error-messages="errors"
                :success="valid"
              ></v-textarea>
            </ValidationProvider>

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

    <DeleteLoan
      v-if="delete_loan_dialog === true"
      :dialog="delete_loan_dialog"
      title="Delete Loan"
      end_point="delete_loan"
      :delete_data="delete_data"
      @closeModal="delete_loan_dialog = false"
      @confirmDelete="confirmDelete"
    />
  </v-row>
</template>

<script>
import DeleteLoan from "../components/dialog/dialog.delete.vue";
export default {
  middleware: "admin",
  components: {
    DeleteLoan,
  },
  data: () => ({
    delete_loan_dialog: false,
    delete_data: { id: null },
    start_date_modal: false,
    end_date_modal: false,
    transfer_type: ["Donation", "Relocate", "Others"],
    items: [],
    condition: ["New", "Used", "Damaged"],
    form: {
      item_data: [],
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
      { text: "LT Number", value: "transaction_no" },
      { text: "Property Count", value: "property_count" },
      { text: "Lender Name", value: "lender_name" },
      { text: "Borrower Name", value: "borrower_name" },
      { text: "Purpose of Loan", value: "purpose_of_loan" },
      { text: "Status", value: "condition" },
      { text: "Actions", value: "actions" },
    ],

    transactions: [],
  }),
  methods: {
    confirmDelete() {
      this.$toast.success(
        `Loan with ID ${this.delete_data.id} has been deleted successfully.`
      );

      this.getLoans();
    },
    destroyLoan(id) {
      this.delete_data.id = id;
      this.delete_loan_dialog = true;
    },
    onSubmit() {
      this.$store
        .dispatch("postLoanProperty", this.form)
        .then((result) => {
          this.$toast.success(
            `Loan Property with ${result.data.transaction_no} Transaction No. has been added successfully.`
          );

          this.$refs.observer.reset();

          this.form = {
            item_data: [],
            start_date: null,
          };
          this.getLoans();
          this.$store.dispatch("getItemList");
          this.$store.dispatch("getItems");
          this.items = this.$store.state.items.items.data.filter(
            (item) => item.transaction_status == null
          );
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    getLoans() {
      this.$store.dispatch("getLoans").then((result) => {
        this.transactions = result;
      });
    },
  },
  mounted() {
    this.getLoans();
    this.items = this.$store.state.items.items.data.filter(
      (item) => item.transaction_status == null
    );
  },
};
</script>

<style scoped></style>
