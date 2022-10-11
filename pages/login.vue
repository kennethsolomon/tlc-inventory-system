<template>
  <div class="fill-height">
    <!-- Mobile View -->
    <div class="fill-height justify-center d-flex d-md-none">
      <div
        class="d-flex flex-column fill-height justify-center align-center ma-2"
      >
        <img class="mb-15" src="/DICT_Logo.png" width="250vw" alt="DICT Logo" />

        <v-alert v-if="error" dense outlined type="error">
          {{ error }}
        </v-alert>
        <v-card class="ma-2">
          <v-card-title class="white--text text-h5 primary mb-3"
            >Login Form</v-card-title
          >
          <v-card-text>
            <Form :fields="fields" :button="button" @values="login" />
          </v-card-text>
        </v-card>
      </div>
    </div>
    <!-- Desktop View -->
    <div class="fill-height d-none d-md-block">
      <div class="d-flex flex-column fill-height justify-center align-center">
        <v-row class="d-flex align-center fill-height">
          <v-col class="fill-height pa-0" cols="8">
            <img
              width="100%"
              height="100%"
              src="/LoginImg.png"
              alt="LoginImg"
            />
          </v-col>
          <v-col
            class="d-flex flex-column justify-center align-center pa-0"
            cols="4"
          >
            <img
              class="mb-15"
              src="/DICT_Logo.png"
              width="250vw"
              alt="DICT Logo"
            />

            <v-alert v-if="error" dense outlined type="error">
              {{ error }}
            </v-alert>
            <v-card class="ma-2">
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
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  layout: "login",
  name: "LoginPage",
  middleware: "unAuthUser",
  data: () => ({
    error: null,
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
        type: "password",
      },
    ],
    button: {
      color: "primary",
      btn_name: "LOGIN",
      icon: "mdi-account-key",
    },
  }),
  methods: {
    login(event) {
      Parse.User.logIn(event.username, event.password).then(
        (result) => {
          // this.error = null;
          this.$router.push("/");
        },
        (error) => {
          console.log(error);
          this.error = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.img-cover {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
