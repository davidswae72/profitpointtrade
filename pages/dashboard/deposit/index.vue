<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="5">
        <w-wallet-card :type="2" />
      </v-col>
      <v-col cols="12" md="7" class="pa-0">
        <v-row justify="center" class="ma-0">
          <v-col cols="6" v-for="(act, i) in actions" :key="i"
            ><w-actions-card :data="act"
          /></v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 mt-4">
      <v-col cols="12">
        <w-transaction
          :type="'deposit'"
          :filter="false"
          :title="'Recent Deposit'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import wWalletCard from "~/components/other/wWalletCard.vue";
import wContainer from "~/components/other/wContainer.vue";
import wTransaction from "~/components/other/wTransaction.vue";
import WActionsCard from "@/components/other/wActionsCard.vue";
export default {
  components: { wWalletCard, WActionsCard, wTransaction, wContainer },
  layout: "dashboard",

  computed: {
    actions() {
      return [
        {
          title: `Fund Via<br/> Crypto`,
          to: "/dashboard/deposit/crypto",
        },
        {
          title: `Fund Via <br/>Local Bank`,
          to: "/dashboard/deposit/bank",
        },
      ];
    },
  },
};
</script>

<style>
</style>