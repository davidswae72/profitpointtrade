<template>
  <v-container fluid class="px-0 py-16 py-md-2">
    <!-- ###########  Landing Screen Start  ########-->
    <v-row
      justify="center"
      align="center"
      style="position: relative"
      class="white--text d-flex align-enter ma-0 pt-16 pb-10 my-6"
    >
      <v-col cols="12" md="6" class="text-left py-10 pl-16">
        <v-chip
          outlined
          color="secondary"
          class="rounded-pill text-caption text-sm-subtitle-2"
          >Profit Point Trade</v-chip
        >
        <h2
          style="line-height: 1"
          class="text-h4 text-sm-h2 white--text my-6 font-weight-bold"
        >
          TRADE WISELY Choose from 1000s of
          <span class="secondary--text">Commodities</span>
        </h2>
        <p>
          Join over <span class="secondary--text">22 million </span> traders
          worldwide who have already chosen
          <span class="secondary--text">Profit Point Trade</span>
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
          class="mt-10"
        >
          <v-btn
            depressed
            to="/register"
            x-large
            color="secondary"
            class="text-capitalize primary--text text-subtitle-1 rounded-xl font-weight-bold"
          >
            Get started
            <v-icon right size="20" color="primary">mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            depressed
            to="/login"
            x-large
            outlined
            color="secondary"
            class="text-capitalize primary--text text-subtitle-1 rounded-xl font-weight-bold ml-2 ml-sm-3"
          >
            Sign in
            <v-icon right size="20">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
          class="d-flex mt-10 mb-4"
        >
          <v-avatar size="50" color="light">
            <v-icon>mdi-btc</v-icon>
          </v-avatar>
          <v-avatar size="50" color="light" class="ml-n4">
            <v-icon>mdi-btc</v-icon>
          </v-avatar>
          <v-avatar size="50" color="light" class="ml-n4">
            <v-icon>mdi-btc</v-icon>
          </v-avatar>
          <v-avatar size="50" color="light" class="ml-n4">
            <v-icon>mdi-btc</v-icon>
          </v-avatar>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <v-img
          height="100%"
          cover
          src="/img/coinbg.png"
          style="margin-top: -5rem"
        ></v-img>
      </v-col>
      <v-card
        style="position: absolute; left: 0; bottom: 0; pointer-events: none"
        width="600"
        height="600"
        flat
        tile
        color="transparent"
      >
        <v-img width="100%" cover src="/img/blur1.svg"></v-img>
      </v-card>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0">
      <v-col cols="12" class="pa-0 py-10 black">
        <div
          style="width: 110%"
          class="livecoinwatch-widget-5 ml-n4"
          lcw-base="USD"
          lcw-color-tx="#999999"
          lcw-marquee-1="coins"
          lcw-marquee-2="movers"
          lcw-marquee-items="10"
        ></div>
      </v-col>
    </v-row>
    <!-- ###########  Landing Screen Ends  ######## -->

    <!-- ########### Live Auctions Start  ########-->

    <!-- ###########  Copy Investors  ########-->
    <v-row justify="center" class="ma-0 py-10">
      <v-col cols="12" md="10" lg="8" class="text-center py-0">
        <h2
          style="line-height: 1"
          class="text-h4 text-sm-h2 white--text my-6 font-weight-bold"
        >
          Diversify your portfolio
        </h2>
        <p class="secondary--text text-sm-h6 font-weight-light mt-n2">
          Discover thousands of assets, share ideas,
          <br class="hidden-sm-and-down" />
          discuss strategies and beyond
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="ma-0">
      <v-col
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="py-0 pl-md-10"
      >
        <v-card dark flat tile color="transparent">
          <v-card-text class="white--text text-center text-md-left">
            <div class="text-h5 text-sm-h4 font-weight-bold">
              Invest in your favourite stocks
            </div>
            <div class="text-subtitle-2 text-sm-h6 font-weight-light my-2">
              Enjoy 0% commission and fractional shares
            </div>
            <v-btn
              outlined
              to="/register"
              large
              color="secondary"
              class="border-13 text-subtitle-1 text-capitalize my-4"
              >Start Investing</v-btn
            >
            <div class="light--text text-caption px-sm-4 px-md-0">
              Zero-commission means that no Profit Point Trade fee will
              be charged when opening or closing the position and does not apply
              to short or leveraged positions. Limited stock exchanges only.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        data-aos="fade-left"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="pr-0 py-0"
      >
        <v-card tile flat color="transparent" class="pb-6">
          <v-img contain src="/img/img1.svg"></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" class="pa-1 secondary"></v-col>
    </v-row>

    <!-- ########### Join the Profit Point Trade Community  ########-->
    <v-row justify="center" align="center" class="ma-0 white py-10">
      <v-col cols="12" md="6" class="py-0 pl-md-10">
        <v-card flat tile color="transparent">
          <v-card-text class="dark--text text-center text-md-left">
            <div class="text-h5 text-sm-h4 font-weight-bold">
              Join the Profit Point Trade Community
            </div>
            <div class="text-subtitle-2 text-sm-h6 font-weight-light my-2">
              <p>
                The collective wisdom of millions of investors is
                <strong>at your fingertips.</strong> Learn, share your
                experience and join the conversation.
              </p>
              <p>Building connections leads to building confidence.</p>
            </div>
            <v-btn
              to="/register"
              outlined
              large
              color="secondary"
              class="border-13 text-subtitle-1 text-capitalize my-4"
              >Get Started</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="py-16">
        <v-card
          max-height="500"
          tile
          flat
          color="transparent"
          class="pb-6 d-flex justify-end"
        >
          <v-avatar
            tile
            :size="$vuetify.breakpoint.xsOnly ? '100%' : 500"
            class="mx-auto"
          >
            <v-img src="/img/img4.svg"></v-img>
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="ma-0">
      <v-col
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="py-10 pl-md-10"
      >
        <v-card dark flat tile color="transparent">
          <v-card-text class="white--text text-center text-md-left">
            <div class="text-h5 text-sm-h4 font-weight-bold">
              Buy crypto on an easy-to-use platform.
            </div>
            <div class="text-subtitle-2 text-sm-h6 font-weight-light my-2">
              Bitcoin, Ethereum, and 60+ other cryptoassets at your fingertips
            </div>
            <v-btn
              outlined
              to="/register"
              large
              color="secondary"
              class="border-13 text-subtitle-1 text-capitalize my-4"
              >Start Investing</v-btn
            >
            <div class="light--text text-caption px-sm-4 px-md-0">
              Crypto assets are unregulated & highly speculative. No consumer
              protection. Capital at risk.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        data-aos="fade-left"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="pr-0 py-0 pl-md-10"
      >
        <v-card tile flat color="transparent" class="pb-6">
          <v-img contain src="/img/img2.svg"></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" class="pa-1 secondary"></v-col>
    </v-row>
    <!-- ########### Copy Investors  ########-->
    <v-row justify="center" align="center" class="ma-0 pt-16">
      <v-col
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="py-0"
      >
        <!-- <v-card tile flat color="transparent" class="pb-6">
          <v-img contain src="/img/img3.svg"></v-img>
        </v-card> -->

        <v-avatar
          :size="$vuetify.breakpoint.xsOnly ? '100%' : 500"
          tile
          class="mx-auto"
        >
          <v-img width="100%" contain src="/img/img3.svg"></v-img>
        </v-avatar>
      </v-col>
      <v-col
        data-aos="fade-left"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
        class="py-0 pr-md-10"
      >
        <v-card dark flat tile color="transparent">
          <v-card-text class="white--text text-center text-md-left">
            <div class="text-h5 text-sm-h4 font-weight-bold">
              Copy top investors
            </div>
            <div class="text-subtitle-2 text-sm-h6 font-weight-light my-2">
              With Profit Point Trade’s innovative
              <strong>CopyTrader™</strong>, you can automatically copy the moves
              of other investors. Find investors you believe in and
              <strong>replicate their actions</strong> in real time.
            </div>
            <v-btn
              outlined
              to="/register"
              large
              color="secondary"
              class="border-13 text-subtitle-1 text-capitalize my-4"
              >Get Started</v-btn
            >
            <div class="light--text text-caption px-sm-4 px-md-0">
              Copy Trading does not amount to investment advice.
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="pa-1 mt-16 secondary"></v-col>
    </v-row>

    <!-- ########### Smart Portfolios  ########-->
    <v-row justify="center" align="center" class="ma-0 white py-10">
      <v-col cols="12" md="6" class="py-0 pl-md-10">
        <v-card flat tile color="transparent">
          <v-card-text class="dark--text text-center text-md-left">
            <div class="text-h5 text-sm-h4 font-weight-bold">
              Smart Portfolios
            </div>
            <div class="text-subtitle-2 text-sm-h6 font-weight-light my-2">
              Invest in the future you believe in with
              <strong>thematic investment strategies</strong>, offering
              <strong>diversified exposure</strong> to the market segments that
              will shape our lives.
            </div>
            <v-btn
              to="/register"
              outlined
              large
              color="secondary"
              class="border-13 text-subtitle-1 text-capitalize my-4"
              >Get Started</v-btn
            >
            <div class="text-caption dark--text text--lighten-4">
              Copy Trading does not amount to investment advice.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="py-16">
        <v-card
          max-height="500"
          tile
          flat
          color="transparent"
          class="pb-6 d-flex justify-end"
        >
          <v-avatar
            :size="$vuetify.breakpoint.xsOnly ? '100%' : 500"
            tile
            class="mx-auto"
          >
            <v-img width="100%" contain src="/img/img5.svg"></v-img>
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>

    <!-- ########### Trusted Worldwide ########-->
    <v-row justify="center" class="ma-0 py-10 white">
      <v-col cols="12" md="10" lg="8" class="text-center py-0">
        <h2
          style="line-height: 1"
          class="text-h4 text-sm-h2 dark--text my-6 font-weight-bold"
        >
          Trusted worldwide
        </h2>
        <p
          class="dark--text text--lighten-4 text-sm-h6 font-weight-light mt-n2"
        >
          Discover why millions of investors from over 100
          <br class="hidden-sm-and-down" />
          countries joined Profit Point Trade
        </p>
      </v-col>

      <v-col cols="12" md="11" lg="10" class="px-0">
        <v-row justify="center" class="ma-0">
          <v-col
            data-aos="fade-up"
            :data-aos-delay="item.delay"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            cols="12"
            sm="6"
            md="3"
            v-for="(item, i) in cards"
            :key="i"
          >
            <v-card
              min-height="300"
              flat
              outlined
              rounded="xl"
              class="pt-6 pb-4"
            >
              <v-card-text class="d-flex flex-column">
                <v-avatar tile size="80" class="">
                  <v-img :src="item.img"></v-img>
                </v-avatar>
                <div class="mt-8 dark--text">
                  <h4 class="text-h4">{{ item.title }}</h4>
                  <p
                    class="font-weight-light textsubtitle-2 text-sm-subtitle-1 dark--text text--lighten-4"
                  >
                    {{ item.sub }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 py-10 white">
      <v-col cols="12" md="10" lg="8" class="text-center py-0">
        <h2
          style="line-height: 1"
          class="text-h4 text-sm-h2 dark--text my-6 font-weight-bold"
        >
          Sponsor of your favourite teams
        </h2>
      </v-col>

      <v-col cols="11" class="d-flex flex-wrap align-center justify-center">
        <v-avatar
          size="100"
          tile
          v-for="item in [11, 12, 13, 14, 15]"
          :key="item"
        >
          <v-img
            @mouseover="isHover = true"
            @mouseout="isHover = false"
            :style="!isHover ? 'filter: grayscale(100%)' : ''"
            contain
            class="cursor-pointer"
            :src="`/sponsors/${item}.svg`"
          ></v-img>
        </v-avatar>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script>
import PCreators from "~/components/other/pCreators.vue";
import PHowItWorksCard from "~/components/other/pHowItWorksCard.vue";
import PLiveAuctionCard from "~/components/other/pLiveAuctionCard.vue";
import PLiveAuctions from "~/components/other/pLiveAuctions.vue";

export default {
  components: {
    PLiveAuctions,
    PCreators,
    PHowItWorksCard,
    PLiveAuctionCard,
  },

  scrollToTop: true,
  filters: {
    currency(val) {
      if (val) {
        return val.toLocaleString();
      } else {
      }
    },
  },

  data: () => ({
    isHover: false,

    liveColor: "primary",
    currentColorIndex: 0,
    active: "All",
    active2: "For Creators",
  }),
  computed: {
    cards() {
      return [
        {
          img: "/img/social.svg",
          title: "Social",
          sub: "More than 25 million users globally",
          delay: 500,
        },
        {
          img: "/img/reliable.svg",
          title: "Reliable",
          sub: "Regulated by various authorities around the world",
          delay: 600,
        },
        {
          img: "/img/secure.svg",
          title: "Secure",
          sub: "Utilising top-tier security practices",
          delay: 700,
        },
        {
          img: "/img/global.svg",
          title: "Global",
          sub: "Providing services around the world",
          delay: 800,
        },
      ];
    },

    howItWorks() {
      return [
        {
          type: "up",
          title: "Set Up Your Wallet",
          description:
            "Set up your wallet and then you can create, sell & collect NFTs atProfit Point Trade-Nft.",
          color: "primary",
          icon: "mdi-wallet",
        },
        {
          type: "down",
          title: "Add Your NFTs",
          description:
            "After setting up your wallet, you can add your NFTs onProfit Point Trade-Nft.",
          color: "lime accent-3",
          iconColor: "black",
          icon: "mdi-grid-large",
        },
        {
          type: "up",
          title: "Sell Your NFTs",
          description:
            "After adding your NFTs, you can list your NFTs for sale.",
          color: "primary",
          icon: "mdi-cart-outline",
        },
      ];
    },

    liveAuctions() {
      return [
        {
          nft: "/img/nft1.jpeg",
          title: "COLOR",
          price: "3.0",
        },
        {
          nft: "/img/nft2.jpeg",
          title: "Abstract Art on Wall",
          price: "3.0",
        },
        {
          nft: "/img/nft3.jpeg",
          title: "PRIME",
          price: "3.0",
        },
        {
          nft: "/img/cover-img17.jpeg",
          title: "3D Ethereum in Diamond",
          price: "3.5",
        },
        {
          nft: "/img/nft4.jpeg",
          title: "Fantansy of Ethereum",
          price: "3.0",
        },
        {
          nft: "/img/nft5.jpeg",
          title: "Let's Go Galaxies in the Eons",
          price: "3.0",
        },
        {
          nft: "/img/cover-img11.jpeg",
          title: "The White Sand Storm",
          price: "0.0245",
        },
        {
          nft: "/img/cover-img12.jpeg",
          title: "Cubic and Planic Universe",
          price: "3.30",
        },
      ];
    },

    arts() {
      return [
        {
          nft: "/img/cover-img6.jpeg",
          title: "Softy Spehere Gradients",
          price: "40",
        },
        {
          nft: "/img/cover-img3.jpeg",
          title: "My yummy Plastic Omlet",
          price: "5.70",
        },
        {
          nft: "/img/cover-img5.jpeg",
          title: "My Yummy Plastic Omlet",
          price: "8.70",
        },
        {
          nft: "/img/cover-img14.jpeg",
          title: "Broken Alien Tech Cube Scalet",
          price: "3.55",
        },
        {
          nft: "/img/cover-img15.jpeg",
          title: "Fantasy of Ethereum",
          price: "2.20",
        },
        {
          nft: "/img/cover-img10.jpeg",
          title: "Let's Go To The Galaxies in the Eons",
          price: "0.0245",
        },
        {
          nft: "/img/cover-img11.jpeg",
          title: "The White Sand Storm",
          price: "3.0",
        },

        {
          nft: "/img/cover-img12.jpeg",
          title: "Cubic and Planic Universe",
          price: "3.30",
        },
      ];
    },
  },
  created() {
    window.scrollTo(0, 0);

    setInterval(() => {
      this.switchColor();
    }, 300);
  },
  methods: {
    switchColor() {
      let colors = ["primary", "success", "warning", "blue", "lime"];

      if (this.currentColorIndex === colors.length - 1) {
        this.currentColorIndex = 0;
      } else {
        this.currentColorIndex++;
      }

      this.liveColor = colors[this.currentColorIndex];
    },
  },
  head() {
    return {
      title: "Profit Point Trade",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "KEAL Nigeria is a non-profit, private-sector organization dedicated to providing financial support in the form of grants to non-government business organizations in other to support talented young innovators who face the world’s greatest environmental and social challenges and help them achieve their goals.",
        },

        {
          hid: "og:description",
          property: "og:description",
          content:
            "KEAL Nigeria is a non-profit, private-sector organization dedicated to providing financial support in the form of grants to non-government business organizations in other to support talented young innovators who face the world’s greatest environmental and social challenges and help them achieve their goals.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/Profit Point Tradenft.png",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "twitter:image:src",
          property: "twitter:image:src",
          content: "/Profit Point Tradenft.png",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "/Profit Point Tradenft.png",
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
      ],
      script: [],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css",
        },
      ],
    };
  },
};
</script>

<style scoped>
.rotate {
  transform: rotate(190deg);
}
.up {
  z-index: 2;
}

.bgc {
  background: linear-gradient(rgba(2, 42, 175, 0.541), rgba(1, 5, 56, 0.37)),
    url("/bg/17.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: #ffffff1c;
}

.gridStyle {
  position: absolute;
  top: -8rem;
  right: -4rem;
  transform: rotate(-20deg);
}

.textGradient {
  background: linear-gradient(to right, rgb(41, 98, 220), rgb(116, 225, 76));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
