<template>
  <v-container class="black light--text py-0">
    <v-row align="center" justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <w-wallet-card />
      </v-col>
      <v-col cols="12" md="6" class="light--text">
        <div>
          <div style="width: 100%" class="black px-4 py-2 mx-2 rounded-lg mb-4">
            <div class="text-caption d-flex align-center">
              <span class="light--text">Signal Strength</span>
              <v-spacer></v-spacer>
              <span class="secondary--text text-subtitle-2 font-weight-bold"
                >{{
                  user && user.account.signal ? user.account.signal : 0
                }}%</span
              >
            </div>
            <v-progress-linear
              height="6"
              :value="user && user.account.level"
              color="secondary"
              class="my-1"
            />
          </div>
        </div>
        <div class="d-flex justify-center mb-8">
          <div class="hidden-sm-and-down">
            <div class="text-subtitle-2 d-md-flex align-center">
              <v-icon left color="secondary">mdi-circle</v-icon>
              Net Balance
            </div>
            <div class="white--text font-weight-bold text-h5">
              {{
                ((user && user.wallet.deposit) + (user && user.wallet.profit))
                  | currency
              }}
            </div>
          </div>
          <div
            style="padding: 1px"
            class="mx-4 mx-sm-6 light hidden-sm-and-down"
          ></div>
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
              lcw-color-tx="#FFF4C8"
              lcw-color-bg="#000000"
              lcw-border-w="1"
            ></div>
          </div>
        </div>

        <div class="d-flex align-center mt-4 justify-space-around">
          <div
            v-ripple
            class="d-flex flex-column align-center"
            style="cursor: pointer"
            v-for="btn in buttons"
            @click="$router.push(btn.to)"
            :key="btn.title"
          >
            <v-avatar tile size="70" class="rounded-lg" color="secondary">
              <v-icon color="dark" size="30">{{ btn.icon }}</v-icon>
            </v-avatar>
            <span class="text-subtitle-2 mt-2">{{ btn.title }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <v-row justify="center" class="ma-0">
          <!-- /////// Verify Account Card ////// -->
          <v-col cols="12" v-if="user && !user.account.status">
            <v-card
              to="/dashboard/account/verification"
              outlined
              color="transparent"
              class="rounded-xl"
            >
              <v-card-text
                style="border: 1px solid #fcd435"
                class="d-flex align-center"
              >
                <div class="d-flex flex-column light--text">
                  <div
                    class="text-subtitle-2 secondary--text text-sm-subtitle-1 font-weight-bold"
                  >
                    Verify your account
                  </div>
                  <div class="text-caption">
                    We need to know you, so you can acces all of our features
                    and help us keep your funds safe
                  </div>
                </div>
                <v-avatar size="50" tile>
                  <v-img src="/logo2.svg"></v-img>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" v-for="(act, i) in actions" :key="i">
            <w-actions-card :data="act" />
          </v-col>

          <!-- /////// Referral Card ////// -->
          <v-col cols="12">
            <v-card
              to="/dashboard/account/referral"
              outlined
              color="secondary"
              class="rounded-xl"
            >
              <v-card-text class="d-flex align-center">
                <div class="d-flex flex-column dark--text">
                  <div
                    class="text-subtitle-2 dark--text text-sm-subtitle-1 font-weight-bold"
                  >
                    Refer & Earn
                  </div>
                  <div class="text-caption">
                    You get the chance to earn more by inviting your friends and
                    family to join you make wealth
                  </div>
                </div>
                <v-avatar size="50" tile>
                  <v-img src="/logo6.svg"></v-img>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="d-flex px-0">
        <div
          class="rounded-lg secondary pa-sm-2 mx-auto"
          style="overflow: hidden"
        >
          <div
            class="livecoinwatch-widget-3"
            lcw-base="USD"
            lcw-d-head="true"
            lcw-d-name="true"
            lcw-d-code="true"
            lcw-d-icon="true"
            lcw-color-tx="#FFF4C8"
            lcw-color-bg="#000000"
            lcw-border-w="1"
          ></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import VueTradingView from "vue-trading-view";
import WWalletCard from "@/components/other/wWalletCard.vue";
import WActionsCard from "@/components/other/wActionsCard.vue";
export default {
  name: "Dashboard",

  components: { WWalletCard, WActionsCard },

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
    ...mapGetters({ user: "authentication/getUser" }),

    actions() {
      return [
        {
          title: `Fund <br/> Account`,
          to: "/dashboard/deposit",
        },
        {
          title: `Start <br/> Investing`,
          to: "/dashboard/trade",
        },
        {
          title: `Copy <br/> Trading`,
          to: "/dashboard/trade/copy",
        },
        {
          title: `Trading <br/> Signal`,
          to: "/dashboard/trade/signal",
        },
      ];
    },
    buttons() {
      return [
        {
          title: "Deposit",
          icon: "mdi-currency-usd",
          to: "/dashboard/deposit",
        },
        {
          title: "Trade",
          icon: "mdi-trending-up",
          to: "/dashboard/trade",
        },
        {
          title: "Withdraw",
          icon: "mdi-bank",
          to: "/dashboard/withdraw",
        },
        {
          title: "Loan",
          icon: "mdi-currency-usd",
          to: "/dashboard/loan",
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
