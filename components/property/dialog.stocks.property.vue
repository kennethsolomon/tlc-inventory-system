<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.xs ? '90vw' : '20vw'"
      persistent
    >
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          {{ title }}
          <v-icon @click="$emit('closeModal')" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-5">
          <Input
            :title="field_title"
            name="quantity"
            type="number"
            rules="required"
            :value="stocks_data.item.quantity"
            @model="model($event, 'quantity')"
          />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="stocks()" color="primary">
            <v-icon small class="mr-1"> mdi-content-save</v-icon>
            Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    end_point: String, // for api call
    stocks_data: Object,
    dialog: Boolean,
    title: String,
  },
  data: () => ({
    field_title: null,
    data: null,
    form: {
      quantity: 0,
    },
  }),
  methods: {
    async stocks() {
      if (
        this.data.quantity < this.form.quantity &&
        this.stocks_data.type === "deduct"
      ) {
        this.$toast.error("Not Enought Stock/Stocks.");
      } else {
        this.data.quantity =
          this.stocks_data.type === "deduct"
            ? (this.data.quantity -= this.form.quantity)
            : (this.data.quantity += this.form.quantity);

        await this.$axios
          .$post(`update_or_create_item`, this.data)
          .then((result) => {
            this.$emit("confirmStocks", result);
            this.$emit("closeModal");
          });
      }
    },

    model(event, field) {
      this.form[field] = event;
    },
  },
  mounted() {
    this.data = this.stocks_data.item;
    this.field_title =
      this.stocks_data.type === "deduct" ? "Deduct Quantity" : "Add Quantity";
  },
};
</script>

<style scoped></style>
