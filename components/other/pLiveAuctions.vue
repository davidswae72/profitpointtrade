<template>
  <v-row class="ma-0">
    <v-col
      style="width: 100vw"
      v-dragscroll.x
      cols="12"
      class="scrollStyle d-flex align-center justify-start"
    >
      <div v-for="(item, i) in data" :key="i">
        <p-live-auction-card :data="item" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import pLiveAuctionCard from "./pLiveAuctionCard.vue";
export default {
  components: { pLiveAuctionCard },
  props: {
    data: Array,
  },
};
</script>

<style scope>
</style>