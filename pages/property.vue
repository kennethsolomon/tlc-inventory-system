<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab> Consumable </v-tab>
      <v-tab> Non-Consumable </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <!-- Consumable -->
            <template>
              <v-data-table
                :headers="headers"
                :items="consumables"
                sort-by="property_code"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <!-- Add Dialog -->
                    <v-dialog v-model="add_dialog" max-width="500px">
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
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- End Add Dialog -->
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    class="primary mr-2"
                    fab
                    x-small
                    @click="addDialog(item)"
                  >
                    <v-icon dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn class="primary mr-2" fab x-small @click="item;">
                    <v-icon dark> mdi-minus </v-icon></v-btn
                  >
                </template>

                <template v-slot:no-data>
                  <h1>No Data found...</h1>
                </template>
              </v-data-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <!-- Non Consumable -->
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
      tab: null,
      items: ["Consumable", "Non-Consumable"],
      consumables: [],
      property_data: null,
      stock_quantity: 0, // add stock
      add_dialog: false,

      headers: [
        {
          text: "Property Code",
          align: "start",
          sortable: false,
          value: "property_code",
        },
        {
          text: "Property Name",
          value: "property_name",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Cost",
          value: "cost",
        },
        {
          text: "Quantity",
          value: "quantity",
        },
        {
          text: "Unit of Measure",
          value: "unit_of_measure",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    async addDialog(item) {
      this.property_data = item;
      this.add_dialog = true;
    },
    async addStock() {
      let data = {
        quantity: this.stock_quantity,
      };
      const consumable = await this.$axios
        .$post(`add_stock/${Number(this.property_data.id)}`, data)
        .then((result) => {
          this.add_dialog = false;
          this.stock_quantity = 0;
          this.getConsumables();
          this.$toast.success(
            `Quantity of ${this.property_data.property_name} has been successfully adusted.`
          );
        });
    },
    async getConsumables() {
      const item = await this.$axios.$get(`consumables`).then((result) => {
        console.log(result.data, "result");
        this.consumables = result.data;
      });
    },
  },
  mounted() {
    this.getConsumables();
  },
};
</script>
