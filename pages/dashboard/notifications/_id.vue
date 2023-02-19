<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="8">
        <v-card flat rounded="xl" dark color="dark" class="">
          <v-card-title class="d-flex align-center">
            <v-btn @click="$router.go(-1)" fab icon color="secondary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <span class="text-caption light--text">
              {{ notification && notification.date }}
            </span>
          </v-card-title>
          <v-card-text class="light--text px-sm-6">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",
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