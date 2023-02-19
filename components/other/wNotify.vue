<template>
  <v-snackbar
    v-if="notification"
    v-model="on"
    :value="true"
    :timeout="999999"
    bottom
    left
    dark
    color="transparent "
    elevation="24"
  >
    <v-card
      @click="openNotification(notification)"
      flat
      color="dark"
      class="rounded-lg"
    >
      <v-card-text class="border-s">
        <div class="text-caption light--text d-flex align-center">
          <v-icon size="20" color="secondary">mdi-bell</v-icon>
          <v-spacer></v-spacer>
          {{ notification && notification.date }}
        </div>
        <div class="secondary--text text-subtitle-1 font-weight-medium">
          {{ notification && notification.title }}
        </div>
        <div
          v-html="notification && notification.message"
          class="text--truncate light--text"
        ></div>
      </v-card-text>
    </v-card>
  </v-snackbar>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    top: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    on: true,
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      state: "admin/getState",
      getUserNotification: "admin/getUserNotification",
    }),
    notification() {
      const arr = [];
      this.getUserNotification(this.user && this.user.userID).forEach((el) => {
        if (!this.checkIfOpen(el)) {
          arr.push(el);
        }
      });
      console.log(arr);
      return arr ? arr[0] : null;
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
  
  <style>
.gpop {
  background: rgb(0, 11, 83);
  background: linear-gradient(36deg, rgb(1, 12, 80) 14%, rgb(3, 23, 151) 87%);
}
</style>
  