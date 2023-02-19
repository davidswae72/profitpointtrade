<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" class="">
      <v-card flat rounded="xl" color="dark">
        <v-card-text class="border-s d-flex align-center">
          <div class="d-flex flex-column ml-3">
            <span class="light--text text-caption text-sm-subtitle-2"
              >Referral Earnings</span
            >
            <span
              class="white--text text-subtitle-1 font-weight-bold text-sm-h6 mt-n1"
              >{{ user && user.wallet.referral | currency }}</span
            >
          </div>
          <v-spacer></v-spacer>
          <v-avatar tile size="35">
            <v-img src="/logo2.svg"></v-img>
          </v-avatar>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" class="d-flex align-center justify-center">
      <v-chip label outlined class="text--truncate secondary--text">
        https://profitpointtrade.com/register?ref={{
          user && user.referralID
        }}
      </v-chip>
      <v-btn
        @click="
          copy(
            `https://profitpointtrade.com/register?ref=${
              user && user.referralID
            }`
          )
        "
        small
        fab
        icon
        color="secondary"
      >
        <v-icon small>mdi-content-copy</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="12">
      <v-card outlined color="secondary" class="rounded-xl">
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
          <v-spacer></v-spacer>
          <v-avatar size="50" tile>
            <v-img src="/logo6.svg"></v-img>
          </v-avatar>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "controller/getLoading",
    }),
  },

  methods: {
    ...mapActions({ initAlert: "controller/initAlert" }),
    async copy(payload) {
      await navigator.clipboard.writeText(payload);
      // alert('Wallet Address copied to clipboard')
      this.initAlert({
        is: true,
        persistence: true,
        type: "info",
        message: "Referral link copied to clipboard",
      });
    },
  },
};
</script>

<style></style>
