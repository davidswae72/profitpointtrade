<template>
  <v-app class="grey lighten-3" style="position: relative">
    <div class="pa-0">
      <v-app-bar
        dark
        fixed
        flat
        app
        elevation
        outlined
        color="transparent"
        class="pa-0"
      >
        <v-app-bar-nav-icon @click.stop="(mini = !mini), (drawer = true)" />
        <!-- 
        <v-toolbar-items flat color="transparent white--text">
          <v-btn tile="" color="" class="font-weight-regular" text exact>
            {{ activePage }}
          </v-btn>
        </v-toolbar-items>

        <v-spacer />
        <v-btn
          depressed
          small
          to="/dashboard/upload"
          class="rounded-mg text-subtitle-2 text-capitalize success"
        >
          <v-icon color="wite" small :left="$vuetify.breakpoint.smAndUp"
            >mdi-plus</v-icon
          >
          <span class="d-none d-sm-block">Create New Project</span>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon fab v-on="on">
              <v-icon> fas fa-user-circle </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              dense
              to="/dashboard/account"
              @click="switchPage('Settings')"
            >
              <v-list-item-icon>
                <v-icon size="20" class="px-1"> mdi-account </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-divider />
            <v-list-item dense @click="logout">
              <v-list-item-icon>
                <v-icon size="20" class="px-1"> fas fa-sign-out-alt </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <v-row no-gutters class="ma-0 pa-0">
          <v-col cols="12" class="pa-0 black">
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
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      :touchless="false"
      src="/bg/pattern.png"
      width="220"
      mobile-breakpoint="700"
      class="dark"
    >
      <v-list-item class="px-2">
        <v-list-item-title class="text-h4 font-weight-bold pa-2">
          <v-img height="60" contain src="/logo4.svg" class="" />
        </v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon color="secondary"> mdi-chevron-left </v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          exact
          link
          dark
          active-class="secondary--text white   font-weight-medium"
          class="my-0 text-subtitle-2 font-weight-light"
          @click="switchPage(link.name)"
        >
          <v-list-item-icon>
            <v-icon size="20" color="">
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1">{{
              link.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav class="my-0 text-subtitle-2 font-weight-medium">
        <v-list-item class="" @click="logout">
          <v-list-item-icon>
            <v-icon size="20" color="error"> fas fa-sign-out-alt </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="error--text text-subtitle-1">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <p-side-bar />

    <v-main class="openSans black light--text pb-12">
      <!-- This code alerts the user if he/she is offline -->
      <p-loading style="z-index: 10" />
      <v-card
        v-if="$nuxt.isOffline"
        style="z-index: 999; width: 100%; position: absolute"
        tile
        flat
        dark
        class="mt-n15"
        :color="$nuxt.isOffline ? 'warning' : 'secondary'"
      >
        <v-card-text class="py-1">
          <v-icon color="white" size="36" left>
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card>
      <popup />
      <w-notify />
      <p-alert />
      <v-idle
        v-if="false"
        :reminders="[10]"
        :duration="10"
        @idle="onidle"
        @remind="onremind"
      />
      <v-row justify="center" class="ma-0 my-4">
        <v-col cols="12" md="11" class="py-0">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-h5 secondary--text font-weight-bold">
                {{ activePage }}
              </div>
              <!-- <div class="text-caption">johndoe@gmail.com</div> -->
            </div>
            <v-spacer></v-spacer>
            <v-btn x-large outlined color="secondary" class="rounded-xl">
              <div class="text-h3 font-weight-bold">
                Trade Level {{ user && user.account.level }}
              </div>
              <div
                style="width: 20px; height: 25px"
                class="d-flex flex-column ml-2 justify-end dark"
              >
                <div
                  v-for="(item, i) in getLevel"
                  :key="i"
                  style="width: 100%; padding: 1px; margin: 1.5px 0"
                  class="rounded-lg secondary"
                ></div>
              </div>
            </v-btn>
            <v-badge
              v-if="notifications"
              color="light dark--text"
              :content="notifications"
              overlap
              offset-x="15"
              offset-y="15"
            >
              <v-btn to="/dashboard/notifications" icon class="ml-2">
                <v-icon size="30" color="secondary">mdi-bell</v-icon>
              </v-btn>
            </v-badge>
            <v-btn v-else to="/dashboard/notifications" icon class="ml-2">
              <v-icon size="30" color="secondary">mdi-bell</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer fixed class="dark pa-0">
      <v-bottom-navigation
        dark
        class="dark d-block py-2 d-sm-none d-flex justity-space-around"
      >
        <v-btn
          v-for="link in sideLinks"
          :key="link.name"
          dark
          text
          color="dark"
          @click="goto(link.name, link.route)"
        >
          <span
            :class="isActive(link.route) ? 'secondary--text' : 'light--text'"
            class="text-caption mt-2"
            >{{ link.name }}</span
          >
          <v-icon :color="isActive(link.route) ? 'secondary' : 'light'">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PAlert from "~/components/other/pAlert.vue";
