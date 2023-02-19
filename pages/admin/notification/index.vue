<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10">
        <v-card dark flat rounded="lg" class="dark">
          <v-card-title class="light--text d-flex align-center">
            Notifications -
            <span class="ml-1 secondary--text">{{
              notifications && notifications.length
            }}</span>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              large
              to="/admin/notification/send"
              color="secondary dark--text"
              class="rounded-lg text-subtitle-2"
            >
              Send
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-progress-linear
              v-if="loading.notification"
              indeterminate
              color="secondary"
            />
            <v-row v-if="notifications.length" justify="center" class="ma-0">
              <v-col v-for="(item, i) in notifications" :key="i" cols="12">
                <v-card
                  @click="$router.push(`/admin/notification/${item.id}`)"
                  dark
                  flat
                  color="dark"
                  class="rounded-xl"
                >
                  <v-card-text class="border-s light--text">
                    <div
                      class="
                        text-subtitle-2 text-sm-subtitle-1
                        font-weight-bold
                        d-flex
                        align-center
                      "
                    >
                      {{ item.title }}

                      <v-spacer></v-spacer>
                      <span
                        class="text-caption text-sm-subtitle-2 warning--text"
                        >{{ item.to.length }} users</span
                      >
                    </div>
                    <div
                      v-html="item.message"
                      class="
                        text-caption text-sm-subtitle-2 text-truncate
                        font-weight-thin
                      "
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
                  You have not sent any notifications
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "admin",

  computed: {
    ...mapGetters({ state: "admin/getState", loading: "admin/getLoading" }),
    notifications() {
      return this.state("notifications");
    },
  },
};
</script>

<style>
</style>