<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
    <button @click="logOut()">logout</button>
  </v-row>
</template>

<script>
import Parse from "parse";
export default {
  name: "InspirePage",
  methods: {
    logOut() {
      Parse.User.logOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
