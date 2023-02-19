<template>
  <x-side-bar :loading="loading.wallet" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex white--text flex-column">
        <span class="text-h6 d-flex align-center"> Update Wallet Address </span>
      </div>
    </template>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-row no-gutters class="ma-0 pt-4">
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="walletAddress"
            type="text"
            name="wallet"
            filled
            color="primary"
            label="Wallet Address"
            required
            class="text-subtitle-2 font-weight-light"
          />
        </v-col>

        <v-col cols="12" class="py-0">
          <v-file-input
            v-model="file"
            type="file"
            filled
            accept="image/*"
            :label="`Upload QR`"
            class="text-subtitle-2 mx-1 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="py-0 d-flex align-center">
          <v-spacer />
          <v-btn
            block
            depressed
            type="submit"
            :loading="loading.wallet"
            large
            color="primary"
            class="text-capitalize rounded text-subtitle-2 font-weight-regular"
          >
            Update Address
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </x-side-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import xSideBar from "./xSideBar.vue";

export default {
  components: { xSideBar },
  props: ["drawer", "toggle", "type"],
  data: () => ({
    valid: true,
    walletAddress: "",
    walletRules: [(v) => !!v || "Wallet Address is required"],
    file: null,
  }),
  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "admin/getLoading",
      state: "admin/getState",
    }),
    wallets() {
      return this.state("wallet");
    },
  },
  methods: {
    ...mapActions({
      updateWallet: "admin/updateWallet",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.wallets[0].name,
          id: this.wallets[0].id,
          address: this.walletAddress,
          photoURL: null,
        };

        console.log({ payload, photo: this.file });
        this.updateWallet({ payload, photo: this.file });

        this.clear();
        this.checkIfDone();
      }
    },
    clear() {
      this.reset();
      this.resetValidation();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    checkIfDone() {
      setInterval(() => {
        if (!this.loading.wallet) {
          setTimeout(() => {
            this.toggle(false);
            window.location.reload();
          }, 2000);
        }
      }, 1000);
    },
  },
};
</script>

<style>
</style>
