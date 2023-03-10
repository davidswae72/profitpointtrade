<template>
  <v-container fluid class="dark pt-16">
    <v-row justify="center" class="dark">
      <v-col cols="12" sm="8" md="6" lg="6" class="mx-auto">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-card
            flat
            dark
            width="400"
            max-width="100%"
            color="transparent"
            class="mx-auto"
          >
            <v-row justify="center" class="ma-0">
              <v-col cols="12" class="d-flex justify-center">
                <v-avatar
                  @click="goto('/')"
                  tile
                  class="mx-auto"
                  style="cursor: pointer"
                >
                  <v-img src="/logo3.svg" cover></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" class="text-center">
                <h2
                  class="secondary--text font-weight-bold text-h5 text-sm-h4 text-center"
                >
                  Sign up
                </h2>
                <p class="light--text text-subtitle-2 mt-2">
                  Create a trading account with
                  <span class="secondary--text">Profit Point Trade</span>
                </p>
              </v-col>
              <v-col cols="12">
                <span class="text-subtitle-1 font-weight-bold secondary--text">
                  Personal Details</span
                >
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  dark
                  v-model="fullName"
                  type="text"
                  name="name"
                  filled
                  color="secondary"
                  label="Full name"
                  :rules="[(v) => !!v || 'Full name is required']"
                  required
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  dark
                  v-model="email"
                  type="text"
                  name="email"
                  filled
                  color="secondary"
                  label="Email"
                  :rules="emailRules"
                  required
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  dark
                  v-model="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  filled
                  color="secondary"
                  :rules="[(v) => !!v || 'Phone number is required']"
                  label="Phone Number"
                  required
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  dark
                  v-model="password"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  filled
                  color="secondary"
                  label="Password"
                  required
                  :rules="passwordRules"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                />
              </v-col>
              <v-col cols="6" class="py-0">
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
              <v-col cols="6" class="py-0">
                <v-select
                  v-model="currency"
                  filled
                  color="secondary"
                  :items="currencies"
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                  :rules="[(v) => !!v || 'Currency is required']"
                  label="Currency"
                  required
                />
              </v-col>
              <v-col cols="12" class="pt-0">
                <span class="text-subtitle-1 font-weight-bold secondary--text">
                  Other Details</span
                >
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="plan"
                  filled
                  color="secondary"
                  :items="['Basic', 'Standard', 'Premium', 'Ultimate']"
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                  :rules="[(v) => !!v || 'Plan is required']"
                  label="Plan"
                  required
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="accManager"
                  filled
                  color="secondary"
                  item-text="name"
                  return-object
                  :items="managers"
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                  :rules="[(v) => !!v || 'Currency is required']"
                  label="Account Manager"
                  required
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-checkbox
                  v-model="acceptTerms"
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                  required
                  dark
                  color="secondary"
                  class="py-0 my-0"
                  type="checkbox"
                  value="1"
                >
                  <template v-slot:label>
                    <div class="text-caption light--text">
                      I accept the Profit Point Trade AUS Service (by Gleneagle)
                      -
                      <nuxt-link tag="a" class="secondary--text" to="/policy">
                        Terms & Conditions, Product Disclosure Statement
                      </nuxt-link>
                      and
                      <nuxt-link tag="a" class="secondary--text" to="/policy">
                        Financial Services Guide
                      </nuxt-link>
                      (ASIC Regulated)
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-btn
                  block
                  :loading="loading.register"
                  x-large
                  depressed
                  type="submit"
                  color="secondary"
                  class="rounded-lg dark--text text-subtitle-2"
                  >Sign Up</v-btn
                >
              </v-col>
              <v-col cols="12" class="text-center">
                <span class="light--text text-subtitle-2">Have an account</span>
                <v-btn
                  text
                  small
                  to="/login"
                  color="secondary"
                  class="text-capitalize text-subtitle-2 px-0"
                  >Sign in</v-btn
                >
              </v-col>
              <v-col cols="12">
                <div class="light--text text-center text-caption">
                  All trading involves risk. Only risk capital you're prepared
                  to lose.This site is protected by reCAPTCHA. Google
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "welcome",
  data: () => ({
    show: false,
    show1: false,
    acceptTerms: null,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    country: null,
    currency: null,
    fullName: "",
    phoneNumber: "",

    plan: "",
    accManager: "",

    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 6) || "Password must be greater than 6 characters",
    ],
    confirmPassword: "",
    confirmPasswordRules: [(v) => !!v || "Password is required"],
  }),
  computed: {
    ...mapGetters({
      loading: "authentication/getLoading",
      countries: "authentication/getCountries",
      state: "controller/getState",
      adminState: "admin/getState",
    }),

    managers() {
      return this.adminState("managers");
    },
    referred() {
      return this.$route.query.ref;
    },
    currencies() {
      const currencies = this.state("currency");
      const arr = [];
      currencies &&
        currencies.forEach((el) => {
          arr.push(el.name);
        });

      console.log(arr);
      return arr;
    },
  },

  methods: {
    ...mapActions({ register: "authentication/register" }),
    goto(to) {
      this.$router.push(to);
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
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.fullName,
          email: this.email,
          password: this.password,
          currency: this.currency,
          phoneNumber: this.phoneNumber,
          country: this.country,
          symbol: this.getSymbol(this.currency),
          plan: this.plan,
          accManager: this.accManager,
          date: this.getDate("current"),
        };

        console.log(payload);
        this.register(payload);
        // this.reset()
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
