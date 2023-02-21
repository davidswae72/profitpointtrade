<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" class="light--text">
        <v-card dark flat rounded="lg" class="dark">
          <v-card-title class="light--text d-flex align-center">
            Managers -
            <span class="ml-1 secondary--text">{{
              managers && managers.length
            }}</span>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              @click="$router.push('/admin/managers/add')"
              large
              color="secondary dark--text"
              class="rounded-lg text-subtitle-2"
            >
              Add
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-progress-linear
              v-if="loading.manager"
              indeterminate
              color="secondary"
            />
            <v-row justify="center" class="ma-0 mt-2">
              <v-col cols="12" class="pa-0">
                <w-container
                  :loading="loading.manager"
                  dark
                  class="primary"
                  title="Managers"
                >
                  <v-row class="ma-0">
                    <v-col
                      v-for="(item, i) in managers"
                      :key="i"
                      cols="12"
                      sm="6"
                      lg="4"
                      class=""
                    >
                      <v-card flat color="primary darken-1 rounded-lg px-0">
                        <v-card-text class="">
                          <v-row class="ma-0">
                            <v-col cols="12" class="px-0 d-flex align-center">
                              <v-avatar color="secondary">
                                <v-img src="logo1.svg"></v-img>
                              </v-avatar>
                              <div
                                style="width: 100%"
                                class="light--text d-flex flex-column ml-2"
                              >
                                <div class="d-flex align-center">
                                  <span class="text-h6 font-weight-bold">{{
                                    item.name
                                  }}</span>
                                  <v-spacer></v-spacer>

                                  <v-menu dark left bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        v-bind="attrs"
                                        icon
                                        v-on="on"
                                        text
                                        small
                                        color="secondary"
                                        ><v-icon
                                          >mdi-dots-vertical</v-icon
                                        ></v-btn
                                      >
                                    </template>

                                    <v-list dark color="primary">
                                      <v-list-item
                                        @click="
                                          $router.push(
                                            `/admin/managers/${item && item.id}`
                                          )
                                        "
                                        class="light--text"
                                        dense
                                      >
                                        <v-list-item-title
                                          >Edit</v-list-item-title
                                        >
                                      </v-list-item>
                                      <v-list-item
                                        @click="deleteManager(item && item)"
                                        class="error--text"
                                        dense
                                      >
                                        <v-list-item-title
                                          >Delete</v-list-item-title
                                        >
                                      </v-list-item>
                                    </v-list>
                                  </v-menu>
                                </div>
                                <span
                                  class="text-caption d-flex align-center mt-n1"
                                >
                                  <v-icon x-small color="secondary" class="mr-1"
                                    >mdi-star</v-icon
                                  >
                                  high achiever
                                </span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </w-container>
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
    managers() {
      return this.state("managers");
    },
  },

  methods: {
    ...mapActions({ deleteManager: "admin/deleteManager" }),
  },
};
</script>

<style></style>
