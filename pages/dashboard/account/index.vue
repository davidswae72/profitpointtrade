<template>
  <v-container class="px-0">
    <v-row justify="center" class="ma-0 primary">
      <v-col cols="12" md="11" class="d-flex align-center py-6">
        <v-avatar size="80" color="secondary" cal>
          <div class="mb-n2">
            <v-img src="/logo6.svg"></v-img>
          </div>
        </v-avatar>
        <div class="light--text ml-4">
          <div class="d-flex align-center">
            <h4 class="text-h6 font-weight-bold">{{ user && user.name }}</h4>
            <v-chip
              small
              label
              :color="user && user.account.status ? 'secondary' : 'error'"
              class="ml-2"
              >{{
                user && user.account.status ? "Verified" : "Not Verified"
              }}</v-chip
            >
          </div>
          <div class="text-caption">{{ user && user.email }}</div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 py-4">
      <v-col cols="12" md="6">
        <div v-for="item in buttons" :key="item.title" class="my-4">
          <div
            class="secondary--text text-h6 font-weight-bold mb-2 text-capitalize"
          >
            {{ item.title }}
          </div>
          <div
            @click="btn.action"
            v-for="(btn, i) in item.btns"
            :key="i"
            v-ripple
            style="margin: 1.5px 0"
            :class="`${getBorderClass(item.btns, i)} ${
              btn.name.toLowerCase() === 'logout'
                ? 'error white--text'
                : 'light dark--text'
            }`"
            class="cursor-pointer text-subtitle-2 text-sm-subtitle-1 px-4 py-2 d-flex align-center text-capitalize font-weight-medium"
          >
            <span> {{ btn.name }} </span>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :color="btn.name.toLowerCase() === 'logout' ? 'white' : 'dark'"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "dashboard",

  computed: {
    ...mapGetters({ user: "authentication/getUser" }),
    buttons() {
      // const this =
      return [
        {
          title: "General",
          btns: [
            {
              name: "Profile Settings",
              action: () => {
                this.$router.push("/dashboard/account/profile");
              },
            },
            {
              name: "Next Of Kin",
              action: () => {
                this.$router.push("/dashboard/account/nextofkin");
              },
            },
          ],
        },
        {
          title: "Verification",
          btns: [
            {
              name: `Level ${this.user && this.user.account.level}`,
              action: () => {
                this.$router.push("/dashboard/account/verification");
              },
            },
          ],
        },
        {
          title: "Security",
          btns: [
            {
              name: "Change Password",
              action: () => {
                this.$router.push("/dashboard/account/security");
              },
            },
            // {
            //   name: "Change Pin",
            //   action: () => {
            //     this.$router.push("/dashboard/account/pin");
            //   },
            // },
            // {
            //   name: "Activities",
            //   action: () => {
            //     this.$router.push("/dashboard/account/activities");
            //   },
            // },
            // {
            //   name: "Set up 2FA",
            //   action: () => {
            //     this.$router.push("/dashboard/account/2fa");
            //   },
            // },
          ],
        },
        {
          title: "Promotions",
          btns: [
            {
              name: "Referral and earnings",
              action: () => {
                this.$router.push("/dashboard/account/referral");
              },
            },
          ],
        },
        // {
        //   title: "Support",
        //   btns: [
        //     {
        //       name: "FAQs",
        //       action: () => {
        //         this.$router.push("/dashboard/account/faq");
        //       },
        //     },
        //     {
        //       name: "Chat customer support",
        //       action: () => {
        //         this.$router.push("/dashboard/account/support");
        //       },
        //     },
        //   ],
        // },
        {
          title: "Exit",
          btns: [
            {
              name: "Logout",
              action: () => {
                this.$store.dispatch("authentication/logoutUser");
              },
            },
          ],
        },
      ];
    },
  },

  methods: {
    getBorderClass(arr, index) {
      const lastIndex = arr.length - 1;
      let style = "";
      if (index === 0 && lastIndex !== 0) {
        style = "rounded-t-lg";
      } else if (index === lastIndex && lastIndex !== 0) {
        style = "rounded-b-lg";
      } else if (arr.length == 1) {
        style = "rounded-lg";
      } else {
        style = "rounded-none";
      }
      return style;
    },
  },
};
</script>

<style></style>
