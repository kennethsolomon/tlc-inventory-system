<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2">{{ items[tab] }}</h1>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search ..."
              single-line
              hide-details
              class="mb-2"
            ></v-text-field>
            <template>
              <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                sort-by="fullname"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="add_dialog = true"
                      class="primary mr-2"
                      medium
                    >
                      <v-icon class="mr-2" dark> mdi-plus </v-icon>Add
                      User</v-btn
                    >
                  </v-toolbar>
                </template>
                <template v-slot:item.view_more="{ item }">
                  <v-btn class="primary" small @click="editDialog(item)">
                    <v-icon dark> mdi-pen </v-icon></v-btn
                  >
                  <v-btn class="error" small @click="deleteUser(item)">
                    <v-icon dark> mdi-delete </v-icon></v-btn
                  >
                </template>

                <template v-slot:no-data>
                  <h1>No Data Found ...</h1>
                </template>
              </v-data-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- Add Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="add_dialog" width="350" class="primary" persistent>
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Add Dialog
              <v-icon @click="add_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="Username"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                type="password"
                label="Password"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.password_confirmation"
                type="password"
                label="Confirm Password"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.firstname"
                label="First Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.middlename"
                label="Middle Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.lastname"
                label="Last Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.position"
                label="Position"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-autocomplete
                v-model="form.role"
                :items="roles"
                label="Select Role"
                solo
                flat
              ></v-autocomplete>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="addUser()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <!-- Edit Dialog -->
    <template>
      <div class="text-center">
        <v-dialog v-model="edit_dialog" width="350" class="primary" persistent>
          <v-card>
            <v-card-title
              class="d-flex justify-space-between text-h5 primary white--text"
            >
              Edit Dialog
              <v-icon @click="edit_dialog = false" color="white"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="Username"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                type="password"
                label="Password"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.password_confirmation"
                type="password"
                label="Confirm Password"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.firstname"
                label="First Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.middlename"
                label="Middle Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.lastname"
                label="Last Name"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="form.position"
                label="Position"
                hide-details
                class="mb-2"
              ></v-text-field>
              <v-autocomplete
                v-model="form.role"
                :items="roles"
                label="Select Role"
                solo
                flat
              ></v-autocomplete>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" color="white" text @click="editUser()">
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        "Administrator",
        "Technician",
        "Property Custodian",
        "Borrower",
        "Super Admin",
        "Maintenance",
      ],
      edit_dialog: false,
      add_dialog: false,
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        position: "",
        role: "Property Custodian",
      },
      tab: 0,
      items: ["User Management"],
      search: null,

      headers: [
        {
          text: "Username",
          value: "email",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "fullname",
        },
        {
          text: "Position",
          value: "position",
        },
        {
          text: "Role",
          value: "role",
        },
        { text: "View More", value: "view_more", sortable: false },
      ],
    };
  },
  async asyncData({ params, $axios }) {
    const [user_db] = await Promise.all([$axios.get(`users/`)]);
    return {
      users: user_db.data,
    };
  },
  methods: {
    async deleteUser(item) {
      await this.$axios
        .$post(`delete-user/${item.id}`, {})
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(`User has been successfully deleted.`);
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },

    async addUser() {
      await this.$axios
        .$post(`update-or-create-user`, this.form)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(`User has been successfully added.`);
          this.add_dialog = false;
          this.formReset();
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },

    async editUser() {
      await this.$axios
        .$post(`update-or-create-user`, this.form)
        .then(async (result) => {
          await this.$nuxt.refresh();
          this.$toast.success(`User has been successfully updated.`);
          this.edit_dialog = false;
          this.formReset();
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },

    async editDialog(item) {
      this.form.id = item.id;
      this.form.firstname = item.firstname;
      this.form.middlename = item.middlename;
      this.form.lastname = item.lastname;
      this.form.role = item.role;
      this.form.email = item.email;
      this.form.position = item.position;
      this.edit_dialog = true;
    },

    formReset() {
      this.form = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        position: "",
        role: "",
      };
    },
  },
};
</script>
