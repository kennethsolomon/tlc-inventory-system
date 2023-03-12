<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>

    <div class="d-flex justify-end">
      <v-chip-group>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              @click="showLendDialog()"
              :disabled="
                !property.pending_lend
                  ? property.status != 'In Custody'
                  : property.status != ''
              "
              v-bind="attrs"
              v-on="on"
              color="primary"
              label
            >
              <v-icon class="mr-1" start> mdi-transfer-right </v-icon>
              Lend
            </v-chip>
          </template>
          <span>Lend Property</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              @click="showTransferDialog()"
              :disabled="
                property.init_transfer
                  ? property.status != 'In Custody'
                  : property.status != ''
              "
              v-bind="attrs"
              v-on="on"
              color="primary"
              label
            >
              <v-icon class="mr-1" start> mdi-transit-transfer </v-icon>
              Transfer Property
            </v-chip>
          </template>
          <span>Transfer Property</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              @click="maintenances.dialog = true"
              :disabled="property.status != 'In Custody'"
              v-bind="attrs"
              v-on="on"
              color="primary"
              label
            >
              <v-icon class="mr-1" start> mdi-tools </v-icon>
              In Repair
            </v-chip>
          </template>
          <span>In Repair</span>
        </v-tooltip>
      </v-chip-group>
    </div>

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
                <v-card class="mx-auto my-12" max-width="400">
                  <div class="d-flex justify-space-between">
                    <div>
                      <v-card-title>{{ property.property_code }}</v-card-title>
                      <v-card-subtitle>
                        <span>{{ property.serial_number }}</span>

                        <v-icon
                          color="error"
                          icon="mdi-fire-circle"
                          size="small"
                        ></v-icon>
                      </v-card-subtitle>
                    </div>
                    <div class="ma-5" v-if="property.init_transfer">
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
                            {{ property.status }}
                          </v-chip>
                        </template>
                        <span>Status</span>
                      </v-tooltip>
                    </div>
                  </div>

                  <v-divider class="mx-4 mb-1"></v-divider>

                  <v-card-text>
                    <v-text-field
                      :value="property.category"
                      label="Category"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="property.description"
                      label="Descriptiopn"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="property.brand"
                      label="Brand"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="property.model"
                      label="Model"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="property.purchase_date"
                      label="Purchased Date"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                    <v-text-field
                      :value="property.warranty_period"
                      label="Warranty Period"
                      hide-details
                      readonly
                      class="py-3"
                    ></v-text-field>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <div v-if="property.init_transfer">
                    <v-card-title>Additional Details</v-card-title>
                    <v-chip-group class="px-4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip v-bind="attrs" v-on="on" color="primary">
                            <v-icon class="mr-1" start>
                              mdi-account-circle-outline
                            </v-icon>
                            {{ property.assigned_to }}
                          </v-chip>
                        </template>
                        <span>Assigned To</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip v-bind="attrs" v-on="on" color="primary">
                            <v-icon class="mr-1" start> mdi-map-marker </v-icon>
                            {{ property.location }}
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
        <template>
          <v-data-table
            :headers="history_headers"
            :items="property.property_histories"
            sort-by="created_at"
            :sort-desc="true"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:item.created_at="{ item }">
              {{ item.created_at.split("T")[0] }}
            </template>
          </v-data-table>
        </template>
      </v-tab-item>
    </v-tabs-items>

    <!-- NOTE: Lend Property Dialog -->
    <v-dialog v-model="lend_property.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Lend Property
          <v-icon @click="lend_property.dialog = false" color="white"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <!-- Lend Date -->
          <!-- Treat return-velue.sync as model because its the value choosen after you click save, while the v-model is reactive to what you click inside the calendar.  -->
          <v-dialog
            ref="lend_dialog"
            :return-value.sync="lend_property.date_of_lending"
            persistent
            width="290px"
            v-model="lend_property.date_modal"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-3"
                label="Date of Lending"
                hide-details
                readonly
                v-bind="attrs"
                v-on="on"
                v-model="lend_property.date_of_lending_date"
              ></v-text-field>
            </template>
            <v-date-picker
              scrollable
              v-model="lend_property.date_of_lending_date"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="lend_property.date_modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.lend_dialog.save(lend_property.date_of_lending_date)
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <v-autocomplete
            v-model="lend_property.borrower_name"
            :items="users"
            text-value="fullname"
            item-text="fullname"
            label="Borrower Name"
            name="Borrower Name"
          ></v-autocomplete>

          <v-autocomplete
            v-model="lend_property.location"
            :items="locations"
            text-value="name"
            item-text="name"
            label="Location"
            name="Location"
            append-icon="mdi-folder-multiple-outline"
            @click:append="location_dialog = true"
          >
            <template v-slot:item="{ index, item }">
              {{ item.name }}
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-icon @click="deleteLocation(item.id)">mdi-close</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
          <v-textarea
            v-model="lend_property.reason_for_lending"
            outlined
            name="input-7-4"
            label="Reason for lending ..."
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="lendProperty()" color="primary">
            <v-icon start small class="mr-1"> mdi-transfer-right</v-icon>
            Lend
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Repair Dialog -->
    <v-dialog v-model="maintenances.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Repair
          <v-icon @click="maintenances.dialog = false" color="white"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-5">
          <v-textarea
            v-model="maintenances.notes"
            outlined
            name="input-7-4"
            label="Notes"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onMaintenance()" color="primary">
            <v-icon start small class="mr-1"> mdi-check</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- NOTE: Transfer Property Dialog -->
    <v-dialog v-model="transfer_property.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Transfer Property
          <v-icon @click="transfer_property.dialog = false" color="white"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <!-- Transfer Date -->
          <!-- Treat return-velue.sync as model because its the value choosen after you click save, while the v-model is reactive to what you click inside the calendar.  -->
          <v-dialog
            ref="transfer_dialog"
            :return-value.sync="transfer_property.transfer_date"
            persistent
            width="290px"
            v-model="transfer_property.date_modal"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-3"
                label="Date of Transfer"
                hide-details
                readonly
                v-bind="attrs"
                v-on="on"
                v-model="transfer_property.transfer_date_date"
              ></v-text-field>
            </template>
            <v-date-picker
              scrollable
              v-model="transfer_property.transfer_date_date"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="transfer_property.date_modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.transfer_dialog.save(
                    transfer_property.transfer_date_date
                  )
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-autocomplete
            v-model="transfer_property.assigned_to"
            :items="users"
            text-value="fullname"
            item-text="fullname"
            label="Assigned To"
            name="Assigned To"
          ></v-autocomplete>
          <v-autocomplete
            v-model="transfer_property.location"
            :items="locations"
            text-value="name"
            item-text="name"
            label="Location"
            name="Location"
            append-icon="mdi-folder-multiple-outline"
            @click:append="location_dialog = true"
          >
            <template v-slot:item="{ index, item }">
              {{ item.name }}
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-icon @click="deleteLocation(item.id)">mdi-close</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="transferProperty()" color="primary">
            <v-icon start small class="mr-1"> mdi-transit-transfer</v-icon>
            Transfer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <div class="text-center">
        <v-dialog v-model="location_dialog" width="350" class="primary">
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Location
              <v-icon @click="location_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="location_name"
                label="Location Name"
                single-line
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="addLocation()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "PropertyInfo",
  data: () => ({
    locations: [],
    location_dialog: false,
    location_name: "",

    users: [],
    user_name: "",

    tab: null,
    tab: 0,
    items: ["Property", "Property"],
    history_headers: [
      {
        text: "Transfer Date",
        align: "start",
        sortable: true,
        value: "transfer_date",
      },
      { text: "Assigned To", value: "assigned_to" },
      { text: "Location", value: "location" },
      { text: "Status", value: "status" },
      { text: "Created At", value: "created_at" },
    ],
    maintenances: {
      dialog: false,
      custodian: null,
      notes: "",
    },
    lend_property: {
      dialog: false,
      date_modal: false,
      date_of_lending_date: null,

      // Form
      date_of_lending: null,
      borrower_name: null,
      location: null,
      reason_for_lending: null,
    },
    transfer_property: {
      dialog: false,
      date_modal: false,
      transfer_date_date: null,

      // Form
      transfer_date: null,
      assigned_to: null,
      location: null,
    },
  }),
  async asyncData({ params, $axios }) {
    const [property_history] = await Promise.all([
      $axios.get(`property_history/${params.propertyid}`),
    ]);
    return {
      property: property_history.data.data[0],
      property_id: params.propertyid,
    };
  },
  computed: {
    propertyStatus() {
      switch (this.property.status) {
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
  methods: {
    async lendProperty() {
      await this.$axios
        .$post(`lend_property/${this.property_id}`, this.lend_property)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${this.property.property_code} has been added to pending lend list.`
          );
          this.lend_property = {
            dialog: false,
            date_modal: false,
            date_of_lending_date: null,

            // Form
            date_of_lending: null,
            borrower_name: null,
            location: null,
            reason_for_lending: null,
          };
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });

      this.lend_property.dialog = false;
    },
    showLendDialog() {
      this.lend_property.dialog = true;
    },

    async transferProperty() {
      await this.$axios
        .$post(`transfer_property/${this.property_id}`, this.transfer_property)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${this.property.property_code} has successfully been transfer.`
          );
          this.transfer_property = {
            dialog: false,
            date_modal: false,
            transfer_date_date: null,
            transfer_date: null,
            assigned_to: null,
            location: null,
          };
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });

      this.transfer_property.dialog = false;
    },
    showTransferDialog() {
      this.transfer_property.dialog = true;
    },
    async onMaintenance() {
      await this.$axios
        .$post(`on_maintenance/${this.property_id}`, {
          notes: this.maintenances.notes,
        })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${this.property.property_code} has been added to maintenance list.`
          );
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });

      this.maintenances.dialog = false;
    },

    async addLocation() {
      await this.$axios
        .$post(`add_location`, { name: this.location_name })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Location ${this.location_name} has been successfully added.`
          );

          this.location_name = "";

          this.location_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getLocations();
    },
    async deleteLocation(id) {
      await this.$axios
        .$post(`delete_location/${id}`)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Location ${this.location_name} has been successfully deleted.`
          );

          this.location_name = "";

          this.location_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getLocations();
    },
    async getLocations() {
      const locations = await this.$axios.$get(`locations`).then((result) => {
        this.locations = result.data;
      });
    },

    async getUsers() {
      const users = await this.$axios.$get(`users`).then((result) => {
        this.users = result;
      });
    },
  },
  mounted() {
    this.getLocations();
    this.getUsers();
    this.maintenances.custodian =
      this.$store.state.user.user?.firstname +
      " " +
      this.$store.state.user.user?.middlename +
      " " +
      this.$store.state.user.user?.lastname;
  },
};
</script>
