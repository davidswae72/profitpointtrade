<template>
  <v-card
    color="transparent"
    flat
    rounded="xl"
    :to="data.to"
    class="d-flex flex-column"
  >
    <v-card-text style="border: 1px solid #fcd435">
      <div class="d-flex align-center">
        <div
          v-html="data.title"
          class="text-h6 font-weight-bold white--text"
        ></div>
        <v-spacer></v-spacer>
        <div class="d-flex justify-end">
          <v-avatar size="35" tile>
            <v-img src="/logo1.svg"></v-img>
          </v-avatar>
        </div>
      </div>

      <div class="light--text d-flex flex-column my-4">
        <span class="secondary--text font-weight-bold text-h5 text-md-h4">{{
          data.price | currency
        }}</span>
        <span class="text-caption">Minimum</span>
      </div>
      <v-btn
        block
        large
        color="secondary dark--text"
        class="rounded-lg text-caption text-sm-subtitle-2 font-weight-bold text-capitalize"
      >
        Purchase Plan</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        to: "",
        title: "",
        price: 0,
      }),
    },
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
