<template>
  <v-container fluid class="white">
    <v-row no-gutters="" style="height: 100vh" justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column align-center justify-center">
        <v-card v-if="verify === null" flat width="400">
          <v-card-title
            class="text-uppercase py-6 d-flex justify-center align-center"
          >
            <v-icon color="secondary" size="74" class="mb-4">
              fas fa-user-shield
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <div>Your Account is being Verified</div>
            <v-btn :loading="true" text color="secondary"> Login </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="verify === true" flat width="400">
          <v-card-title
            class="text-uppercase py-6 d-flex justify-center align-center"
          >
            <v-icon color="success" size="74" class="mb-4">
              fas fa-user-shield
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <div>Your Account is being Verified</div>
            <v-btn to="/login" text color="primary"> Login </v-btn>
          </v-card-text>
        </v-card>
        <v-card v-if="verify === false" flat width="400">
          <v-card-title
            class="text-uppercase py-6 d-flex justify-center align-center"
          >
            <v-icon color="error" size="74" class="mb-4">
              fas fa-user-times
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-row class="ma-0">
              <v-col cols="12" class="py-0">
                <div class="error--text">Verification Failed</div>
              </v-col>
              <v-col
                cols="12"
                class="pb-0 dark--text font-weight-medium text-h6"
              >
                Resent Verification Code
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="email"
                  name="email"
                  type="text"
                  large
                  outlined
                  class="text-subtitle-2 font-weight-light rounded-lg"
                  color="secondary"
                  label="Email"
                  required
                  :rules="emailRules"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-btn
                  block
                  :loading="loading.resendConfirmation"
                  depressed
                  large
                  color="secondary dark--text"
                  class="text-subtitle-2 text-capitalize rounded-lg"
                  @click="resendVerification"
                >
                  Resend Verification Code
                </v-btn>
              </v-col>
              <v-col cols="12" class="py-1 dark--text mt-2 text-center">
                <div>
                  Back to
                  <nuxt-link
                    to="/login"
                    tag="a"
                    class="secondary--text font-weight-bold"
                  >
                    Login
                  </nuxt-link>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConfirmAccount",
  layout: "welcome",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  created() {
    const id = this.$route.params.id;
    this.verifyEmail(id);
  },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      loading: "authentication/getLoading",
      state: "authentication/getState",
    }),
    verify() {
      console.log(this.state("verified"));
      return this.state("verified");
    },
  },

  methods: {
    ...mapActions({
      verifyEmail: "authentication/verifyEmail",
      resendConfirmation: "authentication/resendConfirmation",
    }),

    resendVerification() {
      this.resendConfirmation({
        email: this.email,
      });
    },
  },
};
</script>

<style>
.bgr {
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    url("/bg/lock.jpg");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
.position {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
