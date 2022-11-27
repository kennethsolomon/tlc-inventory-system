<template>
  <div class="text-center">
    <v-dialog
      v-model="qr_dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          QR CODE
          <v-icon @click="$emit('closeQr')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text
          id="printMe"
          class="d-flex justify-center mt-5"
          v-if="qr_data"
        >
          <qrcode-vue render-as="svg" :value="qr_data" :size="150" level="H" />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="print()" color="primary">
            <v-icon small class="mr-1"> mdi-print</v-icon>
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

Vue.use(VueHtmlToPaper);

import QrcodeVue from "qrcode.vue";
export default {
  props: {
    qr_data: [Object, String],
    qr_dialog: Boolean,
  },
  components: {
    QrcodeVue,
  },
  data() {
    return {};
  },

  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
  },
};
</script>

<style scoped></style>
