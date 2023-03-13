<template>
  <div class="container">
    <v-row>
      <v-col
        v-if="userMaintenances.length > 0"
        cols="12"
        xl="12"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <v-alert
          v-for="(maintenance, index) in userMaintenances"
          :key="index"
          color="error"
          dark
          icon="mdi-gesture-tap-button"
          border="left"
          prominent
        >
          <div>Property Code: {{ maintenance?.property_code }}</div>
          <div>
            Category:
            {{ maintenance?.category }}
          </div>
          <div>
            Location:
            {{ maintenance?.location }}
          </div>
          <div>
            Notes:
            {{ maintenance?.notes }}
          </div>
          <div>
            Custodian:
            {{ maintenance?.custodian }}
          </div>
          <div>
            Flagged:
            {{ maintenance?.flagged_date }}
          </div>
        </v-alert>
      </v-col>
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
      user_maintenances: [],
    };
  },
  computed: {
    userMaintenances() {
      return this.user_maintenances.filter(
        (property) => property.is_approved == 1
      );
    },
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

    async getUserMaintenances() {
      const properties = await this.$axios
        .$get(`user-maintenance`)
        .then((result) => {
          console.log(result.maintenances);
          this.user_maintenances = result.maintenances;
        });
    },
  },
  mounted() {
    this.getProperties();
    this.getUserMaintenances();
  },
};
</script>
