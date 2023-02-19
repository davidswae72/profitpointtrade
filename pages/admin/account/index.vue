<template>
  <v-container fluid>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10">
        <v-card dark color="dark">
          <v-card-title
            class="text-subtitle-1 d-flex align-center justify-space-between"
          >
            <v-btn fab small color="secondary" icon @click="$router.go(-1)">
              <v-icon size="20">mdi-arrow-left</v-icon>
            </v-btn>
            <span class="ml-2 text-h6 font-weight-bold">{{
              user && user.name
            }}</span>
            <v-chip small label class="ml-2" color="warning dark--text"
              >Admin</v-chip
            >
            <v-spacer></v-spacer>

            <v-menu dark left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  icon
                  v-on="on"
                  text
                  small
                  color="secondary"
                  >Edit</v-btn
                >
              </template>

              <v-list dark color="dark">
                <v-list-item dense @click="toggleSecurity(true)">
                  <v-list-item-icon>
                    <v-icon size="20" class="px-1"> mdi-account-lock </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Security</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>

          <v-card-text class="font-weight-bold light--text">
            <div class="d-flex align-center text-subtitle-2 text-sm-subtitle-1">
              <span class="font-weight-bold">Email</span>
              <span class="ml-2">{{ user && user.email }}</span>
            </div>
            <div class="d-flex align-center text-subtitle-2 text-sm-subtitle-1">
              <span class="font-weight-bold">Password</span>
              <span class="ml-2">{{ user && user.password }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="10"
        class="mt-2 white--text text-subtitle-1 text-sm-h6 d-flex pb-0"
      >
        Wallet Address
        <v-spacer></v-spacer>
        <v-btn
          @click="$router.push(`/admin/account/wallets/add`)"
          depressed
          color="secondary dark--text"
          class="rounded-lg text-subtitle-2"
          >Add</v-btn
        >
      </v-col>
      <v-col cols="12" md="10" class="pb-0">
        <v-progress-linear
          v-if="loading.wallet"
          indeterminate
          color="secondary"
        />
      </v-col>
      <v-col v-for="(wallet, i) in wallets" :key="i" cols="12" md="10" class="">
        <v-card flat dark color="dark">
          <v-card-text class="d-flex flex-column">
            <div class="font-weight-bold d-flex items-center">
              <span class="secondary--text"> {{ wallet && wallet.name }}</span>
              <v-spacer></v-spacer>

              <v-menu dark left bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    v-on="on"
                    text
                    small
                    color="secondary"
                    ><v-icon>mdi-dots-vertical</v-icon></v-btn
                  >
                </template>

                <v-list dark color="primary">
                  <v-list-item
                    class="light--text"
                    dense
                    @click="
                      $router.push(
                        `/admin/account/wallets/edit/${wallet && wallet.id}`
                      )
                    "
                  >
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    class="error--text"
                    dense
                    @click="deleteFN(wallet)"
                  >
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="light--text">{{ wallet && wallet.address }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "admin",
  filters: {
    currency(val) {
      if (val) {
        val = parseFloat(val);
        return val.toLocaleString("en-US", {
          style: "currency",
          code: "US",
          currency: "USD",
        });
      } else {
      }
    },
  },
  data: () => ({
    valid: true,
    drawer: {
      security: false,
      wallet: false,
    },
  }),
  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "admin/getLoading",
      state: "admin/getState",
    }),
    wallets() {
      return this.state("wallets");
    },
  },
  methods: {
    ...mapActions({
      deleteWallet: "admin/deleteWallet",
      initAlert: "controller/initAlert",
    }),
    toggleSecurity(state) {
      this.drawer.security = state;
    },
    toggleWallet(state) {
      this.drawer.wallet = state;

      console.log(this.drawer);
    },

    deleteFN(wallet) {
      this.deleteWallet(wallet);
    },
  },
};
</script>

<style></style>
