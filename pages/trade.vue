<template>
  <v-container fluid class="pa-0 overflow py-16">
    <v-row justify="center" class="align-center pt-16 ma-0">
      <v-col cols="12" md="10" class="white--text text-center py-16">
        <div
          class="text-h4 text-md-h3 text-lg-h2 text-capitalize font-weight-bold mt-10"
        >
          Trade and invest in top markets
        </div>
        <div class="text-h6 font-weight-light my-5">
          Manage all of your financial assets, long and short term, in one
          portfolio
        </div>
        <v-btn
          depressed
          to="/register"
          x-large
          color="secondary"
          class="text-capitalize primary--text text-subtitle-1 rounded-xl font-weight-bold"
        >
          Let's start
          <v-icon right size="20" color="primary">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="pa-1 secondary mt-10"></v-col>
    </v-row>
    <v-row justify="center" class="ma-0 py-10 mt-10 white pt-16">
      <v-col cols="12" md="10" lg="8" class="text-center pt-16">
        <h2
          style="line-height: 1"
          class="text-h4 text-sm-h2 dark--text my-6 font-weight-bold"
        >
          Trade Certifications
        </h2>
        <p
          class="dark--text text--lighten-4 text-sm-h6 font-weight-light mt-n2"
        >
          Certificate of incorporation of a private limited company
        </p>
      </v-col>

      <v-col cols="12" md="10" lg="8" class="py-0 d-flex justify-center">
        <v-card tile color="transparent" flat class="py-6 rounded-xl">
          <v-img src="/img/cert.png" contain />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="align-center white px-md-16 px-4 py-16 ma-0">
      <v-col cols="12" md="10" lg="8" class="text-center pl-md-10 my-6 mb-12">
        <div
          class="text-h4 text-md-h3 text-lg-h2 text-capitalize font-weight-bold"
        >
          Diversify with ETFs
        </div>
        <div class="text-h6 font-weight-light mt-5">
          Exchange-traded funds (ETFs) allow investors a flexible yet
          comprehensive way of investing in the financial markets at a low-cost
          entry point and without management fees — making them ideal for
          portfolio diversification. eToro offers both investing in ETFs as the
          underlying asset, as well as trading them as CFDs.
        </div>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12" sm="6" md="4" class="py-0">
        <div
          class="livecoinwatch-widget-1 mx-auto"
          lcw-coin="BTC"
          lcw-base="USD"
          lcw-secondary="BTC"
          lcw-period="d"
          lcw-color-tx="#000000"
          lcw-color-pr="#00d084"
          lcw-color-bg="#ffffff"
          lcw-border-w="1"
        ></div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="py-0">
        <div
          class="livecoinwatch-widget-1 mx-auto"
          lcw-coin="ETH"
          lcw-base="USD"
          lcw-secondary="BTC"
          lcw-period="d"
          lcw-color-tx="#000000"
          lcw-color-pr="#00d084"
          lcw-color-bg="#ffffff"
          lcw-border-w="1"
        ></div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="py-0">
        <div
          class="livecoinwatch-widget-1 mx-auto"
          lcw-coin="USDT"
          lcw-base="USD"
          lcw-secondary="BTC"
          lcw-period="d"
          lcw-color-tx="#000000"
          lcw-color-pr="#00d084"
          lcw-color-bg="#ffffff"
          lcw-border-w="1"
        ></div>
      </v-col>
    </v-row>
    <v-row justify="center" class="white text2--text py-16 px-4 px-md-10">
      <v-col
        v-for="policy in policies"
        :key="policy.name"
        data-aos="fade-up"
        :data-aos-delay="policy.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="10"
        class="mb-6"
      >
        <div class="text-h5 text-md-h3 font-weight-light mb-4">
          {{ policy.name }}
        </div>
        <div class="font-weight-light" v-html="policy.description" />
      </v-col>
    </v-row>
    <v-row justify="center" class="py-16 ma-0 white">
      <v-col cols="12" class="text-center mb-6 opacity">
        <div
          class="text-h5 text-md-h4 text-lg-h3 text-capitalize font-weight-bold"
        >
          FAQ<span
            class="secondary--text text-h6 text-md-h5 text-lg-h4 font-weight-bold"
            >s</span
          >
        </div>
      </v-col>
      <v-col cols="12" md="10">
        <div
          style="
            border: 2px solid #ffffff;
            border-radius: 7px;
            overflow: hidden;
          "
        >
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(item, i) in faq" :key="i" class="white">
              <v-expansion-panel-header
                class="dark--text text-subtitle-1 text-sm-h6 font-weight-light"
              >
                {{ item.name }}
                <template v-slot:actions>
                  <v-icon color="secondary" size="30"> mdi-plus </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="dark--text font-weight-light">
                {{ item.des }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Forex",

  data: () => ({
    faq: [
      {
        name: "What is CFD?",
        des: " CFD - Contract for Difference. CFD is type of financial asset which helps trader to gain and earn in a continuous way. By predicting the move of a currency, trader can choose to open BUY or SELL contract for any asset",
      },
      {
        name: "What is binary option?",
        des: "Binary options are a simple and potentially very profitable way to make money from short term movements on the market. By correctly predicting whether the price of an asset will go up or down, you can get a significant income in a continuous way.",
      },
      {
        name: "What are the benefits of trading the markets with Afflucnce Trades",
        des: "Affluence Trade is the world’s leading social trading platform, trusted by millions of users from more than 140 countries. Benefits of trading the financial markets on Affluence Trade include:1 -Trade multiple asset classes with a single account. 2 - Low and transparent fees. 3- Trading tools to help both novices and experts. 4 -Wisdom of the crowd via social trading. 5 -Intuitive, easy-to-use platform.6 -Affluence Trade Club members receive additional perks, including discounted fees and a dedicated Account Manager.",
      },
      {
        name: "How to copy other investors",
        des: "CopyTrader™, Affluence Trade’s most popular feature, allows you to view what real traders are doing in real time and copy their trading automatically. Sterling Stock Investment also offers ready-made investment portfolios that you can copy",
      },
      {
        name: "What is Compactpay?",
        des: "Compactpay is a digital currency, which functioning is based on blockchain techology. Physically currency doesn't exist, it exist only in virtuality. The most popular cryptocurrencies are Bitcoin, Ethereum, Litecoin, Dash, Ripple. You can use these currencies to fund and trade.",
      },
      {
        name: "What is the minimum and maximum deposit amount?",
        des: "The minimum deposit amount is 150$ (or €), and the maximum - 50000$ (or €).",
      },
      {
        name: "Do I have to download any software for trading?",
        des: "There is no need to download something before you can start trading with Trust Investment. All you need to do is sign up and add funds into your account and you’ll be ready to start trading.",
      },
      {
        name: "Is there any maintenance or registration fee?",
        des: "No, it is free to open an account with Trust Investment.",
      },
      {
        name: "How can I sign up?",
        des: "To sign up go to ‘Open an Account’ and enter the required information.Please make sure the data you submit is correct and up to date. In the future it will simplify withdrawal process.",
      },
    ],
    policies: [
      {
        name: "What is Forex?",
        delay: 500,
        description: `
          <Forex>Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. The basis of the forex market is the fluctuations of exchange rates. Forex traders speculate on the price fluctuations of currency pairs, making money on the difference between buying and selling prices.</p>
          `,
      },
      {
        name: "What is Margin?",
        delay: 500,
        description: `
          <p>Margin is the amount of a trader’s funds required to open a new position. Margin is estimated based on the size of your trade, which is measured in lots. A standard lot is 100,000 units. We also provide mini lots (10,000 units), micro lots (1,000 units) and nano lots (100 units). The greater the lot, the bigger the margin amount. Margin allows you to trade with leverage, which, in turn, allows you to place trades larger than the amount of your trading capital. Leverage influences the margin amount too.</p>
          `,
      },
      {
        name: "What is leverage?",
        delay: 500,
        description: `
          <p>Leverage is the ability to trade positions larger than the amount of capital you possess. This mechanism allows traders to use extra funds from a broker in order to increase the size of their trades. For example, 1:100 leverage means that a trader who has deposited $1,000 into his or her account can trade with $100,000. Although leverage lets traders increase their trade size and, consequently, potential gains, it magnifies their potential losses putting their capital at risk.</p>
          
          `,
      },
      {
        name: "When is the forex market open?",
        delay: 500,
        description: `
          <p>Due to different time zones, the international forex market is open 24 hours a day — from 5 p.m. Eastern Standard Time (EST) on Sunday to 4 p.m. EST on Friday, except holidays. Markets first open in Australasia, then in Europe and afterwards in North America. So, when the market closes in Australia, traders can have access to markets in other regions. The 24-hour availability of the forex market is what makes it so attractive to millions of traders.</p>
          
          `,
      },
    ],
  }),
  head() {
    return {
      title: "Forex",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. ",
        },
      ],
    };
  },

  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
.bg-forex {
  background: linear-gradient(rgba(0, 149, 255, 0.6), rgba(0, 149, 255, 0.6)),
    url("/assets/bgcash.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width: 100vw;
  overflow: hidden;
}
</style>
