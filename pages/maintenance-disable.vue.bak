<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>
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
                :items="maintenances"
                :search="search"
                sort-by="property_code"
                class="elevation-1"
              >
                <template v-slot:item.has_been_fixed="{ item }">
                  <v-btn
                    :disabled="checkStatus(item).disabled"
                    class="primary mr-2"
                    medium
                    @click="
                      item.is_approved == true
                        ? fixProperty(item)
                        : approveProperty(item)
                    "
                  >
                    <v-icon class="mr-2" dark>
                      {{ checkStatus(item).icon }} </v-icon
                    >{{ checkStatus(item).value }}</v-btn
                  >
                </template>

                <template v-slot:item.has_been_disposed="{ item }">
                  <v-btn
                    :disabled="checkDisposed(item).disabled"
                    class="primary mr-2"
                    medium
                    @click="disposedProperty(item)"
                  >
                    <v-icon class="mr-2" dark>
                      {{ checkDisposed(item).icon }}
                    </v-icon>
                    {{ checkDisposed(item).value }}
                  </v-btn>
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
      items: ["Maintenance"],
      lend_list: [],
      search: null,

      headers: [
        {
          text: "Property Code",
          align: "start",
          sortable: false,
          value: "property_code",
        },
        {
          text: "Category",
          value: "category",
        },
        {
          text: "Warranty Date",
          value: "purchase_date",
        },
        {
          text: "Custodian",
          value: "custodian",
        },
        {
          text: "Notes",
          value: "notes",
        },
        { text: "Need Repair", value: "has_been_fixed", sortable: false },
        { text: "Disposed", value: "has_been_disposed", sortable: false },
      ],
    };
  },
  async asyncData({ params, $axios }) {
    const [maintenance_list] = await Promise.all([
      $axios.get(`maintenance_list/`),
    ]);
    return {
      maintenances: maintenance_list.data.data,
    };
  },
  methods: {
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    checkStatus(item) {
      if (item.is_approved == 0 && item.has_been_fixed == 0) {
        return {
          icon: "mdi-check",
          value: "Approve",
          disabled: item.has_been_disposed == 1 ? true : false,
        };
      } else if (item.has_been_fixed == 1) {
        return {
          icon: "mdi-check",
          value: "Fixed",
          disabled: item.has_been_disposed == 1 ? true : true,
        };
      } else if (item.has_been_fixed == 0) {
        return {
          icon: "mdi-tools",
          value: "Repair",
          disabled: item.has_been_disposed == 1 ? true : false,
        };
      }
    },
    checkDisposed(item) {
      const year = item.created_at.split("-")[0];
      const month = item.created_at.split("-")[1];
      const day = item.created_at.split("-")[2];

      const oneYear = this.addDays(
        new Date(`${year}-${month}-${day}`),
        365
      ).getTime();
      // const createDate = new Date(`${year}-${month}-${day}`).getTime();
      const currentDate = new Date().getTime();

      if (item.has_been_disposed == 1) {
        return {
          icon: "mdi-close",
          value: "Disposed",
          disabled: item.has_been_fixed == 1 ? true : true,
        };
      } else {
        return {
          icon: "mdi-delete",
          value: "Dispose",
          disabled: item.has_been_fixed == 1 ? true : false,
        };
      }

      // if (item.has_been_disposed == 1) {
      //   return { icon: "mdi-close", value: "Disposed", disabled: true };
      // } else if (currentDate > oneYear) {
      //   return { icon: "mdi-delete", value: "Dispose", disabled: false };
      // } else {
      //   return { icon: "mdi-delete", value: "Dispose", disabled: true };
      // }
    },
    async disposedProperty(item) {
      await this.$axios
        .$post(`disposed/${item.id}`, {})
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${item.property_code} has been disposed.`
          );
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },

    async cancelProperty(item) {
      if (item.is_lend == 0) {
        await this.$axios
          .$post(`lend_cancel/${item.id}`, {})
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(`Property has been cancelled.`);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      }
    },

    async fixProperty(item) {
      await this.$axios
        .$post(`fixed/${item.id}`, {})
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(`Property has been fixed.`);
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },

    async approveProperty(item) {
      await this.$axios
        .$post(`approve/${item.id}`, {
          custodian:
            this.$store.state.user.user?.firstname +
            " " +
            this.$store.state.user.user?.middlename +
            " " +
            this.$store.state.user.user?.lastname,
        })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(`Property has been approved.`);
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },
  },
};
</script>
