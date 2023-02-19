<template>
  <v-row v-if="!display" justify="center" class="ma-0">
    <v-col cols="12" v-for="(item, i) in actions" :key="i">
      <v-card
        @click="display = item.component"
        flat
        dark
        rounded="xl"
        class="dark"
      >
        <v-card-text class="border-s d-flex light--text py-6">
          <v-btn small outlined fab depressed color="secondary">
            <v-icon size="20">{{ item.icon }}</v-icon>
          </v-btn>
          <div class="d-flex flex-column ml-2 ml-sm-4">
            <span class="text-subtitle-1 text-sm-h6 font-weight-bold">{{
              item.title
            }}</span>
            <span class="text-caption text-subtitle-2">{{
              item.description
            }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center" class="ma-0" v-else>
    <v-col cols="12">
      <v-btn @click="display = null" fab icon color="warning">
        <v-icon> mdi-close </v-icon>
      </v-btn>

      <span
        class="ml-2 warning--text font-weight-bold text-subtitle-1 text-sm-h6"
        >{{ title }}</span
      >
    </v-col>
    <v-col cols="12" class="pa-0">
      <keep-alive>
        <component :is="display" />
      </keep-alive>
    </v-col>
  </v-row>
</template>

<script>
import Identity from "@/components/user/verification/identity.vue";
import Selfie from "@/components/user/verification/selfie.vue";
export default {
  components: { Identity, Selfie },

  data: () => ({
    display: null,
  }),

  computed: {
    title() {
      const obj = {
        identity: "Identity verification",
        selfie: "Take a selfie",
      };

      return obj[this.display];
    },
    actions() {
      return [
        {
          title: "Identity verification",
          description:
            "You are required to take a photograph of the front or both sides of your government approved identification document",
          icon: "mdi-account-convert",
          component: "identity",
        },
        {
          title: "Take a selfie",
          description:
            "Ensure you have a good lighting as you prepare to take a selfie",
          icon: "mdi-account-box",
          component: "selfie",
        },
      ];
    },
  },
};
</script>

<style>
</style>