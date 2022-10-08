<template>
  <div class="d-flex fill-height justify-center align-center">
    <v-row class="d-flex align-center fill-height">
      <v-col
        class="d-flex flex-column fill-height justify-center align-center grey pa-5 ma-0"
        cols="8"
      >
        <div class="">Hello</div>
        <v-card width="50%">
          <v-card-title class="white--text text-h5 primary mb-3"
            >Login Form</v-card-title
          >
          <v-card-text>
            <Form :fields="fields" :button="button" @values="login" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="d-flex flex-column fill-height justify-center align-center pa-5 ma-0"
        cols="4"
      >
        <img class="mb-15" src="/DICT_Logo.png" width="250px" alt="DICT Logo" />

        <v-card>
          <v-card-title class="white--text text-h5 primary mb-3"
            >Login Form</v-card-title
          >
          <v-card-text>
            <Form :fields="fields" :button="button" @values="login" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DefaultPage",
  data: () => ({
    fields: [
      {
        cols: 1,
        name: "username",
        title: "Username",
        rules: "required",
        type: "text",
      },
      {
        cols: 1,
        name: "password",
        title: "Password",
        rules: "required",
        type: "text",
      },
    ],
    button: {
      color: "primary",
      btn_name: "LOGIN",
      icon: "mdi-cash-check",
    },
  }),

  methods: {
    login(event) {
      console.log("event", event);
    },
  },
};
</script>

<style scoped></style>
