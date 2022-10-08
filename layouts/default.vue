<template>
  <v-app v-if="isLoggedIn" dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
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
      <v-container>
        <Nuxt />
      </v-container>
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
  <v-app v-else>
    <Login />
  </v-app>
</template>

<script>
// DATABASE_URI= 'mongodb://localhost:27017/dict'
// APP_ID= 'kKZjv48tx9fb4BljvtSuP88h'
// MASTER_KEY= '4OU2x5n9z6zv10vLanxgMvjr'
// SERVER_URL= 'http://localhost:1337/api'
import Parse from "parse";
const xtDjR1mw4jvvLZhW =
  (function () {
    var v = Array.prototype.slice.call(arguments),
      p = v.shift();
    return v
      .reverse()
      .map(function (z, i) {
        return String.fromCharCode(z - p - 32 - i);
      })
      .join("");
  })(53, 213, 208, 147, 142, 207, 194, 177, 161, 192) +
  (439744).toString(36).toLowerCase() +
  (18)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (S) {
      return String.fromCharCode(S.charCodeAt() + -39);
    })
    .join("") +
  (27931).toString(36).toLowerCase() +
  (function () {
    var l = Array.prototype.slice.call(arguments),
      j = l.shift();
    return l
      .reverse()
      .map(function (u, d) {
        return String.fromCharCode(u - j - 31 - d);
      })
      .join("");
  })(26, 140, 176, 141, 173) +
  (8).toString(36).toLowerCase() +
  (function () {
    var E = Array.prototype.slice.call(arguments),
      i = E.shift();
    return E.reverse()
      .map(function (A, N) {
        return String.fromCharCode(A - i - 52 - N);
      })
      .join("");
  })(14, 171, 122);
const gnDRaFL479FmmLzh =
  (4).toString(36).toLowerCase() +
  (31)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (m) {
      return String.fromCharCode(m.charCodeAt() + -39);
    })
    .join("") +
  (11)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (n) {
      return String.fromCharCode(n.charCodeAt() + -13);
    })
    .join("") +
  (6358432578).toString(36).toLowerCase() +
  (function () {
    var l = Array.prototype.slice.call(arguments),
      p = l.shift();
    return l
      .reverse()
      .map(function (Z, h) {
        return String.fromCharCode(Z - p - 60 - h);
      })
      .join("");
  })(16, 157, 198, 127, 127, 195, 198) +
  (497572).toString(36).toLowerCase() +
  (function () {
    var T = Array.prototype.slice.call(arguments),
      u = T.shift();
    return T.reverse()
      .map(function (W, F) {
        return String.fromCharCode(W - u - 37 - F);
      })
      .join("");
  })(10, 166, 124) +
  (711).toString(36).toLowerCase();
Parse.serverURL = "http://localhost:1337/api";
Parse.initialize(xtDjR1mw4jvvLZhW, gnDRaFL479FmmLzh);
const I9KGmqPDcBSmqIdi =
  (26)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (J) {
      return String.fromCharCode(J.charCodeAt() + -39);
    })
    .join("") +
  (996).toString(36).toLowerCase() +
  (24)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (O) {
      return String.fromCharCode(O.charCodeAt() + -71);
    })
    .join("") +
  (17)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (W) {
      return String.fromCharCode(W.charCodeAt() + -39);
    })
    .join("") +
  (25).toString(36).toLowerCase() +
  (994)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (X) {
      return String.fromCharCode(X.charCodeAt() + -71);
    })
    .join("") +
  (26404).toString(36).toLowerCase() +
  (11)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (A) {
      return String.fromCharCode(A.charCodeAt() + -39);
    })
    .join("") +
  (19)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (G) {
      return String.fromCharCode(G.charCodeAt() + -13);
    })
    .join("") +
  (1021)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (Y) {
      return String.fromCharCode(Y.charCodeAt() + -39);
    })
    .join("") +
  (21)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (n) {
      return String.fromCharCode(n.charCodeAt() + -71);
    })
    .join("") +
  (22)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (H) {
      return String.fromCharCode(H.charCodeAt() + -13);
    })
    .join("") +
  (21)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (V) {
      return String.fromCharCode(V.charCodeAt() + -39);
    })
    .join("") +
  (function () {
    var K = Array.prototype.slice.call(arguments),
      V = K.shift();
    return K.reverse()
      .map(function (Q, i) {
        return String.fromCharCode(Q - V - 2 - i);
      })
      .join("");
  })(62, 177, 191, 175, 126, 175, 122, 138, 169) +
  (28).toString(36).toLowerCase() +
  (16)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (d) {
      return String.fromCharCode(d.charCodeAt() + -13);
    })
    .join("") +
  (21).toString(36).toLowerCase() +
  (18)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (T) {
      return String.fromCharCode(T.charCodeAt() + -39);
    })
    .join("") +
  (20)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (o) {
      return String.fromCharCode(o.charCodeAt() + -71);
    })
    .join("") +
  (22108).toString(36).toLowerCase() +
  (22)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (N) {
      return String.fromCharCode(N.charCodeAt() + -39);
    })
    .join("") +
  (17)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (e) {
      return String.fromCharCode(e.charCodeAt() + -13);
    })
    .join("") +
  (8).toString(36).toLowerCase() +
  (28)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (m) {
      return String.fromCharCode(m.charCodeAt() + -39);
    })
    .join("") +
  (14)
    .toString(36)
    .toLowerCase()
    .split("")
    .map(function (t) {
      return String.fromCharCode(t.charCodeAt() + -13);
    })
    .join("") +
  (12).toString(36).toLowerCase();
Parse.enableEncryptedUser();
Parse.secret = I9KGmqPDcBSmqIdi;
Parse.enableLocalDatastore();

import Login from "@/pages/Auth/Login.vue";
export default {
  name: "InitializePage",
  components: {
    Login,
  },
  data() {
    return {
      isLoggedIn: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
