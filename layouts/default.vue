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
                <img src="/TLC_LOGO.png" width="200vw" alt="DICT Logo" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <div>
                <v-list-item-title
                  class="d-flex justify-center align-center fill-width"
                >
                  <!-- <v-avatar class="mb-2 mx-3 mr-5" color="indigo">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar> -->
                  <!-- <div class="d-flex flex-column">
                    <span>Kenneth Solomon</span>
                    <span>CHED - PTS III</span>
                  </div> -->
                  <div
                    class="d-flex flex-column justify-center my-2"
                    style="cursor: pointer"
                    @click="updateAccount"
                  >
                    <span class="align-self-center">{{
                      $store.state.user.user?.firstname +
                      " " +
                      ($store.state.user.user?.middlename
                        ? $store.state.user.user?.middlename
                        : "") +
                      " " +
                      $store.state.user.user?.lastname
                    }}</span>
                    <span class="align-self-center font-weight-bold mb-1">{{
                      $store.state.user.user?.position
                    }}</span>
                    <span class="align-self-center">
                      <v-chip color="primary" text-color="white">
                        <v-avatar left>
                          <v-icon>mdi-account-circle</v-icon>
                        </v-avatar>

                        {{ $store.state.user.user?.role }}
                      </v-chip></span
                    >
                  </div>
                  <!-- Sample for update Dialog -->
                  <UpdateAccount
                    v-if="update_account_dialog === true"
                    :dialog="update_account_dialog"
                    :button="{
                      color: 'primary',
                      btn_name: 'Save',
                      icon: 'mdi-content-save',
                    }"
                    action="updateUser"
                    :id="update_account_id"
                    :fields="fields"
                    className="update_account"
                    title="Update Account"
                    @closeModal="update_account_dialog = false"
                    @callBack="updatedAccount"
                  />
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
        <!-- <v-list>
          <v-list-item @click="logOut()">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-icon class="mr-2">mdi-chart-bar-stacked</v-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <!-- <v-btn icon @click.stop="camera()">
        <v-icon>mdi-camera</v-icon>
      </v-btn>

      <Camera
        v-if="camera_dialog === true"
        :camera_dialog="camera_dialog"
        @closeCamera="closeCamera"
      ></Camera> -->

      <v-btn icon @click.stop="logOut()">
        <v-icon>mdi-logout</v-icon>
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
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import UpdateAccount from "../components/dialog/dialog.update.vue";
import Camera from "../components/dialog/dialog.camera.vue";
export default {
  name: "InitializePage",
  components: {
    UpdateAccount,
    Camera,
  },
  data() {
    return {
      camera_dialog: false,
      update_account_dialog: false,
      update_account_id: null,
      isLoggedIn: false,
      clipped: false,
      drawer: true,
      fixed: false,
      // Update Account
      fields: [],
      // Update Account
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Inventory System",
      loading: true,
    };
  },
  methods: {
    camera() {
      this.camera_dialog = true;
    },
    closeCamera() {
      this.camera_dialog = false;
    },
    updateAccount() {
      const { id, firstname, middlename, lastname, position, email } =
        this.$store.state.user.user;
      this.update_account_id = id;
      this.fields = [
        {
          cols: 1,
          name: "email",
          title: "Username",
          rules: "required",
          disabled: true,
          value: email,
          type: "text",
        },
        {
          cols: 1,
          name: "password",
          title: "Password",
          rules: "required",
          type: "password",
        },
        {
          cols: 1,
          name: "firstname",
          title: "First Name",
          rules: "required",
          value: firstname,
          type: "text",
        },
        {
          cols: 1,
          name: "middlename",
          title: "Middle Name",
          value: middlename,
          type: "text",
        },
        {
          cols: 1,
          name: "lastname",
          title: "Last Name",
          rules: "required",
          value: lastname,
          type: "text",
        },
        {
          cols: 1,
          name: "position",
          title: "Position",
          rules: "required",
          value: position,
          type: "text",
        },
      ];

      this.update_account_dialog = !this.update_account_dialog;
    },
    async updatedAccount() {
      await this.$axios.$get("user").then((result) => {
        this.$store.commit("SET_USER", result);

        this.$toast.success(
          `${result?.firstname} ${result?.middlename} ${result?.lastname} info has updated successfully.`
        );

        this.update_account_dialog = false;
      });
    },
    async logOut() {
      try {
        await this.$auth.logout();
        sessionStorage.clear();
      } catch (error) {
        console.log(error);
      }
    },

    adminSidebar() {
      this.items = [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-file-cabinet",
          title: "Property",
          to: "/property",
        },
        {
          icon: "mdi-transfer-right",
          title: "Lend",
          to: "/lend",
        },
        {
          icon: "mdi-calendar",
          title: "Maintenance",
          to: "/maintenance",
        },

        {
          icon: "mdi-account",
          title: "User Management",
          to: "/user-management",
        },
      ];
    },
    maintenanceSidebar() {
      this.items = [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-file-cabinet",
          title: "Property",
          to: "/property",
        },
        {
          icon: "mdi-calendar",
          title: "Maintenance",
          to: "/maintenance",
        },
      ];
    },
    custodianSidebar() {
      this.items = [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-file-cabinet",
          title: "Property",
          to: "/property",
        },
        {
          icon: "mdi-transfer-right",
          title: "Lend",
          to: "/lend",
        },
      ];
    },
    borrowerSidebar() {
      this.items = [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-file-cabinet",
          title: "Property",
          to: "/property",
        },
        {
          icon: "mdi-transfer-right",
          title: "Borrow",
          to: "/lend-borrower",
        },
        {
          icon: "mdi-calendar",
          title: "Maintenance",
          to: "/maintenance-borrower",
        },
      ];
    },
  },
  mounted() {
    if (this.$store.getters.getUser?.role === "Property Custodian") {
      this.custodianSidebar();
    } else if (this.$store.getters.getUser?.role === "Technician") {
      this.maintenanceSidebar();
    } else if (this.$store.getters.getUser?.role === "Borrower") {
      this.borrowerSidebar();
    } else {
      this.adminSidebar();
    }
  },
};
</script>
