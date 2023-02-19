<template>
  <v-card
    color="transparent"
    flat
    rounded="xl"
    :to="data.to"
    class="d-flex flex-column"
  >
    <v-card-text style="border: 1px solid #fcd435">
      <div
        v-html="data.title"
        class="text-h5 font-weight-bold white--text"
      ></div>

      <div class="d-flex justify-end">
        <v-avatar size="40" tile>
          <v-img src="/logo1.svg"></v-img>
        </v-avatar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: () => ({
      title: "",
      to: "",
    }),
  },

  filters: {
    currency(val) {
      if (val) {
        return val.toLocaleString("en-US", {
          style: "currency",
          code: "US",
          currency: "USD",
        });
      } else {
      }
    },
  },
};
</script>

<style></style>
