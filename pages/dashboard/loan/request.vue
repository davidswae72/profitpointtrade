<template>
  <v-container>
    <v-row justify="center">
      <v-col v-if="user && !user.account.status" cols="12">
        <v-card tile outlined color="secondary" class="pa-0">
          <v-card-text class="primary--text d-flex align-center">
            <v-icon color="primary" left>mdi-alert</v-icon>
            <span>Please verify your account before applying for a loan</span>
            <v-spacer></v-spacer>
            <v-btn
              color="primary secondary--text"
              depressed
              to="/dashboard/account/verification"
              class="text-subtitle-2 text-capitalize"
              >Verify</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="10" lg="8">
        <v-card
          :disabled="user && !user.account.status"
          flat
          rounded="xl"
          dark
          color="dark"
          class="py-4"
        >
          <v-card-title class="d-flex align-center">
            <v-btn @click="$router.go(-1)" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <span class="white--text text-capitalize text-h6 font-weight-bold"
              >Request Loan</span
            >
            <v-spacer />
            <v-chip label color="secondary dark--text" class="font-weight-bold">
              Balance -
              {{ (user && user.wallet.deposit) | currency }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row justify="center" class="ma-0">
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
                  <v-text-field
                    dark
                    v-model="wMonthlyPayment"
                    type="text"
                    name="amount"
                    filled
                    large
                    color="secondary"
                    label="Monthly Payment"
                    :rules="[(v) => !!v || 'Monthly payment is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <span class="text-subtitle-1 font-weight-medium">
                    Personal Details</span
                  >
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field
                    dark
                    v-model="name"
                    type="text"
                    name="bank"
                    filled
                    large
                    color="secondary"
                    label="Full Name"
                    :rules="[(v) => !!v || 'Full name is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="email"
                    name="email"
                    type="text"
                    filled
                    large
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                    color="primary"
                    label="Email"
                    required
                    :rules="[
                      [
                        (v) => !!v || 'E-mail is required',
                        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                      ],
                    ]"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    dark
                    v-model="ssn"
                    type="text"
                    name="bank"
                    filled
                    large
                    color="secondary"
                    label="SSN/ID Number"
                    :rules="[(v) => !!v || 'SSN/ID Number is required']"
                    class="text-subtitle-1 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dob"
                        :rules="[(v) => !!v || 'Date of Birth is required']"
                        filled
                        class="text-subtitle-1 font-weight-medium rounded-lg"
                        large
                        label="Date of Birth"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker v-model="dob" color="secondary" scrollable>
                      <v-spacer />
                      <v-btn
                        text
                        class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                        color="secondary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        depressed
                        text
                        class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="country"
                    :items="countries"
                    item-text="name"
                    filled
                    class="text-subtitle-2 dark font-weight-medium rounded-lg"
                    color="secondary"
                    label="Nationality"
                    required
                    :rules="[(v) => !!v || 'Nationality is required']"
                  />
                </v-col>

                <v-col cols="12" class="">
                  <v-btn
                    x-large
                    depressed
                    type="submit"
                    :loading="loading.loan"
                    block
                    color="secondary dark--text"
                    class="text-subtitle-1 rounded-lg font-weight-medium"
                    >Submit</v-btn
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

    amount: "",
    monthlyPayment: "",
    name: "",
    email: "",
    country: "",
    menu: false,
    dob: "",
    date: new Date().toISOString().substr(0, 10),
    ssn: "",
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
      state: "admin/getState",
      countries: "authentication/getCountries",
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
    wMonthlyPayment: {
      get() {
        let val = parseInt(this.monthlyPayment);
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
          this.monthlyPayment = val;
        }
      },
    },
  },

  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      loanFN: "controller/loanFN",
    }),
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const amount = parseFloat(
          this.wAmount.substring(1).split(",").join("")
        );
        const monthlyPayment = parseFloat(
          this.wMonthlyPayment.substring(1).split(",").join("")
        );

        if (this.checkAmount(amount)) {
          let payload = {
            amount,
            monthlyPayment,
            name: this.name,
            email: this.email,
            date: this.getDate("current"),
            title: `Loan request of ${this.wAmount}`,
            description: `Loan request of ${this.wAmount}, with a monthly payment of ${this.wMonthlyPayment}`,
            dob: this.dob,
            country: this.country,
            ssn: this.ssn,
            type: "loan",
            status: "Pending",
            id: "",
            user: this.user,
            userID: this.user.userID,
          };

          console.log(payload);
          this.loanFN(payload);
        }
      }
    },

    checkAmount(amount) {
      const balance = this.user && this.user.wallet.deposit;

      if (balance >= 1000) {
        return true;
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: "info",
          message:
            "Insufficient funds to perform this transaction, Please fund at least $1,000 and try again",
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
