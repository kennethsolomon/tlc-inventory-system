<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Lend Property
          <v-icon
            @click="
              resetField();
              $emit('closeModal');
            "
            color="white"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <!-- Lend Date -->
          <!-- Treat return-velue.sync as model because its the value choosen after you click save, while the v-model is reactive to what you click inside the calendar.  -->
          <div class="d-flex">
            <v-dialog
              ref="lend_dialog"
              :return-value.sync="lend_property.date_of_lending"
              persistent
              width="290px"
              v-model="lend_property.date_modal"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="mt-3 mr-3"
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

            <v-dialog
              ref="return_dialog"
              :return-value.sync="lend_property.return_date"
              persistent
              width="290px"
              v-model="lend_property.return_date_modal"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="mt-3 ml-3"
                  label="Return Date"
                  hide-details
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  v-model="lend_property.return_date_date"
                ></v-text-field>
              </template>
              <v-date-picker
                scrollable
                v-model="lend_property.return_date_date"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="lend_property.return_date_modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $refs.return_dialog.save(lend_property.return_date_date)
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>

          <v-autocomplete
            v-model="lend_property.borrower"
            :items="users"
            return-object
            item-text="fullname"
            label="Borrower Name"
            name="Borrower Name"
            :disabled="
              $store.state.user.user.role === 'Borrower' ? true : false
            "
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
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    selectedRow: [Object, Array],
  },
  data: () => ({
    locations: [],
    location_name: "",
    users: [],
    location_dialog: false,
    lend_property: {
      dialog: false,
      date_modal: false,
      date_of_lending_date: null,
      return_date_date: null,
      return_date_modal: false,

      // Form
      date_of_lending: null,
      return_date: null,
      borrower: null,
      location: null,
      reason_for_lending: null,
    },
  }),

  methods: {
    async lendProperty() {
      await this.$axios
        .$post(`lend_property`, {
          selected: this.selectedRow,
          data: this.lend_property,
        })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(result);
          this.lend_property = {
            dialog: false,
            date_modal: false,
            date_of_lending_date: null,

            return_date_modal: false,
            return_date_date: null,

            // Form
            date_of_lending: null,
            return_date: null,
            borrower: null,
            location: null,
            reason_for_lending: null,
          };
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });

      this.$emit("closeModal");
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

    resetField() {
      this.transfer_property = {
        dialog: false,
        date_modal: false,
        date_of_lending_date: null,
        return_date_date: null,
        return_date_modal: false,

        // Form
        date_of_lending: null,
        return_date: null,
        borrower: null,
        location: null,
        reason_for_lending: null,
      };
    },

    test() {
      console.log(this.selectedRow);
    },
  },
  mounted() {
    this.getLocations();
    this.getUsers();
  },
};
</script>
