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
                    class="text-subtitle-1 white--text text-sm-h6 font-weight-bod"
                    >Edit {{ manager && manager.name }}</span
                  >
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="displayName"
                    type="text"
                    name="name"
                    filled
                    color="secondary"
                    label="Name"
                    :rules="[(v) => !!v || 'Name is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col cols="12" class="py-0 d-flex align-center">
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.manager"
                    large
                    color="secondary dark--text"
                    class="text-capitalize rounded-lg text-subtitle-2 font-weight-regular"
                  >
                    Update Manager
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
  }),
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
      getManagerByID: "admin/getManagerByID",
    }),

    trader() {
      const id = this.$route.params.id;
      return this.getManagerByID(id);
    },

    displayName: {
      get() {
        return this.manager && this.manager.name;
      },
      set(val) {
        this.manager.name = val;
      },
    },
  },

  methods: {
    ...mapActions({
      updateManager: "admin/updateManager",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        console.log(this.manager);
        this.updateManager(this.manager);
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

<style></style>
