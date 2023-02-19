<template>
  <v-card
    style="cursor: pointer"
    width="300"
    outlined
    rounded="xl"
    class="ma-2 onHoverShadow"
  >
    <v-card-title>
      <v-img contain class="rounded-xl" :src="data.nft"></v-img>
    </v-card-title>
    <v-card-text>
      <div
        class="
          text3--text
          text-subtitle-1
          font-weight-bold
          text-sm-h6 text-truncate
        "
      >
        {{ data.title }}
      </div>
      <div class="my-2 grey lighten-3 rounded-xl d-flex items-center py-3 px-4">
        <span
          class="
            text1--text
            font-weight-medium
            text-subtitle-2 text-sm-subtitle-1
          "
          >Current Bid</span
        >
        <v-spacer></v-spacer>
        <span class="text3--text text-subtitle-1 font-weight-bold text-sm-h6"
          >{{ data.price }} ETH</span
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        nft: "",
        title: "",
        price: "",
      }),
    },
  },
};
</script>

<style scope>
</style>