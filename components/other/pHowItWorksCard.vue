<template>
  <v-card
    v-if="type === 'up'"
    rounded="xl"
    flat
    class="grey lighten-3 pa-0 ma-2"
  >
    <v-card-title
      style="box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.1)"
      class="d-flex items-center white rounded-xl py-4"
    >
      <v-sheet
        flat
        width="60"
        height="60"
        style="border-radius: 14px"
        :color="data.color"
        class="d-flex items-center justify-center"
      >
        <v-icon size="30" :color="data.iconColor ? data.iconColor : 'white'">
          {{ data.icon }}
        </v-icon>
      </v-sheet>

      <span
        class="
          text-capitalize text-h6 text-sm-h5
          ml-2
          font-weight-bold
          text3--text
        "
      >
        {{ data.title }}</span
      >
    </v-card-title>
    <v-card-text class="pt-3">
      <p class="text-subtitle-1 text1--text">
        {{ data.description }}
      </p>
    </v-card-text>
  </v-card>

  <v-card v-else rounded="xl" flat class="grey lighten-3 pa-0 ma-2">
    <v-card-text class="">
      <p class="text-subtitle-1 text1--text">
        {{ data.description }}
      </p>
    </v-card-text>
    <v-card-title
      style="box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.1)"
      class="d-flex items-center py-4 white rounded-xl"
    >
      <v-sheet
        flat
        width="60"
        height="60"
        style="border-radius: 14px"
        :color="data.color"
        class="d-flex items-center justify-center"
      >
        <v-icon size="30" :color="data.iconColor ? data.iconColor : 'white'">
          {{ data.icon }}
        </v-icon>
      </v-sheet>

      <div
        class="
          text-capitalize text-h6 text-sm-h5
          ml-2
          font-weight-bold
          text3--text
        "
      >
        {{ data.title }}
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "down",
    },
    data: {
      type: Object,
      default: () => ({
        icon: "",
        iconColor: "white",
        color: "primary",
        title: "",
        description: "",
      }),
    },
  },
};
</script>

<style>
</style>