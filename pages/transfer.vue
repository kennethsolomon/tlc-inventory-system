<template>
  <v-row class="container fluid">
    <v-col cols="6">
      <v-autocomplete
        v-model="form.values"
        :items="items"
        dense
        chips
        small-chips
        label="Property List"
        multiple
        solo
        item-text="property_code"
        return-object
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
    </v-col>
    <v-col cols="6">
      <v-card class="pa-3">
        <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
          <form class="d-flex flex-column" @submit.prevent="onSubmit">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="item_data"
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
              name="transaction_no"
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
              name="condition"
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
              name="transfer_type"
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

            <p class="font-weight-black">II. Borrower's Information</p>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="received_by"
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
              name="borrower_designation"
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
              name="borrower_agency"
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
              name="received_from"
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
              name="lender_designation"
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
              name="lender_agency"
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
              name="approved_by"
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
              name="approver_designation"
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
  }),
  methods: {
    onSubmit() {
      console.log(this.form);
    },
  },
  mounted() {
    this.items = this.$store.state.items.items.data;
    console.log(this.$store.state.items.items.data);
  },
};
</script>

<style scoped></style>
