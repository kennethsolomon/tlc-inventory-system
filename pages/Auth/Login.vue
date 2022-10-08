<template>
  <div
    :min-height="$vuetify.breakpoint.xs ? 300 : '20vh'"
    :rounded="$vuetify.breakpoint.xsOnly"
    class="d-flex fill-height justify-center align-center"
  >
    <v-row class="d-flex align-center fill-height">
      <v-col class="fill-height grey pa-0" cols="8">
        <!-- <img width="1285px" height="100%" src="/LoginImg.png" alt="LoginImg" /> -->
        <img width="100%" height="100%" src="/LoginImg.png" alt="LoginImg" />
      </v-col>
      <v-col
        class="d-flex flex-column fill-height justify-center align-center pa-0"
        cols="4"
      >
        <img class="mb-15" src="/DICT_Logo.png" width="250vw" alt="DICT Logo" />

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
      icon: "mdi-account-key",
    },
  }),

  methods: {
    login(event) {
      console.log("event", event);
    },
  },
};
</script>

<style scoped>
.img-size {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
