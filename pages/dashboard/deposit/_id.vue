<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card flat rounded="xl" dark color="dark" class="py-4">
          <v-card-title>
            <v-btn @click="$router.go(-1)" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="white--text text-capitalize text-h6 font-weight-bold"
              >Pay via {{ id }}</span
            >
          </v-card-title>
          <v-card-text v-if="id == 'crypto'">
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
                  <v-select
                    v-model="wallet"
                    filled
                    color="secondary"
                    large
                    dark
                    :items="wallets"
                    item-text="name"
                    return-object
                    :rules="[(v) => !!v || 'Wallet is required']"
                    label="Select crypto wallet"
                    class="text-subtitle-1 dark font-weight-medium rounded-lg"
                    required
                  />
                </v-col>
                <v-col
                  v-if="wallet"
                  cols="12"
                  class="d-flex flex-column align-center"
                >
                  <div class="pa-2 light rounded-lg">
                    <v-avatar size="120" class="secondary rounded-lg">
                      <v-img :src="wallet && wallet.photoURL" class=""></v-img>
                    </v-avatar>
                  </div>
                  <span class="text-caption light--text mt-2"
                    >Scan for wallet address</span
                  >
                </v-col>

                <v-col v-if="wallet" cols="12" class="">
                  <v-card rounded="lg" flat dark color="black">
                    <v-card-text class="border-s d-flex align-center">
                      <div class="overflow-hidden">
                        <div
                          class="light--text text-caption text-sm-subtitle-2"
                        >
                          <span class="text--capitalize">{{
                            wallet.name
                          }}</span>
                          wallet address
                        </div>
                        <div
                          style="width: 100%"
                          class="secondary--text text-subtitle-2 text-sm-subtitle-1 d-block text-truncate"
                        >
                          {{ wallet.address }}
                        </div>
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="copy(wallet.address)"
                        fab
                        icon
                        color="secondary"
                      >
                        <v-icon size="20">mdi-content-copy</v-icon>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col v-if="wallet" cols="12" class="">
                  <v-card rounded="lg" flat dark color="black">
                    <v-card-text
                      style="border: 1px solid yellow"
                      class="d-flex align-center"
                    >
                      <div
                        class="white--text text-caption text-sm-subtitle-2 pr-2"
                      >
                        Send only
                        <span class="text--capitalize">{{ wallet.name }}</span>
                        to this address. Sending any other coins may result in
                        permanent loss
                      </div>
                      <v-spacer></v-spacer>
                      <v-avatar tile size="30">
                        <v-img src="/logo8.svg"></v-img>
                      </v-avatar>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col
                  v-if="wallet"
                  cols="12"
                  class="light--text mt-2 text-subtitle-1"
                  >Upload proof of paymanet</v-col
                >
                <v-col v-if="wallet" cols="12" class="py-0">
                  <v-file-input
                    v-model="photo"
                    type="file"
                    name="image"
                    chips
                    filled
                    color="secondary"
                    large
                    class="text-subtitle-2 font-weight-light rounded-md"
                    required
                    :rules="[(v) => !!v || 'Proof  is required']"
                    label="File Upload"
                    prepend-icon=""
                    prepend-inner-icon="mdi-file"
                  />
                </v-col>

                <v-col v-if="wallet" cols="12" class="">
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
            </v-form>
          </v-card-text>

          <v-card-text
            v-else
            class="text-subtitle-2 text-sm-h6 light--text text-center"
          >
            For Bank deposit, please contact
            <v-btn
              text
              block
              color="warning"
              class="ma-0 text-lowercase text-subtitle-2 text-sm-h6"
              href="mailto:support@sterlingstockinvestments.com"
              >support@sterlingstockinvestments.com</v-btn
            >
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

  data: () => ({
    valid: true,

    amount: "",
    wallet: null,
    photo: null,
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
      state: "admin/getState",
    }),
    wallets() {
      return this.state("wallets");
    },
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    ...mapActions({
      depositFN: "controller/depositFN",
      initAlert: "controller/initAlert",
    }),
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const amount = parseFloat(
          this.wAmount.substring(1).split(",").join("")
        );

        const payload = {
          amount,
          wallet: this.wallet.name,
          photo: this.photo,
          date: this.getDate("current"),
          type: "deposit",
          title: "Wallet Fund",
          description: `Deposit request of ${this.wAmount}`,
          status: "Pending",
          id: "",
          user: this.user,
          userID: this.user.userID,
        };

        console.log(payload);
        this.depositFN(payload);
      }
    },

    async copy(payload) {
      await navigator.clipboard.writeText(payload);
      // alert('Wallet Address copied to clipboard')
      this.initAlert({
        is: true,
        persistence: true,
        type: "info",
        message: "Wallet address copied to clipboard",
      });
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
