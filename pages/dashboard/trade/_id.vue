<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <w-wallet-card :type="2" />
      </v-col>
      <v-col cols="12" md="10" lg="8">
        <v-card flat rounded="xl" dark color="dark" class="">
          <v-card-title>
            <v-btn @click="$router.go(-1)" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="white--text text-capitalize text-h6 font-weight-bold"
              >{{ id }} Plan</span
            >
            <v-spacer></v-spacer>
            <div class="d-flex flex-column">
              <span class="light--text text-caption">Min Amount</span>
              <span
                class="white--text text-subtitle-1 text-sm-h6 mt-n1 font-weight-bold"
                >{{ plan.price | currency }}</span
              >
            </div>
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
                <v-col cols="12" class="">
                  <v-btn
                    x-large
                    depressed
                    type="submit"
                    :loading="loading.investment"
                    block
                    color="secondary dark--text"
                    class="text-subtitle-1 rounded-lg font-weight-medium"
                    >Continue</v-btn
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
import WWalletCard from "@/components/other/wWalletCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashboard",

  components: { WWalletCard },
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
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
    }),
    id() {
      return this.$route.params.id;
    },
    plan() {
      const arr = {
        basic: {
          title: `Basic`,
          to: "/dashboard/trade/basic",
          price: 1000,
          days: 7,
        },
        standard: {
          title: `Standard`,
          to: "/dashboard/trade/standard",
          price: 3000,
          days: 7,
        },
        premium: {
          title: `Premium`,
          to: "/dashboard/trade/premium",
          price: 5000,
          days: 7,
        },
        ultimate: {
          title: `Ultimate`,
          to: "/dashboard/trade/ultimate",
          price: 110000,
          days: 7,
        },
      };

      return arr[this.id];
    },
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
      investmentFN: "controller/investmentFN",
    }),
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const amount = parseFloat(
          this.wAmount.substring(1).split(",").join("")
        );
        if (this.checkAmount(amount)) {
          const payload = {
            title: `${this.plan.title} Investment`,
            description: `Purchase a ${this.plan.title} investment package`,
            amount,
            plan: this.plan,
            id: "",
            date: this.getDate("current"),
            userID: this.user.userID,
            type: "investment",
            status: "Ongoing",
          };
          console.log(payload);
          this.investmentFN(payload);
        }
      }
    },

    checkAmount(amount) {
      const balance = this.user && this.user.wallet.deposit;

      if (balance >= amount) {
        if (amount >= this.plan.price) {
          return true;
        } else {
          this.initAlert({
            is: true,
            persistence: true,
            type: "error",
            message: `Amount must not be less than $${this.plan.price.toLocaleString()}`,
          });
          console.log(
            `Amount must not be less than $${this.plan.price.toLocaleString()}`
          );
          return false;
        }
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
