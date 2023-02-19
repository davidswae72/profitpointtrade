<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card flat rounded="xl" dark color="dark" class="py-4">
          <v-card-title class="d-flex align-center">
            <v-btn
              v-if="!showCode"
              @click="$router.go(-1)"
              fab
              icon
              color="secondary"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn v-else @click="showCode = false" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span
              class="white--text text-capitalize text-h6 font-weight-bold"
              >{{
                showCode ? "Enter Withdrawal Code" : "Request Withdrawal"
              }}</span
            >
            <v-spacer />
            <v-chip
              v-if="!showCode"
              label
              color="secondary dark--text"
              class="font-weight-bold"
            >
              {{ selectedWallet }} -
              {{
                (user && user.wallet[selectedWallet.toLowerCase()]) | currency
              }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row v-if="!showCode" justify="center" class="ma-0">
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="selectedWallet"
                    filled
                    color="secondary"
                    large
                    dark
                    :items="['Deposit', 'Profit']"
                    item-text="name"
                    return-object
                    :rules="[
                      (v) => !!v || 'Please select a wallet is required',
                    ]"
                    label="Select Wallet"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                    required
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    dark
                    v-model="wAmount"
                    type="text"
                    name="amount"
                    filled
                    large
                    color="secondary"
                    label="Enter amount"
                    :rules="[(v) => !!v || 'Amount is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="method"
                    filled
                    color="secondary"
                    large
                    dark
                    :items="methods"
                    item-text="name"
                    return-object
                    :rules="[(v) => !!v || 'Methods is required']"
                    label="Select crypto wallet"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                    required
                  />
                </v-col>

                <!-- /////// . Bank Method //////// -->
                <v-col
                  v-if="method !== '' && method === 'Bank Transfer'"
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="bank"
                    type="text"
                    name="bank"
                    filled
                    large
                    color="secondary"
                    label="Enter Bank"
                    :rules="[(v) => !!v || 'Bank name is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col
                  v-if="method !== '' && method === 'Bank Transfer'"
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="accName"
                    type="text"
                    name="bank"
                    filled
                    large
                    color="secondary"
                    label="Account Name"
                    :rules="[(v) => !!v || 'Account name is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col
                  v-if="method !== '' && method === 'Bank Transfer'"
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="accNumber"
                    type="text"
                    name="bank"
                    filled
                    large
                    color="secondary"
                    label="Account Number"
                    :rules="[(v) => !!v || 'Account Number is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>

                <!-- /////// Paypal Method //////// -->
                <v-col
                  v-if="method !== '' && method === 'Paypal'"
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="paypal"
                    type="email"
                    name="payal"
                    filled
                    large
                    color="secondary"
                    label="Enter Email"
                    :rules="[
                      (v) => !!v || 'E-mail is required',
                      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ]"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <!-- /////// Cash App Tag Method //////// -->
                <v-col
                  v-if="method !== '' && method === 'Cash App Tag'"
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="tag"
                    type="text"
                    name="tag"
                    filled
                    large
                    color="secondary"
                    label="Enter Tag"
                    :rules="[(v) => !!v || 'Tag is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col
                  v-if="
                    method !== '' &&
                    method !== 'Cash App Tag' &&
                    method !== 'Bank Transfer' &&
                    method !== 'Paypal'
                  "
                  cols="12"
                  class="py-0"
                >
                  <v-text-field
                    dark
                    v-model="wallet"
                    type="text"
                    :name="method"
                    filled
                    large
                    color="secondary"
                    :label="`${method} address`"
                    :rules="[(v) => !!v || `${method} address is required`]"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col v-if="method" cols="12" class="">
                  <v-btn
                    x-large
                    depressed
                    type="submit"
                    :loading="loading.deposit"
                    block
                    color="secondary dark--text"
                    class="text-subtitle-1 rounded-lg font-weight-medium"
                    >Continue</v-btn
                  >
                </v-col>
              </v-row>

              <v-row v-else justify="center" class="ma-0">
                <v-col cols="12" class="text-subtitle-1 light--text">
                  Contact support
                  <v-btn
                    color="secondary"
                    text
                    href="mailto:support@profitpointtrade.com"
                    class="px-0 text-lowercase"
                  >
                    support@profitpointtrade.com
                  </v-btn>
                  to get your <strong>Withdrawal Code</strong>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    dark
                    v-model="wcode"
                    type="text"
                    name="wcode"
                    filled
                    large
                    color="secondary"
                    label="Enter Code"
                    :rules="[(v) => !!v || 'Withdrawal Code is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col v-if="method" cols="12" class="">
                  <v-btn
                    x-large
                    depressed
                    @click="checkWCode"
                    :loading="loading.withdraw"
                    block
                    color="secondary dark--text"
                    class="text-subtitle-1 rounded-lg font-weight-medium"
                    >Proceed</v-btn
                  >
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
import { mapActions, mapGetters } from "vuex";

