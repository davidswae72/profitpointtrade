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
                    >New Signal Code</span
                  >
                  <v-spacer />
                  <v-btn
                    @click="generateCode"
                    fab
                    small
                    depressed
                    color="secondary"
                  >
                    <v-icon color="dark" size="20">mdi-reload</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="code"
                    type="number"
                    name="code"
                    filled
                    readonly
                    color="secondary"
                    label="S-Code"
                    :rules="[(v) => !!v || 'scode is required']"
                    required
                    class="
                      text-subtitle-2
                      secondary--text
                      font-weight-medium
                      rounded-lg
                    "
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="percentage"
                    type="number"
                    name="percentage"
                    filled
                    color="secondary"
                    label="Profit Percentage"
                    :rules="[(v) => !!v || 'Percentage is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="type"
                    color="secondary"
                    :items="['Win', 'Lose']"
                    filled
                    class="text-subtitle-2 font-weight-light rounded-lg"
                    :rules="[(v) => !!v || 'This field is required']"
                    label="Trade"
                    required
                  />
                </v-col>

                <v-col cols="12" class="py-0 d-flex align-center">
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.scode"
                    large
                    color="secondary dark--text"
                    class="
                      text-capitalize
                      rounded-lg
                      text-subtitle-2
                      font-weight-regular
                    "
                  >
                    New Code
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
    code: "",
    percentage: "",
    type: "",
  }),
  created() {
    this.generateCode();
  },
  mounted() {
    this.generateCode();
  },
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
    }),
  },

  methods: {
    ...mapActions({
      scodeFN: "admin/scodeFN",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          code: this.code,
          percentage: this.percentage,
          type: this.type,
          used: false,
          id: "",
        };

        console.log(payload);
        this.scodeFN(payload);
      }
    },

    generateCode() {
      const code = Math.floor(100000 + Math.random() * 900000);
      this.code = code.toString();
    },
  },
};
</script>
      
      <style>
</style>