import Popup from "~/components/other/popup.vue";
import PLoading from "~/components/other/pLoading.vue";
import PSideBar from "~/components/other/pSideBar.vue";
import wNotify from "~/components/other/wNotify.vue";

export default {
  components: { PAlert, PLoading, PSideBar, Popup, wNotify },
  data: () => ({
    tab: null,
    messages: 2,
    drawer: true,
    mini: true,
    permanent: true,
    color: "secondary",
  }),
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
    };
  },

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      activePage: "controller/getActivePage",
      sideBar: "controller/getSideBar",
      state: "admin/getState",
      getUserNotification: "admin/getUserNotification",
    }),

    notifications() {
      const arr = [];
      this.getUserNotification(this.user && this.user.userID).forEach((el) => {
        console.log(el);
        console.log(this.checkIfOpen(el));

        if (!this.checkIfOpen(el)) {
          arr.push(el);
        }
      });

      return arr.length;
    },

    getLevel() {
      const level = this.user && this.user.account.level;
      if (level <= 20) {
        return 1;
      } else if (level <= 40 && level > 20) {
        return 2;
      } else if (level <= 60 && level > 40) {
        return 3;
      } else if (level <= 80 && level > 60) {
        return 4;
      } else if (level <= 100 && level > 80) {
        return 5;
      }
    },
    sideLinks() {
      const arr = [
        {
          name: "Dashboard",
          route: "/dashboard/home",
          icon: "mdi-home-variant",
        },
        {
          name: "Account",
          route: "/dashboard/account",
          icon: "mdi-account",
        },
        {
          name: "Trade",
          route: "/dashboard/trade",
          icon: "mdi-finance",
        },
        {
          name: "Deposit",
          route: "/dashboard/deposit",
          icon: "mdi-cash-plus",
        },
        {
          name: "Withdraw",
          route: "/dashboard/withdraw",
          icon: "mdi-bank",
        },
        {
          name: "Loan",
          route: "/dashboard/loan",
          icon: "mdi-currency-usd",
        },
      ];
      // if (this.user && this.user.role.name === 'admin') {
      //   arr.unshift({ name: 'Admin', route: '/admin', icon: 'mdi-account-tie' })
      // }
      return arr;
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.$store.dispatch("authentication/handleAuth");
    // this.$store.dispatch("controller/initApp");
    if (this.$vuetify.breakpoint.xsOnly) {
      this.drawer = false;
    }
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
    onidle() {
      // this.logout()
      this.initAlert({
        is: true,
        type: "info",
        timer: 0,
        message: "You have been logged out",
      });
    },
    onremind(time) {
      console.log(time);
      // this.initAlert({
      //   is: true,
      //   persistence: true,
      //   timer: time,
      //   type: 'info',
      //   message: 'Due to inactivity you will be logged out in'
      // })
    },

    isActive(route) {
      return this.$route.path.includes(route) ? true : false;
    },

    checkIfOpen(payload) {
      let state = false;
      payload.to.find((el) => {
        if (String(el.user.userID) === String(this.user && this.user.userID)) {
          state = el.open;
        }
      });
      return state;
    },
  },
};
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}

@media only screen and (max-width: 600px) {
}
</style>
