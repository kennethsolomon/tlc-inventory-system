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
                <template v-slot:[`item.preview`]="{ item }">
                  <v-menu
                    :close-on-content-click="false"
                    open-on-hover
                    :nudge-width="500"
                    offset-y
                    bottom
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon style="cursor: pointer" color="primary"
                          >mdi-eye</v-icon
                        >
                      </span>
                    </template>
                    <v-card flat>
                      <v-simple-table dense>
                        <template v-slot:default>
                          <h4 class="mx-3">Property List:</h4>
                          <tbody
                            v-for="(property, index) in item.selected"
                            :key="index"
                          >
                            <tr>
                              <th>Property Code:</th>
                              <td>{{ property.property_code }}</td>

                              <th>Category:</th>
                              <td>{{ property.category }}</td>

                              <th>Description:</th>
                              <td>{{ property.description }}</td>

                              <th>Unit Cost:</th>
                              <td>{{ property.unit_cost }}</td>
                            </tr>
                            <v-divider></v-divider>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-menu>
                </template>
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-switch
                      v-model="singleSelect"
                      label="Single select"
                      class="mt-3 mr-3"
                    ></v-switch>

                    <v-spacer></v-spacer>

                    <v-btn
                      @click="dialogs.mr_dialog = true"
                      class="primary mr-2"
                      medium
                      :disabled="selected_properties.length == 0"
                    >
                      <v-icon class="mr-2" dark> mdi-printer-pos </v-icon
                      >M.R.</v-btn
                    >
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

                <template v-slot:no-data>
                  <h1>No Data Found ...</h1>
                </template>
              </v-data-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <MRDialog
      v-if="dialogs.mr_dialog"
      :selected-row="selected_properties"
      :dialog="dialogs.mr_dialog"
      @closeModal="dialogs.mr_dialog = false"
    />
  </v-card>
</template>

<script>
import MRDialog from "../components/dialog/mr.dialog.vue";
export default {
  components: {
    MRDialog,
  },
  data() {
    return {
      dialogs: {
        mr_dialog: false,
      },
      singleSelect: true,
      selected_properties: [],
      tab: 0,
      items: ["Generate MR"],
      selected_category: { name: "Lend" },
      categories: [{ name: "Lend" }, { name: "Transfer" }],
      lend_list: [],
      search: null,

      headers: [
        {
          text: "MR Number",
          align: "start",
          sortable: false,
          value: "mr_number",
        },
        {
          text: "Preview",
          value: "preview",
        },
        {
          text: "Created Date",
          value: "f_date",
        },
        // {
        //   text: "Date Of Lending",
        //   value: "date_of_lending",
        // },
        // {
        //   text: "Borrower Name",
        //   value: "borrower_name",
        // },
        // {
        //   text: "Location",
        //   value: "location",
        // },
        // {
        //   text: "Reason For Lending",
        //   value: "reason_for_lending",
        // },
        // {
        //   text: "Returned Date",
        //   value: "returned_date",
        // },
        // { text: "Actions", value: "view_more", sortable: false },
      ],
    };
  },
  async asyncData({ params, $axios }) {
    const [generate_mr] = await Promise.all([$axios.get(`generate-mr/`)]);
    return {
      mrs: generate_mr.data,
    };
  },

  computed: {
    filterProperties() {
      return this.mrs.filter((property) => {
        let category = this.selected_category?.name?.toLowerCase();
        let property_type = property?.type?.toLowerCase();
        if (category == property_type) {
          return property;
        }
      });
    },
  },
  methods: {
    // checkStatus(item) {
    //   if (item.returned_date) {
    //     return { icon: "mdi-cached", value: "Returned", disabled: true };
    //   } else if (item.is_overdue == 1) {
    //     return { icon: "mdi-update", value: "Overdue", disabled: false };
    //   } else if (item.is_lend == 1) {
    //     return { icon: "mdi-undo", value: "Return", disabled: false };
    //   } else if (item.is_lend == 0) {
    //     return {
    //       icon: "mdi-check-circle-outline",
    //       value: "Approve",
    //       disabled: false,
    //     };
    //   }
    // },
    // async approveProperty(item) {
    //   if (item.is_lend == 1) {
    //     await this.$axios
    //       .$post(`return_property/${item.id}`, {})
    //       .then(async (result) => {
    //         await this.$nuxt.refresh();
    //         this.$toast.success(
    //           `Property ${item.property_code} has been returned.`
    //         );
    //       })
    //       .catch((error) => {
    //         this.$toast.error(error.response.data.message);
    //       });
    //   } else if (item.is_lend == 0) {
    //     await this.$axios
    //       .$post(`lend_approved/${item.id}`, {})
    //       .then(async (result) => {
    //         await this.$nuxt.refresh();
    //         this.$toast.success(
    //           `Property ${item.property_code} has been approved.`
    //         );
    //       })
    //       .catch((error) => {
    //         this.$toast.error(error.response.data.message);
    //       });
    //   }
    // },
    // async cancelProperty(item) {
    //   if (item.is_lend == 0) {
    //     await this.$axios
    //       .$post(`lend_cancel/${item.id}`, {})
    //       .then(async (result) => {
    //         await this.$nuxt.refresh();
    //         this.$toast.success(`Property has been cancelled.`);
    //       })
    //       .catch((error) => {
    //         this.$toast.error(error.response.data.message);
    //       });
    //   }
    // },
  },
};
</script>
