<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12">
        <v-btn fab small color="secondary" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="text-subtitle-2 text-sm-h6 light--text text-center"
      >
        For account upgrade, please contact
        <v-btn
          text
          block
          color="warning"
          class="ma-0 text-lowercase text-subtitle-2 text-sm-h6"
          href="mailto:support@sterlingstockinvestments.com"
          >support@sterlingstockinvestments.com</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "dashboard",
};
</script>

<style></style>
