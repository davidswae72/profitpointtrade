<template>
  <v-row class="ma-0">
    <v-col cols="12" class="d-flex flex-wrap justify-space-around">
      <p-creator-card
        v-for="(item, i) in creators"
        :key="i"
        :data="item"
        :type="type"
      />
    </v-col>
  </v-row>
</template>

<script>
import pCreatorCard from "./pCreatorCard.vue";
export default {
  components: { pCreatorCard },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    creators() {
      let arr = [];
      if (this.type === 1) {
        arr = [
          {
            nft: "/img/",
            ownerImg: "/img/user-Image16.jpeg",
            owner: "",
            title: "Meta Boss",
            price: "0.25",
            verified: true,
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image10.jpeg",
            owner: "",
            title: "The Lucky Being",
            price: "4.10",
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image13.jpeg",
            owner: "",
            title: "Artist of Now",
            price: "1.50",
            verified: true,
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image12.jpeg",
            owner: "",
            title: "Biggest Bang",
            price: "3.30",
            verified: true,
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image6.jpeg",
            owner: "",
            title: "Usman Ansari",
            price: "40th",
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image15.jpeg",
            owner: "",
            title: "King Kong",
            price: "5.50",
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image7.jpeg",
            owner: "",
            title: "Craftold",
            price: "0.6",
            verified: true,
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image9.jpeg",
            owner: "",
            title: "Meow Bits",
            price: "6.30",
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image8.jpeg",
            owner: "",
            title: "Wow Creates",
            price: "2.35",
          },
          {
            nft: "/img/",
            ownerImg: "/img/user-Image18.jpeg",
            owner: "",
            title: "Ding Dong",
            price: "2.00",
            verified: true,
          },

          // {
          //   nft: "/img/",
          //   ownerImg: "/img/user-Image5.jpeg",
          //   owner: "",
          //   title: "Fantasy ETH",
          //   price: "4.60",
          //   verified: true,
          // },
          // {
          //   nft: "/img/",
          //   ownerImg: "/img/user-Image17.jpeg",
          //   owner: "",
          //   title: "Young Artist",
          //   price: "1.56",
          // },
        ];
      } else if (this.type === 2) {
        arr = [
          {
            nft: "/img/cover-img8.jpeg",
            ownerImg: "/img/user-Image16.jpeg",
            owner: "Ahmed Zul",
            title: "Wow! That Brain is Floating",
            price: "",
          },
          {
            nft: "/img/cover-img1.jpeg",
            ownerImg: "/img/user-Image10.jpeg",
            owner: "Usman Ansari",
            title: "The Beyblade in Black",
            price: "",
          },
          {
            nft: "/img/cover-img3.jpeg",
            ownerImg: "/img/user-Image14.jpeg",
            owner: "Peter K.",
            title: "Ooops! Floating Plates",
            price: "",
          },
          {
            nft: "/img/cover-img15.jpeg",
            ownerImg: "/img/user-Image9.jpeg",
            owner: "Andrew Flow",
            title: "Fantasy of Ethereum",
            price: "",
          },
          {
            nft: "/img/cover-img5.jpeg",
            ownerImg: "/img/user-Image2.jpeg",
            owner: "King Kong",
            title: "My Yummy Plastic Omlet",
            price: "",
          },
          {
            nft: "/img/cover-img11.jpeg",
            ownerImg: "/img/user-Image1.jpeg",
            owner: "Craftold",
            title: "The White Sand Storm",
            price: "",
          },
          {
            nft: "/img/cover-img2.jpeg",
            ownerImg: "/img/user-Image7.jpeg",
            owner: "MetaBoss",
            title: "Cubic and Planic Universe",
            price: "",
          },
        ];
      }

      return arr;
    },
  },
};
</script>

<style scope>
</style>