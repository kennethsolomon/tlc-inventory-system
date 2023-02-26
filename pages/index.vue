<template>
  <div class="container">
    <v-row>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
        <v-alert
          color="primary"
          dark
          icon="mdi-gesture-tap-button"
          border="left"
          prominent
        >
          Assigned to Action Needed: {{ needTransfer.length }}
        </v-alert>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
        <v-alert
          color="primary"
          dark
          icon="mdi-account-tie"
          border="left"
          prominent
        >
          In Custody Property: {{ inCustody.length }}
        </v-alert>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
        <v-alert
          color="primary"
          dark
          icon="mdi-close-circle-outline"
          border="left"
          prominent
        >
          Unavailable Property: {{ unAvailable.length }}
        </v-alert>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
        <v-alert color="primary" dark icon="mdi-tools" border="left" prominent>
          In Repair Property: {{ inRepair.length }}
        </v-alert>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
        <v-alert
          color="primary"
          dark
          icon="mdi-trash-can-outline"
          border="left"
          prominent
        >
          Disposed Property: {{ disposed.length }}
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      properties: [],
    };
  },
  computed: {
    needTransfer() {
      return this.properties.filter((property) => property.status == "");
    },

    inCustody() {
      return this.properties.filter(
        (property) => property.status == "In Custody"
      );
    },
    unAvailable() {
      return this.properties.filter(
        (property) => property.status == "Unavailable"
      );
    },
    disposed() {
      return this.properties.filter(
        (property) => property.status == "Disposed"
      );
    },
    inRepair() {
      return this.properties.filter(
        (property) => property.status == "In Repair"
      );
    },
  },
  methods: {
    async getProperties() {
      const properties = await this.$axios.$get(`properties`).then((result) => {
        this.properties = result.data;
      });
    },
  },
  mounted() {
    this.getProperties();
  },
};
</script>
