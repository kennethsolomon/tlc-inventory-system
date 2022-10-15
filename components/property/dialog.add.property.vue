<template>
  <div class="text-center">
    <v-dialog
      v-model="add_property_dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '40vw'"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Add Property
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
                    :options="['Kenneth', 'Lim']"
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
                    :hasIcon="category.hasIcon"
                    :options="category.options"
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
                      v-model="form.serial_number"
                      name="serial_number"
                      label="Serial Number"
                      placeholder="Serial Number"
                      type="text"
                      :error-messages="errors"
                      :success="valid"
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
                    :hasIcon="location.hasIcon"
                    :options="location.options"
                    @model="model($event, 'location')"
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    :valid="valid"
                    title="Received By"
                    name="received_by"
                    type="autocomplete"
                    rules="required"
                    :hasIcon="received_by.hasIcon"
                    :options="received_by.options"
                    @model="model($event, 'received_by')"
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    :valid="valid"
                    title="Received From"
                    name="received_from"
                    type="autocomplete"
                    rules="required"
                    :options="received_by.options"
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
                    :options="assigned_person.options"
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
                    :options="status.options"
                    @model="model($event, 'status')"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <Input
                    :valid="valid"
                    title="Date Acquired"
                    name="date_acquired"
                    type="date"
                    rules="required"
                    @model="model($event, 'date_acquired')"
                  />
                </v-col>
                <v-col cols="12" lg="4" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Date Quantity"
                    name="date_quantity"
                    type="date"
                    rules="required"
                    @model="model($event, 'date_quantity')"
                  />
                </v-col>
                <v-col cols="12" lg="6" sm="12" xs="12">
                  <Input
                    :valid="valid"
                    title="Cost"
                    name="cost"
                    type="number"
                    rules="required"
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
                  Add Property

                  <v-icon class="mx-1"> mdi-close</v-icon>
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
    add_property_dialog: Boolean,
  },
  data: () => ({
    form: {
      serial_number: null,
      purchaser: null,
      cost: 0,
      quantity: 0,
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
        icon: "mdi-map-marker-plus-outline",
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
            icon: "mdi-cash-check",
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
          title: "Location Data",
          fields: [
            {
              cols: 1,
              name: "locaiton",
              title: "Location Item",
              rules: "required",
              type: "text",
            },
          ],
          button: {
            color: "success",
            btn_name: "Save",
            icon: "mdi-cash-check",
          },
        },
      },
    },
    received_by: {
      options: [],
      hasIcon: {
        status: true,
        icon: "mdi-map-marker-plus-outline",
        modal: {
          title: "Location Data",
          fields: [
            {
              cols: 1,
              name: "locaiton",
              title: "Location Item",
              rules: "required",
              type: "text",
            },
          ],
          button: {
            color: "success",
            btn_name: "Save",
            icon: "mdi-cash-check",
          },
        },
      },
    },
    received_from: {
      options: ["1", "3"],
    },
    assigned_person: {
      options: ["2", "4"],
    },
    status: {
      options: ["active", "expired"],
    },
  }),
  computed: {
    computeCost() {
      return this.form.quantity * this.form.cost;
    },
  },
  methods: {
    // Category API
    addCategory(form) {
      this.$store.dispatch("addCategory", form).then(
        function (result) {
          this.category.options.push({
            id: result.id,
            name: result.get("name"),
          });
          this.$toast.success("New Category has been added successfully.");
        }.bind(this),
        function (error) {
          this.$toast.error(error);
        }
      );
    },
    getCategory() {
      this.$store.dispatch("getCategory").then(
        function (result) {
          result.forEach((category) => {
            this.category.options.push({
              id: category.id,
              name: category.get("name"),
            });
          });
        }.bind(this),
        function (error) {
          this.$toast.error(error);
        }
      );
    },
    // End Category API
    onSubmit() {
      this.$emit("form", this.form);
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
      if (val === "Regional Office") {
        this.form.serial_number = "ABCD - ";
        console.log(this.form.serial_number);
      } else {
        this.form.serial_number = null;
      }
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>

<style scoped></style>
