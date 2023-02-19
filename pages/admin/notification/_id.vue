<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10">
        <v-card flat rounded="xl" dark color="dark" class="">
          <v-card-title class="d-flex align-center">
            <v-btn
              v-if="!showUser"
              @click="$router.go(-1)"
              fab
              icon
              color="secondary"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn v-else @click="showUser = false" fab icon color="warning">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-chip
              label
              outlined
              v-if="!showUser"
              @click="showUser = true"
              color="warning"
              class="text-subtitle-2 text-sm-subtitle-1"
              >view users {{ notification && notification.to.length }}</v-chip
            >
            <span
              v-else
              class="warning--text text-subtitle-2 text-sm-subtitle-1"
              >Users - {{ notification && notification.to.length }}</span
            >

            <v-spacer></v-spacer>
            <span class="text-caption light--text">
              {{ notification && notification.date }}
            </span>
          </v-card-title>
          <v-card-text v-if="!showUser" class="light--text px-sm-6">
            <div
              class="
                white--text
                text-capitalize text-subtitle-1 text-sm-h6
                font-weight-bold
              "
            >
              {{ notification && notification.title }}
            </div>

            <div
              v-html="notification && notification.message"
              class="mt-2 text-caption text-sm-subtitle-2"
            ></div>
          </v-card-text>
          <v-card-text v-else class="d-flex flex-wrap">
            <div
              class="
                d-flex
                flex-column
                light--text
                pa-2
                rounded-lg
                primary
                ma-1
                cursor-pointer
              "
              @click="$router.push(`/admin/user/${item.user.userID}`)"
              v-for="(item, i) in notification.to"
              :key="i"
            >
              <div class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold">
                {{ item.user.name }}
                <span
                  class="text-caption"
                  :class="item.open ? 'secondary--text' : 'error--text'"
                  >{{ item.open ? "Seen" : "Not seen" }}</span
                >
              </div>
              <span class="text-caption text-sm-subtitle-2">{{
                item.user.email
              }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
    
    <script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",

  data: () => ({
    showUser: false,
  }),
  computed: {
    ...mapGetters({ state: "admin/getState" }),
    id() {
      return this.$route.params.id;
    },

    notification() {
      const notification = this.state("notifications").find(
        (el) => el.id === this.id
      );
      console.log(notification);
      return notification;
    },
  },
};
</script>
    
    <style>
</style>