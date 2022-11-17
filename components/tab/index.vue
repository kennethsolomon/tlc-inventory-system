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
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                :headers="table_headers"
                :items="data.data"
                :search="search"
                v-bind="dataTableBindings"
                class="elevation-1"
              >
                <template
                  v-if="group_by !== ''"
                  v-slot:group.header="{ items, isOpen, toggle }"
                >
                  <th
                    :colspan="table_headers.length"
                    style="cursor: pointer"
                    @click="toggle"
                  >
                    <v-btn :ref="items" small icon :data-open="isOpen">
                      <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
                      <v-icon v-else>mdi-chevron-down</v-icon>
                    </v-btn>
                    <span class="subtitle-1">
                      <strong></strong>{{ items[0][group_by] }}
                    </span>

                    <span class="subtitle-1" style="float: right"
                      ><strong> Total Amount: </strong
                      >{{
                        $convertToCurrency(
                          computeQuantity(items) * items[0].cost
                        )
                      }}
                    </span>
                    <span class="subtitle-1 mr-5" style="float: right"
                      ><strong> Quantity: </strong>{{ computeQuantity(items) }}
                    </span>
                  </th>
                </template>
                <template v-slot:[`item.date_received`]="{ item }">
                  {{ new Date(item.date_received).toISOString().split("T")[0] }}
                </template>
                <template v-slot:[`item.date_acquired`]="{ item }">
                  {{ new Date(item.date_acquired).toISOString().split("T")[0] }}
                </template>
                <template v-slot:[`item.stocks`]="{ item }">
                  <div class="d-flex">
                    <v-btn
                      class="primary mr-2"
                      fab
                      x-small
                      @click="stocks(item, 'deduct')"
                    >
                      <v-icon dark> mdi-minus </v-icon></v-btn
                    >
                    <v-btn
                      class="primary mr-2"
                      fab
                      x-small
                      @click="stocks(item, 'add')"
                    >
                      <v-icon dark> mdi-plus </v-icon></v-btn
                    >
                  </div>

                  <!-- <v-btn class="warning">Template</v-btn> -->
                </template>
                <template v-slot:[`item.template`]="{ item }">
                  <div class="d-flex">
                    <v-btn
                      class="primary mr-2"
                      fab
                      x-small
                      @click="template(item)"
                    >
                      <v-icon dark> mdi-content-copy </v-icon></v-btn
                    >
                  </div>

                  <!-- <v-btn class="warning">Template</v-btn> -->
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <div class="d-flex">
                    <v-btn class="primary mr-2" @click="edit(item)">Edit</v-btn>
                    <v-btn class="error" @click="destroy(item)">Delete</v-btn>
                  </div>

                  <!-- <v-btn class="warning">Template</v-btn> -->
                </template>

                <template v-slot:[`item.qr`]="{ item }">
                  <div class="d-flex">
                    <v-btn class="primary mr-2" fab x-small @click="qr(item)">
                      <v-icon dark>mdi-qrcode</v-icon></v-btn
                    >
                  </div>

                  <!-- <v-btn class="warning">Template</v-btn> -->
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- <DialogAdd
      v-if="dialog.add === true"
      :title="buttons.add.modal.title"
      :fields="buttons.add.modal.fields"
      :button="buttons.add.modal.button"
      :dialog="dialog.add"dataTableBindings
      @closeModal="dialog.add = false"
      @modal="modal"
    /> -->
    <qr
      v-if="qr_dialog === true"
      :qr_dialog="qr_dialog"
      :qr_data="qr_data"
      @closeQr="qr_dialog = false"
    ></qr>
    <!-- <v-btn
      :class="$vuetify.breakpoint.xs ? 'mr-0' : 'mr-3'"
      @click="qr_dialog = true"
      tile
      color="primary"
      :width="$vuetify.breakpoint.xs ? '100%' : ''"
    >
      <v-icon left>mdi-qrcode</v-icon>
      QR Dialog
    </v-btn> -->
  </v-card>
</template>

<script>
import Qr from "../property/dialog.qr.property.vue";

export default {
  name: "PropertyPage",
  props: {
    class_name: String, // for api call
    group_by: String,
    tab_name: Array,
    table_data: Array,
    table_headers: Array,
    buttons: Object, //(add-edit-delete): color, btn_name, icon , fields: array
  },
  computed: {
    dataTableBindings() {
      if (this.group_by !== "") {
        return {
          "group-by": this.group_by,
        };
      }
      return {};
    },
  },
  components: {
    Qr,
  },
  data: () => ({
    qr_dialog: false,
    qr_data: "",
    search: "",
    dialog: { add: false },
    tab: null,
  }),
  methods: {
    computeQuantity(items) {
      let quantity = 0;
      items.forEach((item) => {
        quantity += item.quantity;
      });

      return quantity;
    },
    qr(item) {
      let data = {
        property_name: item.property_name,
        description: item.description,
        property_code: item.property_code,
        location: item.location_info.name,
      };
      this.qr_data = JSON.stringify(data);
      console.log(item);
      this.qr_dialog = true;
    },
    closeQr() {
      this.qr_dialog = false;
    },
    edit(item) {
      this.$emit("edit_data", item);
    },
    stocks(item, type) {
      this.$emit("stocks", { item: item, type: type });
    },
    template(item) {
      this.$emit("template", item);
    },
    destroy(item) {
      this.$emit("destroy_data", item);
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
