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
                    >Add Wallet Address</span
                  >
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="name"
                    type="text"
                    name="wallet"
                    filled
                    color="secondary"
                    label="Name"
                    :rules="[(v) => !!v || 'Wallet name is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="address"
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
                    Add Address
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
    name: "",
    address: "",
    file: null,
  }),
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
    }),
  },

  methods: {
    ...mapActions({
      addWallet: "admin/addWallet",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.name,
          address: this.address,
          id: "",
          photoURL: "",
        };

        console.log({ payload, photo: this.file });

        this.addWallet({
          payload,
          photo: this.file,
          type: "add",
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