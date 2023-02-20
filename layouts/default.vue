<template>
  <v-app class="dark" style="overflow: hidden; position: relative">
    <div>
      <v-app-bar
        flat
        fixed
        :width="$vuetify.breakpoint.smAndUp ? '90%' : '95%'"
        height="80"
        color=" primary--text"
        class="mx-auto mt-8 rounded-xl navGradient"
      >
        <v-toolbar-title>
          <v-btn
            height="60"
            text
            x-large
            to="/"
            class="font-weight-bold mx-0 text-capitalize"
          >
            <v-img max-width="40" src="/logo.svg" />
            <span class="hidden-sm-and-down ml-2 primary--text text-capitalize"
              >Profit Point Trade</span
            >
          </v-btn>
        </v-toolbar-title>

        <v-spacer />
        <v-toolbar-items flat class="hidden-sm-and-down" color="transparent">
          <v-btn
            v-for="link in mainLinks"
            :key="link"
            active-class=" font-weight-black secondary--text"
            class="home-active font-weight-bold text-capitalize text-subtitle-1"
            text
            :to="link.route"
            exact
          >
            {{ link.name }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-google-translate class="dark--text mr-2" />
        <v-btn
          depressed
          active-class=" font-weight-black primary--text"
          color="secondary dark--text"
          class="home-active font-weight-bold text-capitalize text-subtitle-2 hidden-sm-and-down rounded-pill"
          x-large
          to="/login"
          exact
        >
          Get started
        </v-btn>

        <v-app-bar-nav-icon
          class="d-md-none primary--text navicon-active"
          @click="drawer = true"
        />
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      left
      dark
      width="300"
      class="dark"
      style="max-width: 90%"
    >
      <v-list dark color="secondary--text" nav class="px-4">
        <v-list-item class="my-4 text-center">
          <v-btn height="90" text x-large to="/" class="font-weight-bold mx-0">
            <v-img max-width="100" src="/logo2.svg" />
          </v-btn>
        </v-list-item>
        <v-list-item-group>
          <v-list-item
            active-class="secondary--text font-weight-bold "
            v-for="link in mainLinks"
            :key="link.name"
            exact
            :to="link.route"
            class="font-weight-light"
          >
            <v-list-item-title class="text-h6">{{
              link.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-spacer />
        <v-btn
          block
          to="/register"
          depressed
          color="secondary dark--text"
          x-large
          class="text-capitalize my-4 rounded-xl font-weight-bold"
        >
          Get started
          <v-icon right size="20" color="primary">mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          block
          to="/login"
          depressed
          outlined
          color="secondary "
          x-large
          class="text-capitalize my-4 rounded-xl font-weight-bold"
        >
          Sign in
          <v-icon right size="20">mdi-arrow-right</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <p-side-bar />

    <v-main class="openSans dark">
      <!-- This code alerts the user if he/she is offline -->
      <popup />
      <v-card
        v-if="$nuxt.isOffline"
        style="z-index: 999; position: fixed; right: 0"
        tile
        flat
        dark
        class="mt-n8 ma-2 rounded-lg"
        width="400"
        max-width="100%"
        color="text1"
      >
        <v-card-text class="py-1 warning">
          <v-icon color="white" size="36" left>
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card>
      <p-alert />
      <v-idle
        v-if="false"
        :reminders="[10]"
        :duration="10"
        @idle="onidle"
        @remind="onremind"
      />

      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer class="dark py-6">
      <v-row justify="center" class="ma-0">
        <v-col cols="12" md="11">
          <v-row justify="center" class="ma-0">
            <v-col cols="12" md="6" class="pa-0">
              <v-btn text x-large to="/" class="font-weight-bold">
                <v-img max-width="130" src="/logo3.svg" />
              </v-btn>
              <p
                class="light--text text-subtitle-2 tet-subtitle-1 font-weight-light"
              >
                With innovative investment tools and a collaborative trading
                community, Profit Point Trade empowers millions of users
                in over 140 countries to trade and invest in a simple and
                transparent way.
              </p>
              <div class="my-4">
                <v-btn depressed small fab color="secondary" class="mx-2">
                  <v-icon color="dark" size="20">mdi-whatsapp</v-icon>
                </v-btn>
                <v-btn depressed small fab color="secondary" class="mx-2">
                  <v-icon color="dark" size="20">mdi-phone</v-icon>
                </v-btn>
                <v-btn
                  style="transform: rotate(-45deg)"
                  depressed
                  href="https://telegram.org/dl"
                  target="_blank"
                  small
                  fab
                  color="secondary"
                  class="mx-2"
                >
                  <v-icon color="dark" size="20">mdi-send</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pa-0">
              <v-row class="ma-0">
                <v-col cols="12" class="px-0">
                  <span class="white--text text-h6 text-sm-h5 font-weight-bold"
                    >Receive Latest Updates for Free</span
                  >
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    name="email"
                    type="text"
                    flat
                    solo
                    class="text-subtitle-2 rounded-lg"
                    color="secondary"
                    placeholder="Email Address"
                    required
                  />
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-btn
                    depressed
                    block
                    large
                    color="secondary dark--text"
                    class="text-capitalize text-subtitle-1 rounded-lg font-weight-medium"
                  >
                    Subscribe
                  </v-btn>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div>
                    <span
                      class="text3--text text-h6 text-sm-h5 font-weight-bold"
                      >Navigation</span
                    >
                    <div class="d-flex flaex-wrap align-center ml-n4">
                      <v-btn
                        v-for="link in mainLinks"
                        :key="link"
                        active-class=" font-weight-black secondary--text"
                        class="footer-active font-weight-bold text-capitalize text-subtitle-1"
                        text
                        :to="link.route"
                        exact
                      >
                        {{ link.name }}
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="11" class="py-0 pr-8">
          <p class="text-caption light--text text-justify">
            FDs are complex instruments and come with a high risk of losing
            money rapidly due to leverage. 79% of retail investor accounts lose
            money when trading CFDs with this provider. You should consider
            whether you understand how CFDs work, and whether you can afford to
            take the high risk of losing your money.
          </p>
          <p class="text-caption light--text text-justify">
            Cryptocurrencies markets are unregulated services which are not
            governed by any specific European regulatory framework (including
            MiFID) or in Seychelles. Therefore, when using our Cryptocurrencies
            Trading Service, you will not benefit from the protections available
            to clients receiving MiFID regulated investment services, such as
            access to the Cyprus Investor Compensation Fund (ICF)/the Financial
            Services Compensation Scheme (FSCS) and the Financial Ombudsman
            Service for dispute resolution, or the protections available under
            Seychelles regulatory framework (as applicable).
          </p>
        </v-col>
        <v-col
          cols="12"
          md="11"
          class="d-flex warning--text justify-center justify-md-space-between align-center pa-4 px-sm-10 text-caption text-md-subtitle-2"
        >
          <v-btn
            text
            x-large
            to="/"
            class="font-weight-bold hidden-sm-and-down"
          >
            <v-img max-width="100" src="/logo8.svg" />
          </v-btn>

          <span class="py-1">Copyright © 2021</span>

          <span class="py-1">All rights reserved.</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PAlert from "~/components/other/pAlert.vue";
import Popup from "~/components/other/popup.vue";
import PSideBar from "~/components/other/pSideBar.vue";

export default {
  components: { PAlert, PSideBar, Popup },
  data: () => ({
    tab: null,

    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    messages: 2,
    drawer: false,
    permanent: true,
    color: "text1",
    socialLink: [
      {
        name: "facebook",
        to: "https://facebook.com",
        icon: "mdi-facebook",
      },
      {
        name: "twitter",
        to: "https://twitter.com",
        icon: "mdi-twitter",
      },
      {
        name: "instagram",
        to: "https://instagram.com",
        icon: "mdi-instagram",
      },
      {
        name: "whatsapp",
        to: "/",
        icon: "mdi-whatsapp",
      },
    ],
  }),

  async created() {
    // await this.$store.dispatch("controller/runApp");
    await this.$store.dispatch("controller/initCurrency");
  },
  head() {
    return {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap",
        },
      ],
      script: [
        {
          src: "//widgets.coingecko.com/coingecko-coin-converter-widget.js",
        },
        {
          src: "https://www.livecoinwatch.com/static/lcw-widget.js",
        },
        {
          src: "https://files.coinmarketcap.com/static/widget/currency.js",
        },
        { src: "//code.tidio.co/vgmxlvetuzdlklbjrb8hkftsnl2yvawh.js" },
      ],
      // script: [{ src: "//code.tidio.co/qhqdwhaiplrab4nxepjtlmdbqog6jwkz.js" }],
    };
  },

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      activePage: "controller/getActivePage",
      sideBar: "controller/getSideBar",
    }),
    mainLinks() {
      const arr = [
        { name: "Home", route: "/", icon: "mdi-home-variant" },
        {
          name: "About",
          route: "/about",
          icon: "mdi-finance",
        },
        {
          name: "Trade",
          route: "/trade",
          icon: "mdi-wallet",
        },

        {
          name: "Contact",
          route: "/contact",
          icon: "mdi-account",
        },
      ];
      // if (this.user && this.user.role.name === 'admin') {
      //   arr.unshift({ name: 'Admin', route: '/admin', icon: 'mdi-account-tie' })
      // }
      return arr;
    },
  },

  methods: {
    ...mapMutations({ setActivePage: "controller/setActivePage" }),
    ...mapActions({ initAlert: "controller/initAlert" }),
    switchPage(page) {
      this.setActivePage(page);
    },
    goto(page, to) {
      this.$router.push(to);
      this.setActivePage(page);
    },

    logout() {
      this.$store.dispatch("authentication/logoutUser");
    },
  },
};
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}

.relative {
  position: relative;
}
.absolute {
  width: 100vw;
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
}
.v-btn:before {
  background-color: transparent;
}
.karla {
  font-family: "Karla", sans-serif;
}
.openSans {
  font-family: "Open Sans", sans-serif;
}
.playfair {
  font-family: "Playfair Display", serif;
}
.dmSans {
  font-family: "DM Sans", sans-serif;
}
.home-active {
  color: #062455;
}
.navicon-active,
.home-active,
.footer-active {
  transition: all 0.3s ease-in-out;
}
.footer-active {
  color: #fff4c8;
}
.footer-active:hover {
  color: #fcd435;
}
.home-active:hover {
  color: #fcd435;
}

.navicon-active:hover {
  color: #fcd435;
}

.footerGradient {
  background: linear-gradient(to right, rgb(201, 218, 255), rgb(241, 255, 190));
}
@media only screen and (max-width: 600px) {
}
</style>
