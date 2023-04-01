<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="9">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search ..."
                  single-line
                  hide-details
                  class="mb-2"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="selected_category"
                  :items="categories"
                  item-text="name"
                  return-object
                  prepend-icon="mdi-filter-variant"
                ></v-select>
              </v-col>
            </v-row>
            <template>
              <v-data-table
                v-model="selected_properties"
                :headers="headers"
                :items="filterProperties"
                :search="search"
                show-select
                :single-select="singleSelect"
                sort-by="property_code"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-switch
                      v-model="singleSelect"
                      label="Single select"
                      class="mt-3 mr-3"
                    ></v-switch>
                  </v-toolbar>
                </template>
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
      singleSelect: true,
      selected_properties: [],
      tab: 0,
      items: ["Lend Property"],
      selected_category: { name: "Require Approval" },
      categories: [
        { name: "Require Approval" },
        { name: "Return" },
        { name: "Overdue" },
      ],
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
          text: "Description",
          value: "description",
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

  computed: {
    filterProperties() {
      return this.lends.filter((property) => {
        console.log(this.selected_category.name);
        if (
          this.selected_category.name == "Return" &&
          property.returned_date == null &&
          property.is_lend == 1 &&
          property.is_overdue == 0
        ) {
          return property;
        } else if (
          this.selected_category.name == "Overdue" &&
          property.is_overdue == 1
        ) {
          return property;
        } else if (
          this.selected_category.name == "Require Approval" &&
          property.is_lend == 0
        ) {
          return property;
        }
      });
    },
  },
  methods: {
    checkStatus(item) {
      if (item.returned_date) {
        return { icon: "mdi-cached", value: "Returned", disabled: true };
      } else if (item.is_overdue == 1) {
        return { icon: "mdi-update", value: "Overdue", disabled: false };
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
          .$post(`return_property`, {
            selected: this.selected_properties,
          })
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(result);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      } else if (item.is_lend == 0) {
        await this.$axios
          .$post(`lend_approved`, {
            selected: this.selected_properties,
          })
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(result);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      }
    },

    async cancelProperty(item) {
      if (item.is_lend == 0) {
        await this.$axios
          .$post(`lend_cancel`, {
            selected: this.selected_properties,
          })
          .then(async (result) => {
            await this.$nuxt.refresh();
            this.$toast.success(result);
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      }
    },
  },
};
</script>
