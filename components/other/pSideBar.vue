<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    touchless
    right
    width="400"
    :bottom="$vuetify.breakpoint.xsOnly"
    temporary
    color="primary"
    :permanent="drawer"
  >
    <p-pattern />
    <v-progress-linear v-if="loading" indeterminate color="secondary" />
    <v-card flat :class="styles">
      <v-card-title
        class="text-h6 font-weight-medium light--text d-flex align-start pa-0"
      >
        <slot name="header" />
        <v-spacer />
        <v-icon color="secondary" right @click="toggle(false)">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-divider v-if="divided" :class="color" class="mt-2" />
      <v-card-text class="px-0 py-1">
        <slot />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import pPattern from "./pPattern.vue";
export default {
  name: "PSideBar",
  components: { pPattern },
  props: {
    color: {
      type: String,
      default: "primary",
    },
    styles: {
      type: [String, Array, Object],
      default: "pa-4",
    },
    drawer: {
      type: Boolean,
      default: false,
    },
    divided: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    toggle: Function,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({ sideBar: "controller/getSideBar" }),
  },
  methods: {
    ...mapMutations({ setState: "controller/setState" }),
  },
};
</script>

<style>
</style>
