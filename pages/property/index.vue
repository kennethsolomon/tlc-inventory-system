<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="d-flex">
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
                    v-model="filter_property_selected"
                    :items="categories"
                    item-text="name"
                    prepend-icon="mdi-filter-variant"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
            <template>
              <v-data-table
                v-model="selected_properties"
                :headers="headers"
                :items="
                  filter_property_selected == '' ? properties : filterProperties
                "
                :search="search"
                show-select
                :single-select="singleSelect"
                sort-by="property_code"
                class="elevation-1"
              >
                <template
                  v-if="
                    $store.getters.getUser?.role == 'Borrower' ? false : true
                  "
                  v-slot:top
                >
                  <v-toolbar flat>
                    <v-switch
                      v-model="singleSelect"
                      label="Single select"
                      class="mt-3 mr-3"
                    ></v-switch>
                    <v-checkbox
                      v-model="show_damage"
                      label="Show Damage"
                      class="mt-3"
                    ></v-checkbox>

                    <v-spacer></v-spacer>
                    <v-btn
                      @click="showAddDialog({}, 'add')"
                      class="primary mr-2"
                      medium
                    >
                      <v-icon class="mr-2" dark> mdi-plus </v-icon>Add
                      Property</v-btn
                    >

                    <v-btn
                      @click="dialogs.transfer_dialog = true"
                      class="primary mr-2"
                      medium
                      :disabled="selected_properties.length == 0"
                    >
                      <v-icon class="mr-2" dark> mdi-transit-transfer </v-icon
                      >Transfer</v-btn
                    >

                    <v-btn
                      @click="dialogs.lend_dialog = true"
                      class="primary mr-2"
                      medium
                      :disabled="selected_properties.length == 0"
                    >
                      <v-icon class="mr-2" dark> mdi-transfer-right </v-icon
                      >Lend</v-btn
                    >

                    <v-btn
                      @click="setDamageProperty()"
                      class="primary mr-2"
                      medium
                      :disabled="selected_properties.length == 0"
                    >
                      <v-icon class="mr-2" dark> mdi-image-broken </v-icon
                      >Damage</v-btn
                    >

                    <!-- <v-btn
                      @click="dialogs.mr_dialog = true"
                      class="primary mr-2"
                      medium
                      :disabled="selected_properties.length == 0"
                    >
                      <v-icon class="mr-2" dark> mdi-printer-pos </v-icon
                      >M.R.</v-btn
                    > -->
                  </v-toolbar>
                </template>
                <template v-slot:item.unit_cost="{ item }">
                  {{
                    item.unit_cost.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })
                  }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    v-if="
                      $store.getters.getUser?.role == 'Borrower' ? false : true
                    "
                    class="primary mr-2"
                    fab
                    x-small
                    @click="showAddDialog(item, 'edit')"
                  >
                    <v-icon dark> mdi-pencil </v-icon></v-btn
                  >
                  <v-btn
                    class="primary mr-2"
                    fab
                    x-small
                    @click="$router.push(`/property/${item.id}`)"
                  >
                    <v-icon dark> mdi-eye-outline </v-icon></v-btn
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

    <!-- NOTE: Add Dialog -->
    <v-dialog v-model="add_property.dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Property
          <v-icon @click="closeDialog()" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="add_property.brand"
                :items="brands"
                text-value="name"
                item-text="name"
                label="Brand"
                name="Brand"
                append-icon="mdi-folder-multiple-outline"
                @click:append="brand_dialog = true"
              >
                <template v-slot:item="{ index, item }">
                  {{ item.name }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-icon @click="deleteBrand(item.id)">mdi-close</v-icon>
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="add_property.model"
                :items="models"
                text-value="name"
                item-text="name"
                label="Model"
                name="Model"
                append-icon="mdi-folder-multiple-outline"
                @click:append="model_dialog = true"
              >
                <template v-slot:item="{ index, item }">
                  {{ item.name }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-icon @click="deleteModel(item.id)">mdi-close</v-icon>
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="add_property.category"
                :items="categories"
                text-value="name"
                item-text="name"
                label="Category"
                name="Category"
                append-icon="mdi-folder-multiple-outline"
                @click:append="category_dialog = true"
              >
                <template v-slot:item="{ index, item }">
                  {{ item.name }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-icon v-if="item.id" @click="deleteCategory(item.id)"
                      >mdi-close</v-icon
                    >
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="add_property.description"
                :items="descriptions"
                text-value="name"
                item-text="name"
                label="Description"
                name="Description"
                append-icon="mdi-folder-multiple-outline"
                @click:append="description_dialog = true"
              >
                <template v-slot:item="{ index, item }">
                  {{ item.name }}
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-icon @click="deleteDescription(item.id)"
                      >mdi-close</v-icon
                    >
                  </v-list-item-action>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.property_code"
                disabled
                label="Property Code"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.serial_number"
                label="Serial Number"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-dialog
                ref="property_purchase_date"
                :return-value.sync="add_property.purchase_date"
                persistent
                width="290px"
                v-model="add_property.date_modal"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Purchase Date"
                    hide-details
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    v-model="add_property.purchase_date_date"
                  ></v-text-field>
                </template>
                <v-date-picker
                  scrollable
                  v-model="add_property.purchase_date_date"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="add_property.date_modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.property_purchase_date.save(
                        add_property.purchase_date_date
                      )
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="add_property.unit_cost"
                type="number"
                label="Unit Cost"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="mt-5 primary">
            <v-card-title class="text-center justify-center py-3">
              <h2 style="color: white">Maintenance</h2>
            </v-card-title>
          </div>
          <v-row class="mt-1">
            <v-col cols="6">
              <v-autocomplete
                v-model="add_property.maintenance"
                :items="['Quarterly', 'Yearly', 'Biennial']"
                label="Maintenance"
                name="Maintenance"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="add_property.maintenance_description"
                label="Description"
                hide-details
                class="py-3"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addProperty()" color="primary">
            <v-icon start small class="mr-1"> mdi-plus</v-icon>
            Save Property
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- NOTE: Category Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="category_dialog" width="350" class="primary">
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Category
              <v-icon @click="category_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="category_name"
                label="Category Name"
                single-line
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="addCategory()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- NOTE: Brand Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="brand_dialog" width="350" class="primary">
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Brand
              <v-icon @click="brand_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="brand_name"
                label="Brand Name"
                single-line
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="addBrand()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- NOTE: Model Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="model_dialog" width="350" class="primary">
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Model
              <v-icon @click="model_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="model_name"
                label="Model Name"
                single-line
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="addModel()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- NOTE: Description Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="description_dialog" width="350" class="primary">
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Description
              <v-icon @click="description_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="description_name"
                label="Description Name"
                single-line
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="primary"
                color="white"
                text
                @click="addDescription()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- Transfer Dialog -->
    <TransferPropertyDialog
      v-if="dialogs.transfer_dialog"
      :selected-row="selected_properties"
      :dialog="dialogs.transfer_dialog"
      @closeModal="dialogs.transfer_dialog = false"
      @getProperties="getProperties()"
    />

    <LendPropertyDialog
      v-if="dialogs.lend_dialog"
      :selected-row="selected_properties"
      :dialog="dialogs.lend_dialog"
      @closeModal="dialogs.lend_dialog = false"
    />

    <!-- <MRDialog
      v-if="dialogs.mr_dialog"
      :selected-row="selected_properties"
      :dialog="dialogs.mr_dialog"
      @closeModal="dialogs.mr_dialog = false"
    /> -->
  </v-card>
</template>

<script>
import TransferPropertyDialog from "../../components/dialog/transfer.property.vue";
import LendPropertyDialog from "../../components/dialog/lend.property.vue";
// import MRDialog from "../../components/dialog/mr.dialog.vue";
export default {
  components: {
    TransferPropertyDialog,
    LendPropertyDialog,
    // MRDialog,
  },
  data() {
    return {
      show_damage: false,
      dialogs: {
        transfer_dialog: false,
        lend_dialog: false,
        // mr_dialog: false,
      },
      tab: 0,
      items: ["Property"],
      properties: [],
      selected_properties: [],
      singleSelect: true,
      filter_property_selected: "",
      categories: [],
      models: [],
      descriptions: [],
      brands: [],

      property_data: null,
      // stock_quantity: 0, // add stock
      search: null,

      category_dialog: false,
      category_name: "",

      brand_dialog: false,
      brand_name: "",

      model_dialog: false,
      model_name: "",

      description_dialog: false,
      description_name: "",

      add_property: {
        id: null,
        mode: null,
        dialog: false,
        date_modal: false,
        date_modal2: false,
        purchase_date_date: null,
        // warranty_period_date: null,

        // Form
        maintenance: null,
        maintenance_description: null,
        brand: null,
        model: null,
        category: null,
        description: null,
        property_code: null,
        serial_number: null,
        purchase_date: null,
        // warranty_period: null,
      },

      //Checkout Dialog
      // date_modal: false,
      // agency_list: ["DICT", "Sample 1"],
      // check_out_dialog: false,
      // check_out_data: {
      //   received_by_id: null,
      //   agency: null,
      //   quantity: null,
      //   date: null,
      // },
      headers: [
        {
          text: "Property Code",
          align: "start",
          sortable: false,
          value: "property_code",
        },
        {
          text: "Brand",
          value: "brand",
        },
        {
          text: "Model",
          value: "model",
        },
        {
          text: "Serial Number",
          value: "serial_number",
        },
        {
          text: "Category",
          value: "category",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Location",
          value: "location",
        },
        {
          text: "Unit Cost",
          value: "unit_cost",
        },
        {
          text: "Purchase Date",
          value: "purchase_date",
        },
        {
          text: "Assigned To",
          value: "assigned_to",
        },
        {
          text: "Status",
          value: "status",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    checkMode() {
      if (this.add_property.mode == "add") {
        return "Add Property";
      } else {
        return "Edit Property";
      }
    },

    filterProperties() {
      return this.properties.filter((property) => {
        if (
          property.category === this.filter_property_selected &&
          (!this.show_damage ? property.status != "Damaged" : true)
        ) {
          return property;
        }
      });
    },
  },

  methods: {
    async setDamageProperty() {
      await this.$axios
        .$post(`set-damage-property`, {
          selected: this.selected_properties,
        })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.getProperties();
          this.selected_properties = [];
          this.$toast.success(result);
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },
    closeDialog() {
      this.add_property = {
        dialog: false,
        date_modal: false,
        purchase_date_date: null,
        mode: null,

        // Form
        id: null,
        maintenance: null,
        maintenance_description: null,
        brand: null,
        model: null,
        category: null,
        description: null,
        property_code: null,
        serial_number: null,
        purchase_date: null,
        // warranty_period: null,
      };
    },
    showAddDialog(item, mode) {
      if (mode == "edit") {
        console.log("edit");
        this.add_property.mode = "edit";
        this.add_property.id = item.id;
        this.add_property.dialog = true;
        this.add_property.brand = item.brand;
        this.add_property.model = item.model;
        this.add_property.category = item.category;
        this.add_property.description = item.description;
        this.add_property.property_code = item.property_code;
        this.add_property.serial_number = item.serial_number;
        this.add_property.purchase_date = item.purchase_date;
        this.add_property.purchase_date_date = item.purchase_date;

        this.add_property.maintenance = item.maintenance;
        this.add_property.maintenance_description =
          item.maintenance_description;
        // this.add_property.warranty_period = item.warranty_period;
        // this.add_property.warranty_period_date = item.warranty_period;
      } else if (mode == "add") {
        console.log("add");
        this.add_property.mode = "add";
        this.add_property.dialog = true;
      }
    },
    async addProperty() {
      await this.$axios
        .$post(`update_or_create_property`, this.add_property)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Property ${this.add_property.property_code} has been successfully edited.`
          );

          this.add_property = {
            dialog: false,
            date_modal: false,
            purchase_date_date: null,

            // Form
            id: null,
            brand: null,
            model: null,
            category: null,
            description: null,
            property_code: null,
            serial_number: null,
            purchase_date: null,
            maintenance: null,
            maintenance_description: null,
            // warranty_period: null,
          };

          this.add_property.dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getProperties();
    },
    async addCategory() {
      await this.$axios
        .$post(`add_category`, { name: this.category_name })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Category ${this.category_name} has been successfully added.`
          );

          this.category_name = "";

          this.category_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getCategories();
    },
    async deleteCategory(id) {
      await this.$axios
        .$post(`delete_category/${id}`)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Category ${this.category_name} has been successfully deleted.`
          );

          this.category_name = "";

          this.category_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getCategories();
    },

    async addModel() {
      await this.$axios
        .$post(`add_model`, { name: this.model_name })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Model ${this.model_name} has been successfully added.`
          );

          this.model_name = "";

          this.model_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getModels();
    },
    async deleteModel(id) {
      await this.$axios
        .$post(`delete_model/${id}`)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Model ${this.model_name} has been successfully deleted.`
          );

          this.model_name = "";

          this.model_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getModels();
    },

    async addBrand() {
      await this.$axios
        .$post(`add_brand`, { name: this.brand_name })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Brand ${this.brand_name} has been successfully added.`
          );

          this.brand_name = "";

          this.brand_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getBrands();
    },
    async deleteBrand(id) {
      await this.$axios
        .$post(`delete_brand/${id}`)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Brand ${this.brand_name} has been successfully deleted.`
          );

          this.brand_name = "";

          this.brand_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getBrands();
    },

    async addDescription() {
      await this.$axios
        .$post(`add_description`, { name: this.description_name })
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Description ${this.description_name} has been successfully added.`
          );

          this.description_name = "";

          this.description_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getDescriptions();
    },
    async deleteDescription(id) {
      await this.$axios
        .$post(`delete_description/${id}`)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(
            `Description ${this.description_name} has been successfully deleted.`
          );

          this.description_name = "";

          this.description_dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error);
        });

      this.getDescriptions();
    },

    async getModels() {
      const models = await this.$axios.$get(`models`).then((result) => {
        this.models = result.data;
      });
    },
    async getBrands() {
      const brands = await this.$axios.$get(`brands`).then((result) => {
        this.brands = result.data;
      });
    },
    async getDescriptions() {
      const descriptions = await this.$axios
        .$get(`descriptions`)
        .then((result) => {
          this.descriptions = result.data;
        });
    },
    async getCategories() {
      const categories = await this.$axios.$get(`categories`).then((result) => {
        this.categories = [{ name: "" }, ...result.data];
        this.filter_property_selected = result?.data[0]?.name;
      });
    },
    async getProperties() {
      this.selected_properties = [];
      const properties = await this.$axios.$get(`properties`).then((result) => {
        this.properties = result.data;
      });

      this.generatePropertyCode();
    },
    generatePropertyCode() {
      if (this.properties.length == 0) {
        let fomat =
          "TLC-" + new Date().getFullYear() + "-" + this.zeroPad(1, 3);
        this.add_property.property_code = fomat;
        return fomat;
      }
      let formatted_property_code =
        "TLC-" +
          new Date().getFullYear() +
          "-" +
          this.zeroPad(this.properties.at(-1).id + 1, 3) ??
        this.zeroPad(this.properties[0].id + 1, 3);

      this.add_property.property_code = formatted_property_code;
      return formatted_property_code;
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },

    printMR() {
      console.log(this.selected_properties);
    },
  },
  mounted() {
    this.getProperties();
    this.getCategories();
    this.getBrands();
    this.getModels();
    this.getDescriptions();

    // this.check_out_date = new Date(
    //   Date.now() - new Date().getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .substr(0, 10);
    // this.check_out_data.date = new Date(
    //   Date.now() - new Date().getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .substr(0, 10);
  },
};
</script>
