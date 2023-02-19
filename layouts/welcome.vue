<template>
  <v-app class="dark relative">
    <v-main class="openSans dark wbg">
      <v-card v-if="$nuxt.isOffline" tile flat dark color="secondary">
        <v-card-text class="py-1">
          <v-icon color="white" size="36" left>
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card>
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>

      <img
        src="/img/blur1.svg"
        width="600"
        alt=""
        class="fixed"
        style="left: 0; bottom: -20rem; pointer-events: none"
      />
      <!-- <div class="elfsight-app-1b55083c-30ee-4e7a-be90-79b928a90680"></div> -->
      <p-alert />
    </v-main>
  </v-app>
</template>

<script>
import PAlert from "~/components/other/pAlert.vue";
export default {
  components: { PAlert },
  async created() {
    // await this.$store.dispatch("controller/runApp");
    await this.$store.dispatch("controller/initCurrency");
  },
  head() {
    return {
      title: "Welcome",
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
      ],

      script: [{ src: "https://apps.elfsight.com/p/platform.js" }],
    };
  },
};
</script>

<style>
.bgpattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
