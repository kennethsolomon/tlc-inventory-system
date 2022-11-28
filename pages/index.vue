<template>
  <div>
    <v-alert
      v-if="reStock.length > 0"
      border="right"
      colored-border
      type="error"
      elevation="2"
      ><strong>Please re-stock this following properties:</strong>
      <div v-for="(item_list, index) in reStock" :key="index">
        {{ index + 1 }}. <strong>{{ item_list.property_name }}</strong> :
        {{ item_list.description }} (Quantity: {{ item_list.quantity }})
      </div>
    </v-alert>
    <div class="container">
      <v-row>
        <v-col cols="4" lg="4" md="12" sm="12">
          <v-card class="mx-auto" color="primary" dark>
            <v-card-title>
              <v-icon large left>mdi-chart-line</v-icon>
              <span class="text-h6 font-weight-light"
                >Total Property Count</span
              >
            </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              {{ propertyCount }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="4" md="12" sm="12">
          <v-card class="mx-auto" color="primary" dark>
            <v-card-title>
              <v-icon large left>mdi-cart-arrow-right</v-icon>
              <span class="text-h6 font-weight-light">Consumable</span>
            </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              {{ consumableCount.length }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="4" md="12" sm="12">
          <v-card class="mx-auto" color="primary" dark>
            <v-card-title>
              <v-icon large left>mdi-cart-off</v-icon>
              <span class="text-h6 font-weight-light">Non-Consumable</span>
            </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              {{ nonConsumableCount.length }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
    <div class="container">
      <v-row>
        <v-col xl="6" lg="12" md="12" sm="12">
          <v-card color="primary" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="mb-5">
                <v-card-title class="text-h5"
                  >Consumable Property Category</v-card-title
                >
                <h3
                  v-for="(item_category, index) in item_categories"
                  :key="index"
                  class="pl-5"
                >
                  {{ item_category.name }} :
                  {{ item_category.consumable_count }}
                </h3>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col xl="6" lg="12" md="12" sm="12">
          <v-card color="primary" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="mb-5">
                <v-card-title class="text-h5"
                  >Non-Consumable Property Category</v-card-title
                >
                <h3
                  v-for="(item_category, index) in item_categories"
                  :key="index"
                  class="pl-5"
                >
                  {{ item_category.name }} :
                  {{ item_category.non_consumable_count }}
                </h3>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      item_categories: [],
      chartData: {
        labels: [],
        datasets: [
          // Consumable
          {
            data: [],
            label: "Consumable Properties",
            backgroundColor: "#FFB1C1",
          },
          {
            data: [],
            label: "Non-Consumable Properties",
            backgroundColor: "#9BD0F5",
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },

  computed: {
    consumableCount() {
      return this.$store.getters.getItems.data.filter(
        (item) => item.type === "Consumable"
      );
    },
    nonConsumableCount() {
      return this.$store.getters.getItems.data.filter(
        (item) => item.type === "Non-Consumable"
      );
    },

    propertyCount() {
      return this.$store.getters.getItems.data.length;
    },

    reStock() {
      return this.$store.getters.getItemList.data.filter(
        (item_list) => item_list.quantity <= 5
      );
    },
  },

  mounted() {
    this.$store.dispatch("getItemCategories");
    this.$store.dispatch("getItemList");
    this.$store.dispatch("getItems");
    let item_categories = this.$store.getters.getItemCategories.data;

    item_categories.map((item_category) => {
      this.chartData.labels.push(item_category.name);
      this.chartData.datasets[0].data.push(item_category.consumable_count);
      this.chartData.datasets[1].data.push(item_category.non_consumable_count);
    });

    this.item_categories = item_categories;
  },
};
</script>
