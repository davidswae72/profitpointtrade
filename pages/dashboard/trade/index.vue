<template>
  <v-container class="black light--text py-0">
    <v-row align="center" justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <w-wallet-card />
      </v-col>
      <v-col cols="12" md="6" class="light--text">
        <div class="d-flex justify-center mb-8">
          <div>
            <!-- <div class="text-subtitle-2 d-flex align-center">
              <v-icon left color="secondary">mdi-circle</v-icon>
              Bitcoin Wallet
            </div>
            <div class="white--text font-weight-bold text-h5">
              0.00000000 <span class="text-subtitle-2">BTC</span>
            </div> -->
            <div
              class="livecoinwatch-widget-6"
              lcw-coin="BTC"
              lcw-base="USD"
              lcw-period="d"
              lcw-color-tx="#7bdcb5"
              lcw-color-bg="#000000"
              lcw-border-w="1"
            ></div>
          </div>
        </div>

        <div class="d-flex align-center mt-4 justify-space-around">
          <div
            @click="$router.push(btn.to)"
            v-ripple
            class="d-flex flex-column align-center"
            style="cursor: pointer"
            v-for="btn in buttons"
            :key="btn.title"
          >
            <v-avatar tile size="70" class="rounded-lg" color="secondary">
              <v-icon color="dark" size="30">{{ btn.icon }}</v-icon>
            </v-avatar>
            <span class="text-subtitle-2 mt-2">{{ btn.title }}</span>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        class="text-h6 text-sm-h5 font-weight-bold white--text mt-4"
      >
        Investment Plans
      </v-col>
      <v-col cols="6" md="4" lg="3" v-for="(act, i) in actions" :key="i">
        <WInvestmentCard :data="act" />
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 mt-4">
      <v-col cols="12">
        <w-transaction
          :type="'investment'"
          :filter="false"
          :title="'My Investments'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import VueTradingView from "vue-trading-view";
import WWalletCard from "@/components/other/wWalletCard.vue";
import WInvestmentCard from "@/components/other/wInvestmentCard.vue";
import wTransaction from "~/components/other/wTransaction.vue";
export default {
  name: "Dashboard",

  components: { WWalletCard, WInvestmentCard, wTransaction },

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
      }
    },
  },
  data: () => ({}),

  computed: {
    ...mapGetters({ user: "authentication/getUser" }),

    actions() {
      return [
        {
          title: `Basic`,
          to: "/dashboard/trade/basic",
          price: 1000,
          days: 7,
        },
        {
          title: `Standard`,
          to: "/dashboard/trade/standard",
          price: 3000,
          days: 7,
        },
        {
          title: `Premium`,
          to: "/dashboard/trade/premium",
          price: 5000,
          days: 7,
        },
        {
          title: `Ultimate`,
          to: "/dashboard/trade/ultimate",
          price: 10000,
          days: 7,
        },
      ];
    },
    buttons() {
      return [
        {
          title: "Copy Trading",
          icon: "mdi-trending-up",
          to: "/dashboard/trade/copy",
        },
        {
          title: "Signal Trading",
          icon: "mdi-trending-up",
          to: "/dashboard/trade/signal",
        },
      ];
    },

    wallets() {
      return [
        {
          name: "Balance",
          direction: "up",
          amount:
            "ETH:" +
            (this.user ? this.user.wallet.balance.toLocaleString() : "0.00"),
        },
        {
          name: "Profit",
          direction: "up",
          amount: this.filter(this.user && this.user.wallet.profit),
        },
        {
          name: "Gas",
          direction: "down",
          amount: this.filter(this.user && this.user.wallet.gas),
        },
        {
          name: "Account Level",
          direction: "up",
          amount: "GNFT-" + this.check(this.user && this.user.account.level),
        },
      ];
    },
  },

  methods: {
    check(arg) {
      return arg ? arg : 0;
    },
    filter(arg) {
      return arg
        ? parseFloat(arg).toLocaleString("en-US", {
            style: "currency",
            code: "US",
            currency: "USD",
          })
        : "$0.00";
    },
  },

  head: () => ({
    script: [
      { src: "https://crypto.com/price/static/widget/index.js" },
      { src: "https://files.coinmarketcap.com/static/widget/currency.js" },
    ],
  }),
};
</script>

<style></style>
