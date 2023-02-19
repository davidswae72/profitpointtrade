<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" class="py-0">
        <v-btn fab small color="secondary" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" md="8" v-if="trade">
        <VueTradingView
          :options="{
            symbol: asset,
            theme: 'dark',
            allow_symbol_change: true,
          }"
        />
      </v-col>
      <v-col cols="12" md="8">
        <w-wallet-card :type="2" class="" />
        <v-card flat rounded="lg" dark color="dark light--text mt-md-4">
          <v-card-text style="border: 1px solid #fcd435" class="">
            <v-progress-linear
              v-if="trade"
              indeterminate
              :color="trade === 'sell' ? 'secondary' : 'error'"
            />
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row justify="center" class="ma-0">
                <v-col :cols="trade ? 10 : 12" class="">
                  <v-select
                    v-model="asset"
                    filled
                    color="secondary"
                    large
                    dark
                    :items="assets"
                    label="Asset"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                    required
                  />
                </v-col>

                <v-col v-if="trade" cols="2" class="px-0">
                  <v-btn outlined color="dark" fab large>
                    <v-icon
                      size="30"
                      :color="trade === 'buy' ? 'error' : 'secondary'"
                      class="flashit"
                      >{{
                        trade === "buy" ? "mdi-arrow-up" : "mdi-arrow-down"
                      }}</v-icon
                    >
                  </v-btn>
                </v-col>
                <v-col class="py-0" cols="12">
                  <v-select
                    v-model="tradeWallet"
                    filled
                    color="secondary"
                    large
                    dark
                    :items="['Deposit', 'Profit']"
                    :label="`Trade from ${tradeWallet}`"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    dark
                    v-model="time"
                    readonly
                    type="text"
                    name="time"
                    filled
                    large
                    color="secondary"
                    label="Time"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    dark
                    v-model="tick"
                    readonly
                    type="text"
                    name="time"
                    filled
                    large
                    color="secondary"
                    label="Tick"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    dark
                    v-model="amount"
                    type="number"
                    name="amount"
                    filled
                    large
                    :rules="[(v) => !!v || `Amount is required`]"
                    color="secondary"
                    label="Trade Amount"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="4" md="6" class="py-0">
                  <div class="d-flex flex-column ml-3">
                    <span class="light--text text-caption"
                      >Potential Profit</span
                    >
                    <span
                      class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                      >{{ getProfit | currency }}</span
                    >
                  </div>
                </v-col>
                <v-col cols="8" md="6" class="pa-0">
                  <v-text-field
                    dark
                    v-model="scode"
                    type="text"
                    name="time"
                    outlined
                    @keyup="checkCode"
                    large
                    :rules="[(v) => !!v || `Signal code is required`]"
                    color="secondary"
                    label="Entry Code"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <div class="error--text text-caption text-center">
                    {{ errorMessage }}
                  </div>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-btn
                    block
                    x-large
                    color="error"
                    depressed
                    @click="initTrade('buy')"
                    dark
                    class="font-weight-bold text-subtitle-1 rounded-lg"
                  >
                    BUY
                  </v-btn>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-btn
                    block
                    x-large
                    @click="initTrade('sell')"
                    color="secondary"
                    depressed
                    dark
                    class="font-weight-bold text-subtitle-1 rounded-lg"
                  >
                    SELL
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12"></v-col>
      <v-col cols="6" sm="6">
        <div
          class="livecoinwatch-widget-1"
          lcw-coin="BTC"
          lcw-base="USD"
          lcw-secondary="BTC"
          lcw-period="d"
          lcw-color-tx="#ffffff"
          lcw-color-pr="#58c7c5"
          lcw-color-bg="#1f2434"
          lcw-border-w="1"
        ></div>
      </v-col>
      <v-col cols="6" sm="6">
        <div
          class="livecoinwatch-widget-1"
          lcw-coin="ETH"
          lcw-base="USD"
          lcw-secondary="BTC"
          lcw-period="d"
          lcw-color-tx="#ffffff"
          lcw-color-pr="#58c7c5"
          lcw-color-bg="#1f2434"
          lcw-border-w="1"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueTradingView from "vue-trading-view";
