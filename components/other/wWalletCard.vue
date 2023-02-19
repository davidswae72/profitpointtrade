<template>
  <v-card v-if="type === 1" flat color="light" rounded="xl" class="py-4">
    <v-card-text>
      <div class="d-flex flex-column align-center dark--text">
        <div class="text-subtitle-2">Profit Return</div>
        <div class="text-h5 text-sm-h4 font-weight-bold">
          {{ wallet && wallet.profit | currency }}
        </div>
        <!-- <div class="text-caption font-weight-medium">0.00000000 BTC</div> -->
      </div>

      <div
        class="dark light--text mt-6 pa-4 d-flex align-center justify-space-around border-13"
      >
        <div class="d-flex flex-column align-center">
          <div
            class="text-subtitle-1 text-sm-h6 text-md-h5 white--text font-weight-bold"
          >
            {{ wallet && wallet.deposit | currency }}
          </div>
          <div class="text-caption font-weight-medium">Deposit</div>
        </div>
        <div
          style="height: 70px; padding: 2.5px"
          class="rounded-xl secondary"
        ></div>
        <div class="d-flex flex-column align-center">
          <div
            class="text-subtitle-1 text-sm-h6 text-md-h5 white--text font-weight-bold"
          >
            {{ wallet && wallet.investment | currency }}
          </div>
          <div class="text-caption font-weight-medium">Investment</div>
        </div>
        <div
          style="height: 70px; padding: 2.5px"
          class="rounded-xl secondary"
        ></div>
        <div class="d-flex flex-column align-center">
          <div
            class="text-subtitle-1 text-sm-h6 text-md-h5 white--text font-weight-bold"
          >
            {{ wallet && wallet.withdraw | currency }}
          </div>
          <div class="text-caption font-weight-medium">Withdraw</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <v-card v-else flat color="light" rounded="xl" class="py-2 px-3">
    <v-card-text class="border-13 dark">
      <div
        class="dark light--text d-flex align-center justify-space-around border-13"
      >
        <div class="d-flex flex-column align-center">
          <div class="text-h6 text-sm-h5 white--text font-weight-bold">
            {{ wallet && wallet[walletName] | currency }}
          </div>
          <div class="text-caption font-weight-medium text-capitalize">
            {{ walletName }}
          </div>
        </div>
        <div
          style="height: 70px; padding: 2.5px"
          class="rounded-xl secondary"
        ></div>
        <div class="d-flex flex-column align-center">
          <div class="text-h6 text-sm-h5 secondary--text font-weight-bold">
            {{ wallet && wallet[secondWallet] | currency }}
          </div>
          <div class="text-caption font-weight-medium text-capitalize">
            {{ secondWallet }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    currency(val) {
      if (val) {
        return `$${val.toLocaleString()}`;
      } else {
        return "$0.00";
      }
    },
  },

  props: {
    walletName: {
      type: String,
      default: "deposit",
    },
    secondWallet: {
      type: String,
      default: "profit",
    },
    type: {
      type: [Number, String],
      default: 1,
    },
  },

  computed: {
    ...mapGetters({ user: "authentication/getUser" }),
    wallet() {
      return this.user && this.user.wallet;
    },
  },
};
</script>

<style></style>
