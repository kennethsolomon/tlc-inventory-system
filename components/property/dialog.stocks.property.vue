<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          {{ title }}
          <v-icon @click="$emit('closeModal')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-5">
          <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
            <form class="d-flex flex-column" @submit.prevent="onSubmit">
              <Input
                :valid="valid"
                disabled="disabled"
                title="Type"
                name="type"
                type="radio"
                rules="required"
                :value="stocks_data.item.type"
                :options="type"
                @model="model($event, 'type')"
              />
              <Input
                :valid="valid"
                disabled="disabled"
                title="Purchaser"
                name="purchaser"
                type="radio"
                rules="required"
                :value="stocks_data.item.purchaser"
                :options="purchaser"
                @model="model($event, 'purchaser')"
              />
              <Input
                :valid="valid"
                disabled="disabled"
                title="Category"
                name="category"
                type="autocomplete"
                rules="required"
                item_text="name"
                item_value="id"
                :hasIcon="category.hasIcon"
                :options="category.options"
                :value="stocks_data.item.item_category_info"
                @model="model($event, 'category')"
                @modalInput="addCategory"
              />
              <!-- <Input
                :title="field_title"
                name="quantity"
                type="number"
                rules="required"
                :value="stocks_data.item.quantity"
                @model="model($event, 'quantity')"
              /> -->

              <ValidationProvider
                v-slot="{ errors }"
                :rules="
                  stocks_data.property_code === 'Regional Office'
                    ? {
                        required: true,
                        regional_format: '^(SRC-W-)[A-Za-z0-9]',
                      }
                    : { required: true }
                "
                name="Property Code"
              >
                <v-text-field
                  :disabled="!show_property_code"
                  class="pa-0 ma-0"
                  v-model="form.property_code"
                  name="property_code"
                  label="Property Code"
                  placeholder="Property Code"
                  type="text"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" name="Serial Number">
                <v-text-field
                  class="pa-0 ma-0"
                  v-model="form.serial_number"
                  name="serial_number"
                  label="Serial Number"
                  placeholder="Serial Number"
                  type="text"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>

              <Input
                :valid="valid"
                title="Location"
                name="location"
                type="autocomplete"
                rules="required"
                item_text="name"
                item_value="id"
                :hasIcon="location.hasIcon"
                :options="location.options"
                @model="model($event, 'location')"
                @modalInput="addLocation"
              />

              <Input
                :valid="valid"
                title="Received By"
                name="received_by"
                type="autocomplete"
                rules="required"
                item_text="fullname"
                item_value="id"
                :hasIcon="received_by.hasIcon"
                :options="received_by.options"
                @model="model($event, 'received_by')"
                @modalInput="addEmployee"
              />

              <Input
                :valid="valid"
                title="Received From"
                name="received_from"
                type="autocomplete"
                rules="required"
                item_text="fullname"
                item_value="id"
                :options="received_by.options"
                @model="model($event, 'received_from')"
              />

              <Input
                :valid="valid"
                title="Assigned Person"
                name="assigned_person"
                type="autocomplete"
                rules="required"
                item_text="fullname"
                item_value="id"
                :options="assigned_person.options"
                @model="model($event, 'assigned_person')"
              />

              <Input
                :valid="valid"
                title="Date Acquired"
                name="date_acquired"
                type="date"
                rules="required"
                @model="model($event, 'date_acquired')"
              />

              <Input
                :valid="valid"
                title="Date Received"
                name="date_received"
                type="date"
                rules="required"
                @model="model($event, 'date_received')"
              />

              <ValidationProvider v-slot="{ errors }" name="Status">
                <v-autocomplete
                  class="pa-0 ma-0"
                  v-model="form.status"
                  :items="status.options"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  name="status"
                  :disabled="show_type"
                  :error-messages="errors"
                  :success="valid"
                ></v-autocomplete>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Quantity"
              >
                <v-text-field
                  :disabled="!show_quantity"
                  class="pa-0 ma-0"
                  v-model="form.quantity"
                  name="quantity"
                  label="Quantity"
                  placeholder="Quantity"
                  type="number"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" :disabled="invalid">
                  <v-icon class="mx-1"> mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    end_point: String, // for api call
    stocks_data: Object,
    dialog: Boolean,
    title: String,
  },
  data: () => ({
    show_type: false,
    show_property_code: false,
    show_quantity: true,
    field_title: null,
    data: null,
    form: {
      item_status_id: null,
      property_name: null,
      action: null,
      type: null,
      serial_number: null,
      purchaser: null,
      cost: 0,
      quantity: 1,
      property_code: null,
    },
    status: {
      options: [],
    },
    type: [
      { label: "Consumable", value: "Consumable" },
      { label: "Non-Consumable", value: "Non-Consumable" },
    ],
    received_by: {
      options: [],
      hasIcon: {
        status: true,
        icon: "mdi-account",
        modal: {
          title: "Received By",
          fields: [
            {
              cols: 1,
              name: "fname",
              title: "First Name",
              rules: "required",
              type: "text",
            },
            {
              cols: 1,
              name: "mname",
              title: "Middle Name",
              type: "text",
            },
            {
              cols: 1,
              name: "lname",
              title: "Last Name",
              rules: "required",
              type: "text",
            },
            {
              cols: 1,
              name: "office",
              title: "Office",
              rules: "required",
              type: "text",
            },
          ],
          button: {
            color: "success",
            btn_name: "Save",
            icon: "mdi-content-save",
          },
        },
      },
    },
    received_from: {
      options: [],
    },
    assigned_person: {
      options: [],
    },

    location: {
      options: [],
      hasIcon: {
        status: true,
        icon: "mdi-map-marker-plus-outline",
        modal: {
          title: "Location",
          fields: [
            {
              cols: 1,
              name: "name",
              title: "Location",
              rules: "required",
              type: "text",
            },
          ],
          button: {
            color: "success",
            btn_name: "Save",
            icon: "mdi-content-save",
          },
        },
      },
    },
    purchaser: [
      {
        label: "Provincial Office",
        value: "Provincial Office",
      },
      { label: "Regional Office", value: "Regional Office" },
    ],
    category: {
      options: [],
      hasIcon: {
        status: true,
        icon: "mdi-folder-multiple-outline",
        modal: {
          title: "Add Category",
          fields: [
            {
              cols: 1,
              name: "name",
              title: "Category",
              rules: "required",
              type: "text",
            },
          ],
          button: {
            color: "success",
            btn_name: "Save",
            icon: "mdi-content-save",
          },
        },
      },
    },
  }),
  methods: {
    onSubmit() {
      this.form.assigned_person_id = Number(this.form.assigned_person);
      this.form.item_category_id = Number(this.form.category.id);
      this.form.received_by_id = Number(this.form.received_by);
      this.form.received_from_id = Number(this.form.received_from);
      this.stocks_data.item.type === "Consumable"
        ? (this.form.item_status_id = Number(this.form.status))
        : (this.form.item_status_id = null);

      this.form.location_id = Number(this.form.location);
      this.form.type = this.stocks_data.item.type;
      this.form.action = this.stocks_data.type;
      this.form.purchaser = this.stocks_data.item.purchaser;
      this.form.cost = this.stocks_data.item.cost;
      this.form.property_name = this.stocks_data.item.property_name;
      this.form.description = this.stocks_data.item.description;

      this.$emit("manageStocks", this.form, "add");
    },

    getStatus() {
      this.status.options = this.$store.state.item_status.item_status.data;
    },
    // Location API
    addLocation(form) {
      this.$store
        .dispatch("postLocation", form)
        .then((result) => {
          this.$toast.success(
            `Location ${result.data.name} has been added successfully.`
          );
          this.$store.dispatch("getLocations");
          this.location.options.push(result.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    getLocation() {
      this.location.options = this.$store.state.locations.locations.data;
    },
    addCategory(form) {
      this.$store
        .dispatch("postItemCategory", form)
        .then((result) => {
          this.$toast.success(
            `Category ${result.data.name} has been added successfully.`
          );
          this.$store.dispatch("getItemCategories");
          this.category.options.push(result.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    // getCategory() {
    //   this.category.options =
    //     this.$store.state.item_categories.item_categories.data;
    // },

    addEmployee(form) {
      this.$store
        .dispatch("postEmployee", form)
        .then((result) => {
          this.$toast.success(
            `Employee ${result.data.fullname} has been added successfully.`
          );
          this.$store.dispatch("getEmployees");
          this.received_by.options.push(result.data);
          this.received_from.options.push(result.data);
          this.assigned_person.options.push(result.data);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    getEmployee() {
      this.received_by.options = this.$store.state.employees.employees.data;
      this.received_from.options = this.$store.state.employees.employees.data;
      this.assigned_person.options = this.$store.state.employees.employees.data;
    },
    async stocks() {
      if (
        this.data.quantity < this.form.quantity &&
        this.stocks_data.type === "deduct"
      ) {
        this.$toast.error("Not Enought Stock/Stocks.");
      } else {
        this.data.quantity =
          this.stocks_data.type === "deduct"
            ? (this.data.quantity -= this.form.quantity)
            : (this.data.quantity += this.form.quantity);

        this.stocks_data.type === "deduct"
          ? (this.data.action = "deduct")
          : null;

        await this.$axios
          .$post(`update_or_create_item`, this.data)
          .then((result) => {
            this.$emit("confirmStocks", result);
            this.$emit("closeModal");
          });
      }
    },

    model(event, field) {
      this.form[field] = event;
    },
  },

  watch: {
    "form.type": function (val) {
      console.log(val);
      if (val === "Consumable") {
        this.show_type = true;
      } else {
        console.log(val);
        this.show_type = false;
      }
    },
    "form.purchaser": function (val) {
      if (val === "Regional Office") {
        this.form.quantity = 1;
        this.show_quantity = false;
        this.show_property_code = true;
        this.form.property_code = "SRC-W-" + new Date().getFullYear() + "-";
      } else {
        this.show_quantity = true;
        this.show_property_code = false;
        this.form.property_code = "PO-" + new Date().getFullYear() + "-";
      }
    },
  },
  mounted() {
    this.data = this.stocks_data.item;
    this.field_title =
      this.stocks_data.action === "deduct" ? "Deduct Quantity" : "Add Quantity";

    this.getCategory();
    this.getEmployee();
    this.getLocation();
    this.getStatus();
    console.log(this.stocks_data.item.item_category_id);
  },
};
</script>

<style scoped></style>
