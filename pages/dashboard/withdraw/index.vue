<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <w-wallet-card :type="2" wallet-name="withdraw" />
      </v-col>
      <v-col cols="12" md="6" class="">
        <w-actions-card :data="actions[0]" />
        <div class="text-caption secondary--text ml-2 mt-1">
          Click to initiate withdraw
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 mt-4">
      <v-col cols="12">
        <w-transaction
          :type="'withdraw'"
          :filter="false"
          :title="'Recent Withdraw'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import wWalletCard from "~/components/other/wWalletCard.vue";
import wTransaction from "~/components/other/wTransaction.vue";
import WActionsCard from "@/components/other/wActionsCard.vue";
export default {
  components: { wWalletCard, WActionsCard, wTransaction },
  layout: "dashboard",

  computed: {
    actions() {
      return [
        {
          title: `Request <br/> Withdrawal`,
          to: "/dashboard/withdraw/request",
        },
      ];
    },
  },
};
</script>

<style></style>
