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
            <!-- Consumable -->
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
                <template v-slot:item.view_more="{ item }">
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
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      items: ["Property"],
      properties: [],
      employees: [],
      // check_out_date: null,
      property_data: null,
      // stock_quantity: 0, // add stock
      add_dialog: false,
      search: null,

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
        { text: "View More", value: "view_more", sortable: false },
      ],
    };
  },

  methods: {
    async addDialog(item) {
      this.property_data = item;
      this.add_dialog = true;
    },
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
