<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="8" class="px-0 px-sm-2">
        <v-card flat rounded="xl" dark color="dark" class="py-4">
          <v-card-title class="">
            <v-btn @click="$router.go(-1)" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div class="d-flex flex-column">
              <span
                class="white--text text-capitalize text-h6 font-weight-bold"
                >{{ title.name }}</span
              >
              <span class="text-caption light--text">
                {{ title.sub }}
              </span>
            </div>
          </v-card-title>

          <v-card-text class="px-0 px-sm-2">
            <keep-alive>
              <component :is="id" />
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Security from "@/components/user/security.vue";
import Profile from "@/components/user/profile.vue";
import Nextofkin from "@/components/user/nextofkin.vue";
import Referral from "@/components/user/referral.vue";
import Verification from "@/components/user/verification/verification.vue";
export default {
  layout: "dashboard",
  components: { Security, Profile, Nextofkin, Referral, Verification },
  computed: {
    id() {
      return this.$route.params.id;
    },

    title() {
      const obj = {
        profile: {
          name: "Profile Setting",
          sub: "Edit your profile details here",
        },
        nextofkin: {
          name: "Next Of Kin",
          sub: "We will pass your investment to your next of kin incase life happens",
        },
        verification: {
          name: "KYC Requirement",
          sub: "Before you start your KYC process, see what is required of you",
        },
        pin: {
          name: "Chang Pin",
          sub: "Enter your current pin",
        },
        security: {
          name: "Security",
          sub: "Change your password",
        },
        referral: { name: "Referral Earnings", sub: "Earn while you trade" },
        activities: { name: "Your Activities", sub: "" },
      };

      return obj[this.id];
    },
  },
};
</script>

<style>
</style>