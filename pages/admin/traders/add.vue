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
                    >New Trader</span
                  >
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="name"
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
                <v-col cols="6" class="py-0">
                  <v-select
                    v-model="achiever"
                    large
                    color="secondary"
                    :items="['High', 'Medium', 'Low']"
                    filled
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                    :rules="[(v) => !!v || 'Achiever is required']"
                    label="Achiever"
                    required
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="displayMin"
                    type="text"
                    name="wallet"
                    filled
                    color="secondary"
                    label="Min Amount"
                    :rules="[(v) => !!v || 'Min amount is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="displayCommission"
                    type="text"
                    name="commission"
                    filled
                    color="secondary"
                    label="Commission"
                    :rules="[(v) => !!v || 'Commission is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="coppiers"
                    type="text"
                    name="coppiers"
                    filled
                    color="secondary"
                    label="Coppiers"
                    :rules="[(v) => !!v || 'Coppiers is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="gain"
                    type="number"
                    name="gain"
                    filled
                    color="secondary"
                    label="Gain"
                    :rules="[(v) => !!v || 'Gain is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="risk"
                    type="number"
                    name="rist"
                    filled
                    color="secondary"
                    label="Risk"
                    :rules="[(v) => !!v || 'Risk is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col cols="12" class="py-0 d-flex align-center">
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.trader"
                    large
                    color="secondary dark--text"
                    class="
                      text-capitalize
                      rounded-lg
                      text-subtitle-2
                      font-weight-regular
                    "
                  >
                    New Trader
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
    achiever: "",
    min: "",
    commission: "",
    coppiers: "",
    gain: "",
    risk: "",
  }),
  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
    }),

    displayMin: {
      get() {
        let val = parseInt(this.min);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.min = val;
        }
      },
    },
    displayCommission: {
      get() {
        let val = parseInt(this.commission);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return val;
        }
      },
      set(val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.commission = val;
        }
      },
    },
  },

  methods: {
    ...mapActions({
      traderFN: "admin/traderFN",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.name,
          achiever: this.achiever,
          min: this.min,
          coppiers: this.coppiers,
          commission: this.commission,
          gain: this.gain,
          risk: this.risk,
          id: "",
        };

        console.log(payload);
        this.traderFN(payload);
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