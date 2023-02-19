<template>
  <v-container>
    <v-row :justify="center" class="ma-0">
      <v-col cols="12" class="py-0">
        <v-btn fab small color="secondary" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" lg="4">
        <w-wallet-card :type="2" />
      </v-col>
      <v-col cols="12" lg="8">
        <v-card
          v-if="user && user.trader"
          flat
          color="primary"
          class="px-2"
          rounded="xl"
        >
          <v-card-text class="px-0">
            <v-row justify="center" class="ma-0">
              <v-col cols="12" sm="5" class="d-flex align-center">
                <v-avatar color="secondary">
                  <v-img src="logo1.svg"></v-img>
                </v-avatar>
                <div
                  style="width: 100%"
                  class="light--text d-flex flex-column ml-2"
                >
                  <div class="d-flex align-center">
                    <span class="text-h6 font-weight-bold">{{
                      user && user.trader.name
                    }}</span>
                    <v-spacer></v-spacer>
                    <v-chip
                      label
                      color="secondary dark--text"
                      class="text-caption"
                      >{{ user && user.trader.risk }} risk</v-chip
                    >
                  </div>
                  <span class="text-caption d-flex align-center mt-n1">
                    <v-icon x-small color="secondary" class="mr-1"
                      >mdi-star</v-icon
                    >
                    {{ user && user.trader.achiever }} achiever
                  </span>
                </div>
              </v-col>

              <v-col
                cols="12"
                sm="7"
                class="d-flex align-center justify-space-around"
              >
                <div class="d-flex align-center justify-space-around">
                  <div class="d-flex flex-column">
                    <span class="light--text text-caption">Gain</span>
                    <span
                      class="secondary--text text-subtitle-1 text-sm-h6 mt-n1 font-weight-bold"
                      >+{{ user && user.trader.gain }}%</span
                    >
                  </div>
                  <div class="d-flex flex-column ml-3">
                    <span class="light--text text-caption">Coppiers</span>
                    <span
                      class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                      >{{ user && user.trader.coppiers }}</span
                    >
                  </div>
                  <div class="d-flex flex-column ml-3">
                    <span class="light--text text-caption">Commission</span>
                    <span class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                      >{{ user && user.trader.commission }}%</span
                    >
                  </div>
                </div>

                <div
                  class="ml-3 border-13 py-4 px-2"
                  style="border: 1px solid #fcd435; background-color: black"
                >
                  <v-icon size="30" color="secondary" class="flashit"
                    >mdi-arrow-up</v-icon
                  >
                  <v-icon size="30" color="error" class="flashit"
                    >mdi-arrow-down</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 mt-2">
      <v-col cols="12">
        <w-container
          :loading="loading.trader"
          dark
          class="primary"
          title="Top Traders"
        >
          <v-row class="ma-0">
            <v-col
              v-for="(item, i) in traders"
              :key="i"
              cols="12"
              sm="6"
              lg="4"
            >
              <v-card flat color="primary darken-1 rounded-lg px-0">
                <v-card-text class="">
                  <v-row class="ma-0">
                    <v-col cols="12" class="px-0 d-flex align-center">
                      <v-avatar color="secondary">
                        <v-img src="logo1.svg"></v-img>
                      </v-avatar>
                      <div
                        style="width: 100%"
                        class="light--text d-flex flex-column ml-2"
                      >
                        <div class="d-flex align-center">
                          <span class="text-h6 font-weight-bold">{{
                            item.name
                          }}</span>
                          <v-spacer></v-spacer>
                          <v-chip
                            label
                            color="secondary dark--text"
                            class="text-caption"
                            >1 risk</v-chip
                          >
                        </div>
                        <span class="text-caption d-flex align-center mt-n1">
                          <v-icon x-small color="secondary" class="mr-1"
                            >mdi-star</v-icon
                          >
                          {{ item.achiever }} achiever
                        </span>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      class="px-0 d-flex align-center justify-space-around"
                    >
                      <div class="d-flex flex-column">
                        <span class="light--text text-caption">Gain</span>
                        <span
                          class="secondary--text text-subtitle-1 text-sm-h6 mt-n1 font-weight-bold"
                          >+{{ item.gain }}%</span
                        >
                      </div>
                      <div class="d-flex flex-column ml-3">
                        <span class="light--text text-caption">Coppiers</span>
                        <span
                          class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                          >{{ item.coppiers }}</span
                        >
                      </div>
                      <div class="d-flex flex-column ml-3">
                        <span class="light--text text-caption">Commission</span>
                        <span
                          class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                          >{{ item.commission }}%</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" class="px-0 d-flex align-ceneter">
                      <v-btn
                        large
                        depressed
                        @click="copyTrader(item)"
                        color="secondary dark--text"
                        class="text-capitalize text-caption font-weight-medium"
                        >Copy {{ item.name }}</v-btn
                      >
                      <v-spacer></v-spacer>
                      <div class="d-flex flex-column ml-3">
                        <span class="light--text text-caption"
                          >Min Investment</span
                        >
                        <span
                          class="secondary--text text-subtitle-1 mt-n1 font-weight-bold"
                          >{{ item.min | currency }}</span
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </w-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import wContainer from "~/components/other/wContainer.vue";
import wWalletCard from "~/components/other/wWalletCard.vue";
export default {
  components: { wContainer, wWalletCard },
  layout: "dashboard",

  filters: {
    currency(val) {
      if (val) {
        return val.toLocaleString("en-US", {
          style: "currency",
          code: "US",
          currency: "USD",
        });
      } else {
        return "$0.00";
      }
    },
  },

  data: () => ({}),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
      state: "admin/getState",
    }),
    traders() {
      return this.state("traders");
    },
  },

  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      copyTraderFN: "controller/copyTraderFN",
    }),

    copyTrader(trader) {
      console.log(trader);
      if (this.checkBalance(trader.min)) {
        const payload = this.user;
        payload.trader = trader;

        this.copyTraderFN(payload);
      }
    },

    checkBalance(amount) {
      const balance = this.user && this.user.wallet.deposit;

      if (balance >= amount) {
        return true;
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: "error",
          message: "Insufficient funds to perform this transaction",
        });
        console.log("Insufficient funds to perform this transaction");
        return false;
      }
    },
  },
};
</script>

<style></style>