import { mapGetters, mapActions } from "vuex";
import wWalletCard from "~/components/other/wWalletCard.vue";
export default {
  layout: "dashboard",
  components: { VueTradingView, wWalletCard },

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
  data: () => ({
    valid: true,
    asset: "BTCUSD",
    assets: ["BTCUSD", "USDJPY", "EURUSD", "USDJPY", "GBPUSD", "USDCHF"],
    time: 1,
    tick: 3,
    amount: 0,
    scode: "",
    tradeWallet: "Deposit",
    verifiedCode: "",
    selectedCode: null,
    trade: "",
    errorMessage: "",
  }),

  computed: {
    ...mapGetters({ state: "admin/getState", user: "authentication/getUser" }),
    getProfit() {
      return this.selectedCode && this.selectedCode.percentage * this.amount;
    },
  },

  mounted() {
    this.$store.dispatch("admin/initScodes");
  },
  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      notificationFN: "admin/notificationFN",
      topBalance: "controller/topBalance",
      deductBalance: "controller/deductBalance",
      updateScode: "controller/updateScode",
    }),

    initTrade(action) {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        if (this.checkAmount(this.amount)) {
          console.log("amount checked");
          if (this.checkCode()) {
            this.trade = action;
            this.completeTrade();
          }
        }
      }
    },
    checkCode() {
      if (this.scode.trim() !== "" && this.scode.length === 6) {
        const scodes = this.state("scodes");
        console.log(scodes, this.scode);
        const verify = scodes.find((el) => el.code === this.scode);
        this.verifiedCode = verify;
        console.log(verify);
        if (verify) {
          if (verify.used) {
            this.initAlert({
              is: true,
              persistence: true,
              type: "error",
              message:
                "This Signal Code has been used already, Please contact support",
            });

            this.errorMessage =
              "This Signal Code has been used already, Please contact support";
          } else {
            this.selectedCode = verify;
            this.errorMessage = null;
            return true;
          }
        } else {
          this.initAlert({
            is: true,
            persistence: true,
            type: "error",
            message: "This Signal Code is not valid, Please contact support",
          });

          this.errorMessage =
            "This Signal Code is not valid, Please contact support";
        }
      } else {
        this.selectedCode = null;
        this.trade = null;
        this.errorMessage = null;
        // this.initAlert({
        //   is: true,
        //   persistence: true,
        //   type: "error",
        //   message: "Fields cannot be blank",
        // });
      }
    },

    checkAmount(amount) {
      amount = parseInt(amount);
      const balance =
        this.user && this.user.wallet[this.tradeWallet.toLocaleLowerCase()];
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

    async completeTrade() {
      await setTimeout(async () => {
        //Mark scode as used
        console.log(this.verifiedCode);
        await this.updateScode(this.verifiedCode);

        // credit or debit wallet base on signal type
        const type = this.verifiedCode.type.toLowerCase();
        if (type === "win") {
          this.topBalance({
            amount: this.getProfit,
            wallet: "profit",
            duser: this.user,
          });
        } else {
          this.deductBalance({
            amount: this.amount,
            wallet: this.tradeWallet.toLocaleLowerCase(),
            duser: this.user,
          });
        }

        //Send notification to user
        await this.notificationFN({
          title: `Trade ${this.scode} completed`,
          message: `Trade amount $${this.amount.toLocaleString()} <br/>
                    Signal Code: ${this.scode} <br/>
                    Trade Pair: ${this.asset} | Trade order ${this.trade} <br/>
                    ${type === "win" ? "Win" : "Lost"} <span class="${
            type === "win"
              ? "secondary--text ml-2 font-weight-bold"
              : "error--text ml-2 font-weight-bold"
          }" >${
            type === "win"
              ? "+$" + this.getProfit.toLocaleString()
              : "-$" + this.getProfit.toLocaleString()
          }</span>`,
          date: this.getDate("current"),
          id: "",
          to: [
            {
              open: false,
              user: this.user,
            },
          ],
        });

        // Stop trade
        this.trade = null;
        this.amount = 0;
      }, 60 * 1000);
    },
    getDate(get, days) {
      const currentDate = new Date();
      let newDate;

      function addDays(days) {
        const result = new Date(currentDate);
        result.setDate(result.getDate() + days);
        return formatDate(result);
      }

      function formatDate(date) {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}, ${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })} `;
      }

      if (get === "add") {
        newDate = addDays(days);
      } else if (get === "current") {
        newDate = formatDate(currentDate);
      }
      return newDate;
    },
  },
};
</script>

<style></style>
