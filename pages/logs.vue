<template>
  <v-row class="container fluid">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Logs
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="logs" :search="search">
          <template v-slot:[`item.created_at`]="{ item }">
            <p>{{ item.created_at.split("T")[0] }}</p>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "admin",
  data: () => ({
    search: "",
    headers: [
      {
        text: "User",
        align: "start",
        sortable: false,
        value: "user",
      },
      { text: "Action", value: "action" },
      { text: "Description", value: "description" },
      { text: "Date", value: "created_at" },
    ],

    logs: [],
  }),
  methods: {
    getLogs() {
      this.$store.dispatch("getLogs").then((result) => {
        console.log(result);
        this.logs = result;
      });
    },
  },
  mounted() {
    this.getLogs();
  },
};
</script>

<style scoped></style>
