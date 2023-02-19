<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="8">
        <v-card dark flat rounded="xl" color="primary pa-0 pb-6">
          <v-card-text class="light--text pa-0">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row justify="center" class="ma-0">
                <v-col cols="12" class="d-flex align-center">
                  <v-btn @click="$router.go(-1)" fab icon color="secondary">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>

                  <span
                    class="
                      text-subtitle-1
                      white--text
                      text-sm-h6
                      font-weight-bod
                    "
                    >Edit {{ wallet && wallet.name }} Address</span
                  >
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="displayAddress"
                    type="text"
                    name="wallet"
                    filled
                    color="secondary"
                    label="Wallet Address"
                    :rules="[(v) => !!v || 'Wallet address is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-file-input
                    v-model="file"
                    type="file"
                    filled
                    color="secondary"
                    chips
                    prepend-icon=""
                    prepend-inner-icon=""
                    accept="image/*"
                    :label="`Upload QR`"
                    class="text-subtitle-2 mx-1 font-weight-light rounded-lg"
                  />
                </v-col>

                <v-col cols="12" class="py-0 d-flex align-center">
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.wallet"
                    large
                    color="secondary dark--text"
                    class="
                      text-capitalize
                      rounded-lg
                      text-subtitle-2
                      font-weight-regular
                    "
                  >
                    Update Address
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
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

  data: () => ({
    valid: true,
    file: null,
  }),
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
      getWalletsByID: "admin/getWalletsByID",
    }),
    wallet() {
      const id = this.$route.params.id;
      console.log(id);
      return this.getWalletsByID(id);
    },

    displayAddress: {
      get() {
        return this.wallet && this.wallet.address;
      },
      set(val) {
        this.wallet.address = val;
      },
    },
  },

  methods: {
    ...mapActions({
      updateWallet: "admin/updateWallet",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        console.log({ payload: this.wallet, photo: this.file });
        this.updateWallet({
          payload: this.wallet,
          photo: this.file,
          type: "edit",
        });
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
  },
};
</script>

<style>
</style>