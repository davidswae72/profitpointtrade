<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="8">
        <v-card dark flat rounded="xl" color="primary pa-0 pb-4">
          <v-card-text class="light--text pa-0">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row justify="center" class="ma-0">
                <v-col cols="12" class="d-flex align-center">
                  <v-btn @click="$router.go(-1)" fab icon color="secondary">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>

                  <span
                    class="text-subtitle-1 white--text text-sm-h6 font-weight-bod"
                    >Edit {{ user && user.name }}</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    fab
                    depressed
                    @click="sendNotification = !sendNotification"
                    :color="
                      !sendNotification
                        ? 'dark dark--text text--lighten-5'
                        : 'secondary'
                    "
                  >
                    <v-icon size="20">mdi-bell-off</v-icon>
                  </v-btn>
                </v-col>
                <v-col v-if="user && user.block" cols="12" class="px-0">
                  <v-alert dense type="error" class="mt-n2" tile>
                    This account is blocked
                  </v-alert>
                </v-col>

                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayDeposit"
                    :disabled="user && user.block"
                    type="text"
                    name="deposit"
                    filled
                    color="secondary"
                    :label="`Deposit`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayProfit"
                    :disabled="user && user.block"
                    type="text"
                    name="profit"
                    filled
                    color="secondary"
                    :label="`Profit`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayWithdraw"
                    :disabled="user && user.block"
                    type="text"
                    name="gas"
                    filled
                    color="secondary"
                    :label="`Withdraw`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayInvestment"
                    :disabled="user && user.block"
                    type="text"
                    name="invesment"
                    filled
                    color="secondary"
                    :label="`Investment`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayReferral"
                    :disabled="user && user.block"
                    type="text"
                    name="referral"
                    filled
                    color="secondary"
                    :label="`Referral`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displayLevel"
                    :disabled="user && user.block"
                    type="number"
                    name="withdraw"
                    filled
                    color="secondary"
                    :label="`Trade Level`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0 mb-n1">
                  <v-text-field
                    v-model="displaySignal"
                    :disabled="user && user.block"
                    type="number"
                    name="withdraw"
                    filled
                    color="secondary"
                    :label="`Signal Strength`"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>

                <v-col cols="12" class="d-flex text-subtitle-2">
                  Advance Settings
                  <v-spacer />
                  <v-btn
                    text
                    icon
                    :color="`${advance ? 'secondary' : ''}`"
                    @click="advance = !advance"
                  >
                    <v-icon small>
                      {{ advance ? "mdi-arrow-down" : "mdi-arrow-up" }}
                    </v-icon>
                  </v-btn>
                </v-col>

                <v-col
                  v-if="advance"
                  cols="6"
                  class="d-flex align-center justify-space-between"
                >
                  <v-switch
                    v-model="displayStatus"
                    color="secondary"
                    inset
                    label="Account Status"
                    class="py-0 px-sm-4 my-0"
                  />
                </v-col>
                <v-col
                  v-if="advance"
                  cols="6"
                  class="d-flex align-center justify-space-between"
                >
                  <v-switch
                    v-model="displayBlock"
                    color="secondary"
                    inset
                    label="Block User"
                    class="py-0 px-sm-4 my-0"
                  />
                </v-col>
                <v-col v-if="advance" cols="6" class="py-2">
                  <v-switch
                    v-model="displayDelete"
                    :disabled="user && user.block"
                    color="error"
                    inset
                    label="Delete User"
                    class="py-0 my-0"
                  />
                </v-col>

                <v-col cols="12" class="py-2">
                  <v-btn
                    type="submit"
                    depressed
                    block
                    x-large
                    :loading="loading.update"
                    color="secondary dark--text"
                    class="text-subtitle-2 text--capitalize rounded-lg font-weight-normal"
                  >
                    Update User
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "admin",
  filters: {
    currency(val) {
      if (val) {
        val = parseFloat(val);
        return val.toLocaleString();
      } else {
      }
    },
  },
  data: () => ({
    valid: true,
    show: false,
    advance: false,
    sendNotification: false,
    old: {
      deposit: 0,
      profit: 0,
    },
    edit: {
      deposit: false,
      profit: false,
    },
  }),
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
      getUserByID: "admin/getUserByID",
    }),

    user() {
      const userID = this.$route.params.id;
      return this.getUserByID(userID);
    },

    user2() {
      const userID = this.$route.params.id;
      return this.getUser2ByID(userID);
    },

    displayDeposit: {
      get() {
        let val = parseInt(this.user && this.user.wallet.deposit);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // check if the first Character is $ and remove it
        // const firstChar = val.charAt(0);
        // if (firstChar === this.user.symbol) {
        //   val = val.substring(1);
        // }
        // Convert the value to a number
        this.edit.deposit = true;
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.user.wallet.deposit = val;
        }
      },
    },
    displayProfit: {
      get() {
        let val = parseInt(this.user && this.user.wallet.profit);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        this.edit.profit = true;
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.user.wallet.profit = val;
        }
      },
    },
    displayWithdraw: {
      get() {
        let val = parseInt(this.user && this.user.wallet.withdraw);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.user.wallet.withdraw = val;
        }
      },
    },
    displayInvestment: {
      get() {
        let val = parseInt(this.user && this.user.wallet.investment);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.user.wallet.investment = val;
        }
      },
    },
    displayReferral: {
      get() {
        let val = parseInt(this.user && this.user.wallet.referral);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.user.wallet.referral = val;
        }
      },
    },
    displayStatus: {
      get() {
        return this.user && this.user.account.status;
      },
      set(val) {
        this.user.account.status = val;
      },
    },
    displayLevel: {
      get() {
        return this.user && this.user.account.level;
      },
      set(val) {
        this.user.account.level = val;
      },
    },
    displaySignal: {
      get() {
        return this.user && this.user.account.signal;
      },
      set(val) {
        this.user.account.signal = val;
      },
    },
    displayBlock: {
      get() {
        return this.user && this.user.block;
      },
      set(val) {
        this.user.block = val;
      },
    },
    displayDelete: {
      get() {
        return this.user && this.user.delete;
      },
      set(val) {
        this.user.delete = val;
      },
    },
  },

  methods: {
    ...mapActions({ updateUser: "admin/updateUser" }),

    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        console.log(this.user);

        const message1 = {
          title: "Deposit",
          message: `Wallet deposit successful.
                    New balance is $${this.displayDeposit}`,
          date: this.getDate("current"),
          id: "",
          to: [
            {
              open: false,
              user: this.user,
            },
          ],
        };

        const message2 = {
          title: "Trade Result",
          message: `Trade Completed
                    Total Profit Earned: $${this.displayProfit}`,
          date: this.getDate("current"),
          id: "",
          to: [
            {
              open: false,
              user: this.user,
            },
          ],
        };

        if (!this.sendNotification) {
          this.edit.profit = false;
          this.edit.deposit = false;
        }

        let payload = {
          user: this.user,
          edit: this.edit,
          message: {
            deposit: message1,
            profit: message2,
          },
        };

        this.updateUser(payload);
        // this.checkIfDone()
      }
    },
    getSymbol(payload) {
      const currencies = this.state("currency");
      let symbol;
      currencies &&
        currencies.forEach((el) => {
          if (el.name.toLowerCase() === payload.toLowerCase()) {
            symbol = el.symbol;
          }
        });

      console.log(symbol);
      return symbol;
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
