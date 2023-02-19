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
      <v-col
        cols="12"
        class="pt-0 light--text text-subtitle-1 text-sm-h6 font-weight-medium"
      >
        Other Details
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="displayRelationship"
          type="text"
          name="relationship"
          filled
          large
          color="secondary"
          label="Relationship"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="[(v) => !!v || 'Relationship is required']"
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          v-model="displayGender"
          filled
          color="secondary"
          large
          dark
          :items="['Male', 'Female', 'Other']"
          item-text="name"
          return-object
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          class="text-subtitle-1 dark font-weight-medium rounded-lg"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
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
      loading: "controller/getLoading",
    }),

    displayName: {
      get() {
        return this.user && this.user.nextofkin.name;
      },
      set(val) {
        this.user.nextofkin.name = val;
      },
    },
    displayEmail: {
      get() {
        return this.user && this.user.nextofkin.email;
      },
      set(val) {
        this.user.nextofkin.email = val;
      },
    },
    displayPhone: {
      get() {
        return this.user && this.user.nextofkin.phoneNumber;
      },
      set(val) {
        this.user.nextofkin.phoneNumber = val;
      },
    },
    displayGender: {
      get() {
        return this.user && this.user.nextofkin.gender;
      },
      set(val) {
        this.user.nextofkin.gender = val;
      },
    },
    displayRelationship: {
      get() {
        return this.user && this.user.nextofkin.relationship;
      },
      set(val) {
        this.user.nextofkin.relationship = val;
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
    