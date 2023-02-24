<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab>Details</v-tab>
      <v-tab>Histories</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <!-- Details -->
            <template>
              <!-- <v-sheet width="400" class="mx-auto">
                <v-text-field value="test" label="Name" required></v-text-field>
                <v-text-field value="test" label="Name" required></v-text-field>
              </v-sheet> -->
              <template>
                <v-card
                  :loading="loading"
                  class="mx-auto my-12"
                  max-width="400"
                >
                  <v-card-item>
                    <div class="d-flex justify-space-between">
                      <div>
                        <v-card-title>{{
                          properties.property_code
                        }}</v-card-title>
                        <v-card-subtitle>
                          <span>{{ properties.serial_number }}</span>

                          <v-icon
                            color="error"
                            icon="mdi-fire-circle"
                            size="small"
                          ></v-icon>
                        </v-card-subtitle>
                      </div>
                      <div class="ma-5">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip
                              v-bind="attrs"
                              v-on="on"
                              :color="propertyStatus.color"
                              text-color="white"
                            >
                              <v-icon class="mr-1" start>
                                {{ propertyStatus.icon }}
                              </v-icon>
                              {{ properties.status }}
                            </v-chip>
                          </template>
                          <span>Status</span>
                        </v-tooltip>
                      </div>
                    </div>
                  </v-card-item>

                  <v-divider class="mx-4 mb-1"></v-divider>

                  <v-card-text>
                    <v-text-field
                      :value="properties.category"
                      label="Category"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="properties.description"
                      label="Descriptiopn"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="properties.brand"
                      label="Brand"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="properties.model"
                      label="Model"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="properties.purchase_date"
                      label="Purchased Date"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="properties.warranty_period"
                      label="Warranty Period"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-title>Additional Details</v-card-title>

                  <div class="px-4">
                    <v-chip-group>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip v-bind="attrs" v-on="on" color="primary">
                            <v-icon class="mr-1" start>
                              mdi-account-circle-outline
                            </v-icon>
                            {{ properties.assigned_to }}
                          </v-chip>
                        </template>
                        <span>Assigned To</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip v-bind="attrs" v-on="on" color="primary">
                            <v-icon class="mr-1" start> mdi-map-marker </v-icon>
                            {{ properties.location }}
                          </v-chip>
                        </template>
                        <span>Location</span>
                      </v-tooltip>
                    </v-chip-group>
                  </div>
                </v-card>
              </template>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <!-- Histories -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: "PropertyInfo",
  data: () => ({
    tab: null,
    tab: 0,
    items: ["Property", "Histories"],
    // transaction_dialog_data: {
    //   transaction_dialog: false,
    //   customer: null,
    // },
  }),
  async asyncData({ params, $axios }) {
    const [property_history] = await Promise.all([
      $axios.get(`property_history/${params.propertyid}`),
    ]);
    return {
      properties: property_history.data.data[0],
    };
  },
  computed: {
    propertyStatus() {
      switch (this.properties.status) {
        case "Unavailable":
          return { icon: "mdi-close-circle-outline", color: "red" };
        case "In Custody":
          return { icon: "mdi-check-circle-outline", color: "green" };
        case "Disposed":
          return { icon: "mdi-delete-outline", color: "grey" };
        case "In Repair":
          return { icon: "mdi-tools", color: "orange" };
        default:
          break;
      }
    },
  },
  // methods: {
  //   async closeReturnDialog() {
  //     await this.$nuxt.refresh();
  //   },
  // },
};
</script>
