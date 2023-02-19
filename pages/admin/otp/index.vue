<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" class="light--text">
        <v-card dark flat rounded="lg" class="dark">
          <v-card-title class="light--text d-flex align-center">
            Withdrawal Codes -
            <span class="ml-1 secondary--text">{{
              wcodes && wcodes.length
            }}</span>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              large
              @click="generateWCode"
              :loading="loading.wcode"
              color="secondary dark--text"
              class="rounded-lg text-subtitle-2"
            >
              Generate Code
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-progress-linear
              v-if="loading.wcode"
              indeterminate
              color="secondary"
            />
            <v-row class="ma-0">
              <v-col
                v-for="(code, i) in wcodes"
                :key="i"
                cols="12"
                sm="6"
                md="3"
                class="d-flex pa-2 rounded-lg primary ma-1"
              >
                <div style="width: 100%" class="light--text d-flex flex-column">
                  <div
                    style="width: 100%"
                    class="text-caption text-sm-subtitle-2 d-flex align-center"
                  >
                    {{ code && code.code }}
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="copy(code && code.code)"
                      icon
                      fab
                      small
                      color="secondary"
                    >
                      <v-icon small>mdi-content-copy</v-icon>
                    </v-btn>
                  </div>
                  <div style="width: 100%" class="d-flex align-center mt-n1">
                    <v-chip
                      small
                      label
                      :color="
                        code && code.used ? 'error' : 'secondary dark--text'
                      "
                      >{{ code && code.used ? "Used" : "Active" }}</v-chip
                    >
                  </div>
                </div>
                <v-spacer></v-spacer>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "admin",

  computed: {
    ...mapGetters({ loading: "admin/getLoading", state: "admin/getState" }),
    wcodes() {
      return this.state("wcodes");
    },
  },

  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      generateWCode: "admin/generateWCode",
    }),
    async copy(payload) {
      await navigator.clipboard.writeText(payload);
      // alert('Wallet Address copied to clipboard')
      this.initAlert({
        is: true,
        persistence: true,
        type: "info",
        message: "W code copied to clipboard",
      });
    },
  },
};
</script>

<style>
</style>