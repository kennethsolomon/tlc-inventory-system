<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div class="d-flex flex-column justify-space-between fill-height">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-center">
                <img src="/DICT_Logo.png" width="200vw" alt="DICT Logo" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <div>
                <v-list-item-title class="d-flex align-center fill-width">
                  <v-avatar class="mb-2 mx-3 mr-5" color="indigo">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                  <div class="d-flex flex-column">
                    <span>Kenneth Solomon</span>
                    <span>CHED - PTS III</span>
                  </div>
                </v-list-item-title>
              </div>
              <v-divider class="primary"></v-divider>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item @click="logOut()">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="d-flex fill-height">
        <v-container>
          <Nuxt />
        </v-container>
        <!-- <Sidebar /> -->
      </div>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Parse from "parse";
export default {
  name: "InitializePage",
  data() {
    return {
      isLoggedIn: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-application-cog",
          title: "Property",
          to: "/property",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Inventory System",

      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
    };
  },
  methods: {
    logOut() {
      Parse.User.logOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
