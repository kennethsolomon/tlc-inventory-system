<template>
  <v-app dark>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      fixed: false,
    };
  },
  mounted() {
    // if (Parse.User.current()) {
    //   this.$router.push("/");
    // }
  },
};
</script>