export default {
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

  data: () => ({
    valid: true,
    showCode: false,

    selectedWallet: "Deposit",
    method: "",
    methods: [
      "Bitcoin",
      "Ethereum",
      "Perfect Money",
      "Litecoin",
      "Payeer",
      "Paypal",
      "Bank Transfer",
      "Cash App Tag",
    ],
    amount: "",
    wallet: "",
    bank: "",
    accName: "",
    accNumber: "",
    paypal: "",
    tag: "",

    wcode: "",

    payload: null,
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
      state: "admin/getState",
    }),

    wAmount: {
      get() {
        let val = parseInt(this.amount);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return `$${val}`;
        }
      },
      set(val) {
        // check if the first Character is ₦ and remove it
        const firstChar = val.charAt(0);
        if (firstChar === "$") {
          val = val.substring(1);
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.amount = val;
        }
      },
    },
  },

  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      withdrawFN: "controller/withdrawFN",
    }),
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const amount = parseFloat(
          this.wAmount.substring(1).split(",").join("")
        );
        if (this.checkAmount(amount)) {
          let payload = {
            amount,
            paypal: this.paypal,
            tag: this.tag,
            wallet: this.wallet,
            bank: this.bank,
            accName: this.accName,
            accNumber: this.accNumber,
            method: this.method,
            date: this.getDate("current"),
            title: `${this.selectedWallet} withdrawal`,
            description: `withdrawal ${this.wAmount} from ${this.selectedWallet} wallet`,
            type: "withdraw",
            status: "Pending",
            selectedWallet: this.selectedWallet,
            id: "",
            user: this.user,
            userID: this.user.userID,
          };

          console.log(payload);
          this.payload = payload;
          this.showCode = true;
        }
      }
    },

    async checkWCode() {
      await this.$store.dispatch("admin/initWcodes");

      if (this.wcode.trim() !== "") {
        const wcodes = this.state("wcodes");
        // console.log(wcodes);
        const verify = wcodes.find(
          (el) => parseInt(el.code) === parseInt(this.wcode)
        );

        console.log(verify);
        if (verify) {
          if (verify.used) {
            this.initAlert({
              is: true,
              persistence: true,
              type: "error",
              message:
                "This Withdrawal Code has been used already, Please contact support",
            });
          } else {
            this.showForm = true;

            this.payload.wcode = verify;
            console.log(this.payload);
            this.withdrawFN(this.payload);
            return true;
          }
        } else {
          this.initAlert({
            is: true,
            persistence: true,
            type: "error",
            message:
              "This Withdrawal Code is not valid, Please contact support",
          });
        }
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: "error",
          message: "Fields cannot be blank",
        });
      }
    },

    checkAmount(amount) {
      const balance =
        this.user && this.user.wallet[this.selectedWallet.toLowerCase()];
      if (balance >= amount) {
        return true;
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: "info",
          message: "Insufficient funds to perform this transaction",
        });
        console.log("Insufficient funds to perform this transaction");
        return false;
      }
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
