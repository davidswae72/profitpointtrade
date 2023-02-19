<template>
  <v-card
    :tile="tile"
    width="100%"
    :flat="!border"
    :outlined="border"
    :dark="dark"
    :class="`${!tile ? 'rounded-lg' : ''} ${dark ? 'primary' : ''}`"
  >
    <v-progress-linear v-if="loading" :color="loadingColor" indeterminate />
    <v-card-title
      :class="`${small ? 'pa-2' : ''} `"
      class="text-h6 d-flex font-weight-bold text-capitalize"
    >
      <span>{{ title }}</span>
      <v-spacer />
      <slot name="header" />
    </v-card-title>
    <v-divider v-if="divider" />
    <v-card-text
      :class="`${styles}  ${dark ? 'light--text' : ''} ${
        noGutter ? 'px-0 px-sm-2' : ''
      }`"
    >
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "WContnainer",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    dark: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    noGutter: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingColor: {
      type: String,
      default: "secondary",
    },
    styles: [String, Array, Object],
  },
};
</script>

<style>
</style>
