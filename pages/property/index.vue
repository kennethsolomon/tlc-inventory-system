<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>

    <!-- <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab> Consumable </v-tab>
    </v-tabs> -->

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search ..."
              single-line
              hide-details
              class="mb-2"
            ></v-text-field>
            <template>
              <v-data-table
                :headers="headers"
                :items="properties"
                :search="search"
                sort-by="property_code"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>

                    <v-btn
                      @click="showTransferDialog({}, 'add')"
                      class="primary mr-2"
                      medium
                    >
                      <v-icon class="mr-2" dark> mdi-plus </v-icon>Add
                      Property</v-btn
                    >
                    <!-- Add Dialog -->
                    <!-- <v-dialog v-model="add_dialog" max-width="500px">
                      <v-card>
                        <v-card-title
                          class="d-flex justify-space-between text-h5 primary white--text"
                        >
                          Add Stocks
                          <v-icon @click="add_dialog = false" color="white"
                            >mdi-close</v-icon
                          >
                        </v-card-title>
                        <v-card-text class="d-flex flex-column justify-center">
                          <div>
                            <v-text-field
                              hide-details
                              type="number"
                              v-model="stock_quantity"
                              label="Stock Quantity"
                              placeholder="Stock Quantity"
                              required
                            ></v-text-field>
                          </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="addStock()" color="primary">
                            <v-icon small class="mr-1">
                              mdi-content-save-check</v-icon
                            >
                            Add
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog> -->
                    <!-- End Add Dialog -->
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    class="primary mr-2"
                    fab
                    x-small
                    @click="showTransferDialog(item, 'edit')"
                  >
                    <v-icon dark> mdi-pencil </v-icon></v-btn
                  >
                  <v-btn
                    class="primary mr-2"
                    fab
                    x-small
                    @click="$router.push(`/property/${item.id}`)"
                  >
                    <v-icon dark> mdi-eye-outline </v-icon></v-btn
                  >
                  <!-- <v-btn
                    class="primary mr-2"
                    fab
                    x-small
                    @click="checkOutDialog(item)"
                  >
                    <v-icon dark> mdi-minus </v-icon></v-btn
                  > -->
                </template>

                <template v-slot:no-data>
                  <h1>No Data Found ...</h1>
                </template>
              </v-data-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- NOTE: Add Dialog -->
    <v-dialog v-model="add_property.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Property
          <v-icon @click="closeDialog()" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.brand"
                label="Brand"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.model"
                label="Model"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.category"
                label="Category"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.description"
                label="Description"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.property_code"
                label="Property Code"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.serial_number"
                label="Serial Number"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-dialog
                ref="property_purchase_date"
                :return-value.sync="add_property.purchase_date"
                persistent
                width="290px"
                v-model="add_property.date_modal"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Purchase Date"
                    hide-details
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    v-model="add_property.purchase_date_date"
                  ></v-text-field>
                </template>
                <v-date-picker
                  scrollable
                  v-model="add_property.purchase_date_date"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="add_property.date_modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.property_purchase_date.save(
                        add_property.purchase_date_date
                      )
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.warranty_period"
                label="Warranty Period"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Transfer Date
          <!-- Treat return-velue.sync as model because its the value choosen after you click save, while the v-model is reactive to what you click inside the calendar.  -->
          <!-- <v-dialog
            ref="add_property"
            :return-value.sync="add_property.transfer_date"
            persistent
            width="290px"
            v-model="add_property.date_modal"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-3"
                label="Date of Transfer"
                hide-details
                readonly
                v-bind="attrs"
                v-on="on"
                v-model="add_property.transfer_date_date"
              ></v-text-field>
            </template>
            <v-date-picker scrollable v-model="add_property.transfer_date_date">
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="add_property.date_modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.add_property.save(add_property.transfer_date_date)
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog> -->
          <!-- <v-text-field
            v-model="add_property.assigned_to"
            label="Assigned To"
            hide-details
            class="py-3"
          ></v-text-field>
          <v-text-field
            v-model="add_property.location"
            label="Location"
            hide-details
            class="py-3"
          ></v-text-field> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addProperty()" color="primary">
            <v-icon start small class="mr-1"> mdi-plus</v-icon>
            {{ checkMode }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      items: ["Property"],
      properties: [],
      property_data: null,
      // stock_quantity: 0, // add stock
      search: null,

      add_property: {
        id: null,
        mode: null,
        dialog: false,
        date_modal: false,
        purchase_date_date: null,

        // Form
        brand: null,
        model: null,
        category: null,
        description: null,
        property_code: null,
        serial_number: null,
        purchase_date: null,
        warranty_period: null,
      },

      //Checkout Dialog
      // date_modal: false,
      // agency_list: ["DICT", "Sample 1"],
      // check_out_dialog: false,
      // check_out_data: {
      //   received_by_id: null,
      //   agency: null,
      //   quantity: null,
      //   date: null,
      // },
      headers: [
        {
          text: "Property Code",
          align: "start",
          sortable: false,
          value: "property_code",
        },
        {
          text: "Brand",
          value: "brand",
        },
        {
          text: "Model",
          value: "model",
        },
        {
          text: "Category",
          value: "category",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Location",
          value: "location",
        },
        {
          text: "Assigned To",
          value: "assigned_to",
        },
        {
          text: "Status",
          value: "status",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    checkMode() {
      if (this.add_property.mode == "add") {
        return "Add Property";
      } else {
        return "Edit Property";
      }
    },
  },

  methods: {
    closeDialog() {
      this.add_property = {
        dialog: false,
        date_modal: false,
        purchase_date_date: null,
        mode: null,

        // Form
        id: null,
        brand: null,
        model: null,
        category: null,
        description: null,
        property_code: null,
        serial_number: null,
        purchase_date: null,
        warranty_period: null,
      };
    },
    showTransferDialog(item, mode) {
      if (mode == "edit") {
        console.log("edit");
        this.add_property.mode = "edit";
        this.add_property.id = item.id;
        this.add_property.dialog = true;
        this.add_property.brand = item.brand;
        this.add_property.model = item.model;
        this.add_property.category = item.category;
        this.add_property.description = item.description;
        this.add_property.property_code = item.property_code;
        this.add_property.serial_number = item.serial_number;
        this.add_property.purchase_date = item.purchase_date;
        this.add_property.purchase_date_date = item.purchase_date;
        this.add_property.warranty_period = item.warranty_period;
      } else if (mode == "add") {
        console.log("add");
        this.add_property.mode = "add";
        this.add_property.dialog = true;
      }
    },
    async addProperty() {
      await this.$axios
        .$post(`update_or_create_property`, this.add_property)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${this.add_property.property_code} has been successfully edited.`
          );

          this.add_property = {
            dialog: false,
            date_modal: false,
            purchase_date_date: null,

            // Form
            id: null,
            brand: null,
            model: null,
            category: null,
            description: null,
            property_code: null,
            serial_number: null,
            purchase_date: null,
            warranty_period: null,
          };

          this.add_property.dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getProperties();
    },
    // async addDialog(item) {
    //   this.property_data = item;
    //   this.add_dialog = true;
    // },
    // async addStock() {
    //   let data = {
    //     quantity: this.stock_quantity,
    //   };
    //   const consumable = await this.$axios
    //     .$post(`add_stock/${Number(this.property_data.id)}`, data)
    //     .then((result) => {
    //       this.add_dialog = false;
    //       this.stock_quantity = 0;
    //       this.getConsumables();
    //       this.$toast.success(
    //         `Quantity of ${this.property_data.property_name} has been successfully adusted.`
    //       );
    //     })
    //     .catch((error) => {
    //       this.$toast.error(error.response.data.message);
    //     });
    // },

    // Checkout
    // async checkOutDialog(item) {
    //   this.property_data = item;
    //   this.check_out_dialog = true;
    // },
    // async checkOut() {
    //   const checkout = await this.$axios
    //     .$post(
    //       `check_out/${Number(this.property_data.id)}`,
    //       this.check_out_data
    //     )
    //     .then((result) => {
    //       this.check_out_dialog = false;

    //       this.check_out_data = {
    //         received_by_id: null,
    //         agency: null,
    //         quantity: null,
    //         date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //           .toISOString()
    //           .substr(0, 10),
    //       };

    //       this.check_out_date = new Date(
    //         Date.now() - new Date().getTimezoneOffset() * 60000
    //       )
    //         .toISOString()
    //         .substr(0, 10);

    //       this.getConsumables();
    //       this.$toast.success(
    //         `Checkout of ${this.property_data.property_name} has been successfully saved.`
    //       );
    //     })
    //     .catch((error) => {
    //       this.$toast.error(error.response.data.message);
    //     });
    // },

    // Datas
    async getProperties() {
      const properties = await this.$axios.$get(`properties`).then((result) => {
        this.properties = result.data;
      });
    },
    // async getEmployees() {
    //   const employees = await this.$axios.$get(`employees`).then((result) => {
    //     this.employees = result.data;
    //   });
    // },
  },
  mounted() {
    this.getProperties();
    // this.check_out_date = new Date(
    //   Date.now() - new Date().getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .substr(0, 10);
    // this.check_out_data.date = new Date(
    //   Date.now() - new Date().getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .substr(0, 10);
  },
};
</script>
