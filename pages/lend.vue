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
                :items="lends"
                :search="search"
                sort-by="property_code"
                class="elevation-1"
              >
                <template v-slot:item.returned_date="{ item }">
                  <div v-if="item.returned_date">
                    {{ item.returned_date?.split(" ")[0] }} |
                    {{
                      new Intl.DateTimeFormat("default", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item?.returned_date))
                    }}
                  </div>
                </template>
                <template v-slot:item.view_more="{ item }">
                  <v-btn
                    :disabled="checkStatus(item).disabled"
                    class="primary mr-2"
                    medium
                    @click="approveProperty(item)"
                  >
                    <v-icon class="mr-2" dark>
                      {{ checkStatus(item).icon }} </v-icon
                    >{{ checkStatus(item).value }}</v-btn
                  >

                  <v-btn
                    v-if="item.is_lend == 0"
                    class="primary mr-2"
                    medium
                    @click="cancelProperty(item)"
                  >
                    <v-icon class="mr-2" dark> mdi-close </v-icon
                    >Cancelled</v-btn
                  >
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
      items: ["Lend Property"],
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
          text: "Date Of Lending",
          value: "date_of_lending",
        },
        {
          text: "Borrower Name",
          value: "borrower_name",
        },
        {
          text: "Location",
          value: "location",
        },
        {
          text: "Reason For Lending",
          value: "reason_for_lending",
        },
        {
          text: "Returned Date",
          value: "returned_date",
        },
        { text: "Actions", value: "view_more", sortable: false },
      ],
    };
  },
  async asyncData({ params, $axios }) {
    const [lend_list] = await Promise.all([$axios.get(`lend_list/`)]);
    return {
      lends: lend_list.data.data,
    };
  },
  methods: {
    checkStatus(item) {
      if (item.returned_date) {
        return { icon: "mdi-cached", value: "Returned", disabled: true };
      } else if (item.is_lend == 1) {
        return { icon: "mdi-undo", value: "Return", disabled: false };
      } else if (item.is_lend == 0) {
        return {
          icon: "mdi-check-circle-outline",
          value: "Approve",
          disabled: false,
        };
      }
    },
    async approveProperty(item) {
      if (item.is_lend == 1) {
        await this.$axios
          .$post(`return_property/${item.id}`, {})
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(
              `Property ${item.property_code} has been returned.`
            );
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      } else if (item.is_lend == 0) {
        await this.$axios
          .$post(`lend_approved/${item.id}`, {})
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(
              `Property ${item.property_code} has been approved.`
            );
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      }
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
  },
};
</script>
