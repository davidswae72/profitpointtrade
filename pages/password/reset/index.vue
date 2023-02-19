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
                  class="
                    secondary--text
                    font-weight-bold
                    text-h5 text-sm-h4 text-center
                  "
                >
                  Password Reset
                </h2>
                <p class="light--text text-subtitle-2 mt-2">
                  Enter your registered email addreds
                </p>
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
                  required
                  class="text-subtitle-2 dark font-weight-medium rounded-lg"
                />
              </v-col>

              <v-col cols="12" class="d-flex pt-0 mt-n2 pb-4">
                <v-spacer></v-spacer>
                <v-btn
                  text
                  small
                  color="secondary"
                  class="text-capitalize text-subtitle-2 px-0"
                  >Resend Link</v-btn
                >
              </v-col>
              <v-col cols="12" class="py-0">
                <v-btn
                  block
                  :loading="loading.password"
                  x-large
                  type="submit"
                  depressed
                  color="secondary"
                  class="rounded-lg dark--text text-subtitle-2"
                  >Reset Link</v-btn
                >
              </v-col>
              <v-col cols="12" class="text-center">
                <span class="light--text text-subtitle-2">Go back to </span>
                <v-btn
                  text
                  small
                  to="/login"
                  color="secondary"
                  class="text-capitalize text-subtitle-2 px-0"
                  >Login</v-btn
                >
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
  name: "ResetPassword",
  layout: "welcome",
  data: () => ({
    valid: true,
    show: false,
    show1: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  computed: {
    ...mapGetters({ loading: "authentication/getLoading" }),
  },
  methods: {
    ...mapActions({ forgotPassword: "authentication/forgotPassword" }),
    goto(to) {
      this.$router.push(to);
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
        };
        console.log(payload);
        this.forgotPassword(payload);
      }
    },

    clear() {
      this.reset();
      this.resetValidation();
    },

    reset() {
      this.$refs.form.reset();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
    goto(arg) {
      this.$router.push(arg);
    },
  },
};
</script>

<style>
</style>
