<template>
  <div class="text-center">
    <v-dialog
      v-model="camera_dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Scan QR
          <v-icon @click="$emit('closeCamera')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center">
          <div>
            <p v-if="error" class="error">{{ error }}</p>
            <qrcode-stream
              class="mt-3"
              v-if="!destroyed"
              @decode="onDecode"
              @init="onInit"
            />
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="reload()" color="primary">
            <v-icon small class="mr-1"> mdi-print</v-icon>
            Reload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <QrUi
      v-if="qr_ui_dialog === true"
      :qr_ui_dialog="qr_ui_dialog"
      :qr_ui_data="qr_ui_data"
      @closeQr="closeQrUi()"
    ></QrUi>
  </div>
</template>

<script>
import QrUi from "../property/dialog.qr.ui.property.vue";
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  props: {
    camera_dialog: Boolean,
  },
  components: {
    QrcodeStream,

    QrUi,
  },

  data() {
    return {
      destroyed: false,
      qr_ui_dialog: false,
      qr_ui_data: "",
      result: "",
      error: null,
    };
  },

  methods: {
    async reload() {
      this.destroyed = true;

      await this.$nextTick();

      this.destroyed = false;
    },
    closeQrUi() {
      this.qr_ui_dialog = false;
      //   this.$emit("closeCamera");
    },
    onDecode(result) {
      this.result = result;
      this.qr_ui_dialog = true;
      this.qr_ui_data = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
  },
};
</script>

<style scoped></style>
