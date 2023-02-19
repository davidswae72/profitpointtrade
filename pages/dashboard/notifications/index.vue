<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col
        cols="12"
        md="10"
        class="text-subtitl-1 text-sm-h6 d-flex align-center font-weight-bold"
      >
        <v-btn
          class="mr-2"
          fab
          small
          color="secondary"
          icon
          @click="$router.go(-1)"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Notifications -
        <span class="secondary--text ml-1"> {{ notifications.length }}</span>
      </v-col>
    </v-row>
    <v-row v-if="notifications.length" justify="center" class="ma-0">
      <v-col
        v-for="(item, i) in notifications"
        :key="i"
        cols="12"
        md="10"
        lg="8"
      >
        <v-card
          @click="openNotification(item)"
          :style="checkIfOpen(item) ? 'opacity: 0.5' : ''"
          dark
          flat
          color="dark"
          class="rounded-xl"
        >
          <v-card-text class="border-s light--text">
            <div class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold">
              {{ item.title }}
            </div>
            <div
              v-html="item.message"
              class="text-caption text-sm-subtitle-2 text-truncate font-weight-thin"
            ></div>
            <div class="secondary--text text-caption mt-1">
              {{ item.date }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-icon size="100" color="light">mdi-bell</v-icon>
        <div class="light--text text-caption text-sm-subtitle-2">
          You have no notifications
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      state: "admin/getState",
      getUserNotification: "admin/getUserNotification",
    }),
    notifications() {
      const arr = this.getUserNotification(this.user && this.user.userID);
      arr.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      console.log("notificationsdsfabdflajbflabldjbflaj ", arr);
      return arr;
    },
  },

  methods: {
    ...mapActions({ updateNotification: "controller/updateNotification" }),

    openNotification(payload) {
      payload.to.find((el) => {
        if (String(el.user.userID) === String(this.user && this.user.userID)) {
          if (!el.open) {
            console.log(el);
            el.open = true;
            this.updateNotification(payload);
          }
        }
      });
      this.$router.push(`/dashboard/notifications/${payload.id}`);
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

<style></style>
