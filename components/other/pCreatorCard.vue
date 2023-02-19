<template>
  <v-card
    v-if="type === 1"
    width="200"
    outlined
    rounded="xl"
    style="cursor: pointer"
    class="onHoverShadow ma-2"
  >
    <v-card-title style="width: 200px" class="d-flex justify-center rounded-lg">
      <v-badge
        v-if="data.verified"
        icon="mdi-check"
        bordered
        offset-x="30"
        offset-y="70"
      >
        <v-img cover :src="data.ownerImg" class="rounded-xl"></v-img>
      </v-badge>

      <div v-else>
        <v-img cover :src="data.ownerImg" class="rounded-xl"></v-img>
      </div>
    </v-card-title>
    <v-card-text class="text-center">
      <div class="text3--text font-weight-black text-subtitle-1">
        {{ data.title }}
      </div>
      <div class="text1--text text-subtitle-1 mt-2">{{ data.price }} ETH</div>
    </v-card-text>
  </v-card>

  <v-card flat v-else width="300" class="ma-2">
    <v-card-title
      style="width: 300px; position: relative"
      class="d-flex justify-center rounded-lg"
    >
      <v-img
        style="z-index: 4"
        cover
        :src="data.nft"
        class="rounded-xl"
      ></v-img>
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
          width: 80%;
          z-index: 2;
        "
        class="grey lighten-2 rounded-xl mt-1"
      ></div>
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
          width: 60%;
          z-index: 1;
        "
        class="grey lighten-4 rounded-xl mt-4"
      ></div>
      <v-img
        style="
          z-index: 5;
          width: 60px;
          position: absolute;
          bottom: 2px;
          border: 4px solid white;
        "
        cover
        :src="data.ownerImg"
        class="rounded-lg"
      ></v-img>
    </v-card-title>
    <v-card-text class="mt-6">
      <div
        class="text3--text font-weight-bold text-h6 text-center text-truncate"
      >
        {{ data.title }}
      </div>
      <div
        class="
          text1--text
          d-flex
          items-center
          text-subtitle-1
          justify-center
          mt-2
        "
      >
        <span>Collection by</span>
        <span class="primary--text font-weight-bold ml-2">{{
          data.owner
        }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },

    data: {
      type: Object,
      default: () => ({
        nft: "",
        ownerImg: "",
        owner: "",
        title: "",
        price: "",
        verified: false,
      }),
    },
  },
};
</script>

<style scope>
</style>