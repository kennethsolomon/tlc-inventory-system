<template>
  <v-card flat primary>
    <v-card-title class="d-flex text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 primary--text">
        {{ tab_name?.[tab] }}
      </h1>
    </v-card-title>
    <div
      class="d-flex justify-end"
      :class="{ 'justify-center': $vuetify.breakpoint.xs }"
    >
      <slot name="add_dialog"></slot>
      <!-- <v-btn
        @click="dialog.add = true"
        class="ma-2"
        tile
        :color="buttons.add.color"
        :width="$vuetify.breakpoint.xs ? '100%' : ''"
      >
        <v-icon left>{{ buttons.add.icon }}</v-icon>
        {{ buttons.add.btn_name }}
      </v-btn> -->
    </div>
    <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
      <v-tab v-for="(item, index) in table_data" :key="index">
        <div v-for="(title, index) in item" :key="index">
          {{ title.tab_name }}
        </div>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in table_data" :key="index">
        <v-card class="mt-5" flat>
          <v-card-text class="pa-0 ma-0">
            <div v-for="(data, index) in item" :key="index">
              {{ data.data }}
            </div>
            <!-- <v-data-table
              :headers="table"
              :items="desserts"
              :options.sync="options"
              :server-items-length="totalDesserts"
              :loading="loading"
              class="elevation-1"
            ></v-data-table> -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- <DialogAdd
      v-if="dialog.add === true"
      :title="buttons.add.modal.title"
      :fields="buttons.add.modal.fields"
      :button="buttons.add.modal.button"
      :dialog="dialog.add"
      @closeModal="dialog.add = false"
      @modal="modal"
    /> -->
  </v-card>
</template>

<script>
export default {
  name: "PropertyPage",
  middleware: "authUser",
  props: {
    class_name: String, // for api call
    tab_name: Array,
    table_data: Array,
    table_headers: Array,
    buttons: Object, //(add-edit-delete): color, btn_name, icon , fields: array
  },

  data: () => ({
    dialog: { add: false },
    tab: null,
    totalDesserts: 0,
    desserts: [],
    loading: true,
    options: {},
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    modal(e) {
      // console.log("testing", e);
    },
    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall().then((data) => {
        this.desserts = data.items;
        this.totalDesserts = data.total;
        this.loading = false;
      });
    },
    /**
     * In a real application this would be a call to fetch() or axios.get()
     */
    fakeApiCall() {
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        let items = this.getDesserts();
        const total = items.length;

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          resolve({
            items,
            total,
          });
        }, 1000);
      });
    },
    getDesserts() {
      return [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ];
    },
  },
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
