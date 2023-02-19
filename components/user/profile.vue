<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row class="ma-0">
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="displayName"
          type="text"
          name="name"
          filled
          large
          color="secondary"
          label="Full Name"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="[(v) => !!v || 'Full name is required']"
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="displayEmail"
          type="email"
          readonly
          name="name"
          filled
          large
          color="secondary"
          label="Email"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="[
            [
              (v) => !!v || 'E-mail is required',
              (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
          ]"
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="displayPhone"
          type="tel"
          name="name"
          filled
          large
          color="secondary"
          label="Phone Number"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="[(v) => !!v || 'Phone number is required']"
        />
      </v-col>

      <v-col cols="12" class="py-0">
        <v-spacer />
        <v-btn
          block
          depressed
          type="submit"
          :loading="loading.profile"
          large
          color="secondary dark--text"
          class="text-capitalize rounded-lg text-subtitle-1 font-weight-medium"
        >
          Save Changes
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
  }),

  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "authentication/getLoading",
    }),

    displayName: {
      get() {
        return this.user && this.user.name;
      },
      set(val) {
        this.user.name = val;
      },
    },
    displayEmail: {
      get() {
        return this.user && this.user.email;
      },
      set(val) {
        this.user.email = val;
      },
    },
    displayPhone: {
      get() {
        return this.user && this.user.phoneNumber;
      },
      set(val) {
        this.user.phoneNumber = val;
      },
    },
  },
  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      updateUser: "authentication/updateUser",
    }),

    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        console.log(this.user);
        this.updateUser(this.user);
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
  