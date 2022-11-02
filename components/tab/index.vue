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
              <v-data-table
                :headers="table_headers"
                :items="data.data"
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
                      <strong>{{ items[0].purchaser }}</strong>
                    </span>
                    <!-- <span class="subtitle-1" style="float: right"
                      ><strong
                        >Total:
                        {{
                          buildTotalOrderByItem[
                            items[0].item_name
                          ].toLocaleString("en-US")
                        }}</strong
                      ></span
                    > -->
                  </th>
                </template>
                <template v-slot:[`item.date_received`]="{ item }">
                  {{ new Date(item.date_received).toISOString().split("T")[0] }}
                </template>
                <template v-slot:[`item.date_acquired`]="{ item }">
                  {{ new Date(item.date_acquired).toISOString().split("T")[0] }}
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn class="primary" @click="edit(item)">Edit</v-btn>
                  <v-btn class="error" @click="destroy(item)">Delete</v-btn>
                  <v-btn class="warning">Template</v-btn>
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
  </v-card>
</template>

<script>
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
  data: () => ({
    dialog: { add: false },
    tab: null,
  }),
  methods: {
    edit(item) {
      this.$emit("edit_data", item);
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
