<template>
  <div class="text-center">
    <v-dialog
      v-model="property_template_data"
      :width="$vuetify.breakpoint.xs ? '90vw' : '40vw'"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Template Property
          <v-icon @click="closeModal" color="white">mdi-close</v-icon>
        </v-card-title>

        <v-card-text class="pa-5">
          <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
            <form class="d-flex flex-column" @submit.prevent="onSubmit">
              <v-row>
                <v-col class="my-0 py-0" cols="12">
                  <Input
                    :valid="valid"
                    title="Type"
                    name="type"
                    type="radio"
                    rules="required"
                    :options="type"
                    :value="property_template_data.type"
                    @model="model($event, 'type')"
                  />
                </v-col>
                <v-col class="my-0 py-0" cols="12">
                  <Input
                    :valid="valid"
                    title="Property Name"
                    name="property_name"
                    type="combobox"
                    rules="required"
                    item_text="property_name"
                    :options="item.options"
                    :value="property_template_data.property_name"
                    @model="model($event, 'property_name')"
                  />
                </v-col>
                <v-col class="my-0 py-0" cols="12">
                  <Input
                    :valid="valid"
                    title="Purchaser"
                    name="purchaser"
                    type="radio"
                    rules="required"
                    :options="purchaser"
                    :value="property_template_data.purchaser"
                    @model="model($event, 'purchaser')"
                  />
                </v-col>
                <v-col class="my-0 py-0" cols="12">
                  <Input
                    :valid="valid"
                    title="Property Code"
                    name="property_code"
                    type="text"
                    rules="required"
                    :disabled="true"
                    :value="property_template_data.property_code"
                    @model="model($event, 'property_code')"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Category"
                    name="category"
                    type="autocomplete"
                    rules="required"
                    item_text="name"
                    item_value="id"
                    :hasIcon="category.hasIcon"
                    :options="category.options"
                    :value="property_template_data.item_category_info"
                    @model="model($event, 'category')"
                    @modalInput="addCategory"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Description"
                    row="1"
                    name="description"
                    type="textarea"
                    rules="required"
                    :value="property_template_data.description"
                    @model="model($event, 'description')"
                  />
                </v-col>

                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="
                      form.purchaser === 'Regional Office'
                        ? {
                            required: true,
                            regional_format: '^(ABCD - )[A-Za-z0-9]',
                          }
                        : { required: true }
                    "
                    name="Serial Number"
                  >
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="serial_number_edit"
                      name="serial_number"
                      label="Serial Number"
                      placeholder="Serial Number"
                      type="text"
                      :error-messages="errors"
                      :success="valid"
                      :value="form.serial_number"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
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
                    :value="property_template_data.location_info"
                    @model="model($event, 'location')"
                    @modalInput="addLocation"
                  />
                </v-col>
                <v-col cols="12">
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
                    :value="property_template_data.received_by_info"
                    @model="model($event, 'received_by')"
                    @modalInput="addEmployee"
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    :valid="valid"
                    title="Received From"
                    name="received_from"
                    type="autocomplete"
                    rules="required"
                    item_text="fullname"
                    item_value="id"
                    :options="received_by.options"
                    :value="property_template_data.received_from_info"
                    @model="model($event, 'received_from')"
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    :valid="valid"
                    title="Assigned Person"
                    name="assigned_person"
                    type="autocomplete"
                    rules="required"
                    item_text="fullname"
                    item_value="id"
                    :options="assigned_person.options"
                    :value="property_template_data.assigned_person_info"
                    @model="model($event, 'assigned_person')"
                  />
                </v-col>
                <v-col cols="12" lg="4" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Status"
                    name="status"
                    type="autocomplete"
                    rules="required"
                    item_text="name"
                    item_value="id"
                    :options="status.options"
                    :value="property_template_data.item_status_info"
                    @model="model($event, 'status')"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="6" xs="12">
                  <Input
                    :valid="valid"
                    title="Date Acquired"
                    name="date_acquired"
                    type="date"
                    rules="required"
                    :value="property_template_data.date_acquired"
                    @model="model($event, 'date_acquired')"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="6" xs="12">
                  <Input
                    :valid="valid"
                    title="Date Received"
                    name="date_received"
                    type="date"
                    rules="required"
                    :value="property_template_data.date_received"
                    @model="model($event, 'date_received')"
                  />
                </v-col>
                <v-col cols="12" lg="6" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Cost"
                    name="cost"
                    type="number"
                    rules="required"
                    :value="property_template_data.cost"
                    @model="model($event, 'cost')"
                  />
                </v-col>
                <v-col cols="12" lg="6" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Quantity"
                    name="quantity"
                    type="number"
                    rules="required"
                    :value="property_template_data.quantity"
                    @model="model($event, 'quantity')"
                  />
                </v-col>
                <v-col v-if="computeCost > 0" cols="12">
                  <v-alert type="success">
                    {{ $convertToCurrency(computeCost) }}
                  </v-alert>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" :disabled="invalid">
                  <v-icon class="mx-1"> mdi-content-save</v-icon>
                  Save Property
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
    property_template_dialog: Boolean,
    property_template_data: Object,
  },
  data: () => ({
    serial_number_edit: null,
    form: {
      serial_number: null,
      purchaser: null,
      cost: 0,
      quantity: 0,
    },
    item: {
      options: [],
    },
    type: [
      { label: "Consumable", value: "Consumable" },
      { label: "Non-Consumable", value: "Non-Consumable" },
    ],
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
    status: {
      options: [],
    },
  }),
  computed: {
    computeCost() {
      return this.form?.quantity * this.form?.cost;
    },
  },
  methods: {
    // Category API
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
    getCategory() {
      this.category.options =
        this.$store.state.item_categories.item_categories.data;
    },
    // End Category API

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
    // End Location API

    // Received By API
    addEmployee(form) {
      console.log(form);
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
    // End Location API

    getStatus() {
      this.status.options = this.$store.state.item_status.item_status.data;
    },

    getItem() {
      this.item.options = this.$store.state.items.items.data;
    },

    onSubmit() {
      this.form.serial_number = this.serial_number_edit;
      this.form.property_name =
        this.form.property_name.property_name ?? this.form.property_name;
      this.form.id = this.form.id;
      this.$emit("form", this.form, "add");
    },
    closeModal() {
      this.$emit("closeModal", false);
    },

    model(event, field) {
      this.form[field] = event;
    },
  },

  watch: {
    "form.purchaser": function (val) {
      if (val === "Regional Office" && !this.form.serial_number) {
        this.serial_number_edit = "ABCD - ";
      } else {
        this.serial_number_edit = this.form.serial_number;
      }
    },
  },
  mounted() {
    this.getCategory();
    this.getLocation();
    this.getEmployee();
    this.getStatus();
    this.getItem();
    if (this.property_template_data) {
      this.form = this.property_template_data;
    }
  },
};
</script>

<style scoped></style>
