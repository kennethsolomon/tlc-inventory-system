import colors from "vuetify/es5/util/colors";

export default {
  server: {
    // host: '172.30.128.22' // default: localhost ; uncomment this if your using ip address instead of localhost
    // host: '0.0.0.0' // default: localhost ; uncomment this if your using ip address instead of localhost
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - TLC Inventory System",
    title: "dict_inventory_system",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate.js",
    "~/plugins/tools.js",
    "~/plugins/axios",
    "~/plugins/persistedState.client.js",
  ],

  // Global Middleware
  router: {
    middleware: ["auth", "pre-load-data"],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://auth.nuxtjs.org/guide/setup/
    "@nuxtjs/auth-next",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
  ],

  toast: {
    position: "bottom-center",
    duration: 3000,
    register: [
      // Register custom toasts
      {
        // To call u need to call
        // this.$toast.global.custom-toast("message");
        name: "test",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8000/api/v3", // change ip address if using mobile phone
    credentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  auth: {
    strategies: {
      cookie: {
        cookie: {
          name: "XSRF-TOKEN",
        },
      },
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "http://localhost:8000", // change to ip address if using mobile phone
        endpoints: {
          csrf: {
            url: "/sanctum/csrf-cookie",
          },
          login: {
            url: "/api/login",
          },
          logout: {
            url: "/api/logout",
          },
          user: {
            url: "/api/user",
          },
        },
        user: {
          property: "id",
        },
      },
    },

    redirect: {
      login: "/login",
      logout: "/login",
      home: "/",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#0E2A47",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
};
