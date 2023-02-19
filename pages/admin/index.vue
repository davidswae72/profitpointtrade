<template>
  <v-container fluid>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10">
        <v-card flat dark color="dark" rounded="lg" class="pa-2">
          <v-card-text class="d-flex justify-space-between align-center">
            <div class="d-flex flex-column">
              <span class="text-h6 text-sm-h5 font-weight-bold secondary--text">
                {{ users && users.length }}</span
              >
              <span class="text-subtitle-1 light--text">Users</span>
            </div>
            <v-icon color="secodnary" left large>mdi-account-multiple</v-icon>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          :search="search"
          :loading="loading.users"
          loading-text="Loading... Please wait"
          :headers="Head"
          :items="users"
          sort-by="date"
          class="dark light--text"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Users
                <v-chip class="ml-2" color="secondary" small label outlined>
                  {{ users && users.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
              <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn color="secondary" outlined small @click="viewUser(item)">
              view
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "admin",

  data: () => ({
    search: "",
    Head: [
      {
        text: "Full Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },

      {
        text: "Date",
        value: "joinDate",
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapGetters({ loading: "admin/getLoading", state: "admin/getState" }),
    users() {
      const arr = this.state("users");
      // const arr = [
      //   {
      //     name: "John doe",
      //     email: "johndoe@gmial.com",
      //     joinDate: new Date().toLocaleDateString(),
      //   },
      // ];
      return arr;
    },
  },

  methods: {
    viewUser(payload) {
      console.log(payload);
      this.$router.push(`/admin/user/${payload.userID}`);
    },
  },
};
</script>

<style>
</style>