<template>
  <div class="text-center">
    <v-dialog
      v-model="qr_ui_dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          QR Data
          <v-icon @click="$emit('closeQr')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text
          class="d-flex flex-column justify-center mt-5"
          v-if="qr_ui_data"
        >
          <v-text-field
            readonly
            dense
            label="Property Name"
            :value="data.property_name"
          ></v-text-field>

          <v-text-field
            readonly
            dense
            label="Property Code"
            :value="data.property_code"
          ></v-text-field>

          <v-text-field
            readonly
            dense
            label="Description"
            :value="data.description"
          ></v-text-field>

          <v-text-field
            readonly
            dense
            label="Location"
            :value="data.location"
          ></v-text-field>

          <v-text-field
            readonly
            dense
            label="Received By"
            :value="data.received_by"
          ></v-text-field>

          <v-text-field
            readonly
            dense
            label="Office"
            :value="data.received_by_office"
          ></v-text-field>
        </v-card-text>
        <!-- <v-divider></v-divider> -->

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            <v-icon small class="mr-1"> mdi-print</v-icon>
            Print
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    qr_ui_data: [Object, String],
    qr_ui_dialog: Boolean,
  },

  data() {
    return {
      data: "",
    };
  },

  methods: {},
  mounted() {
    this.data = JSON.parse(this.qr_ui_data);
  },
};
</script>

<style scoped></style>
