<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row class="ma-0">
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="oldPassword"
          :type="show ? 'text' : 'password'"
          name="oldPassword"
          filled
          large
          color="secondary"
          label="Old Password"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="oldPasswordRules"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
          @click:append="show = !show"
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="newPassword"
          :type="show1 ? 'text' : 'password'"
          name="password"
          filled
          large
          color="secondary"
          label="Password"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="newPasswordRules"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
          @click:append="show1 = !show1"
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="confirmPassword"
          :type="show2 ? 'text' : 'password'"
          name="confirmPassword"
          filled
          color="secondary"
          label="Confirm Password"
          required
          class="text-subtitle-2 font-weight-light"
          :rules="[confirmPasswordRules, passwordConfirmationRule]"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        />
      </v-col>
      <v-col cols="12" class="py-0 d-flex align-center">
        <v-spacer />
        <v-btn
          block
          depressed
          type="submit"
          :loading="loading.password"
          large
          color="secondary dark--text"
          class="text-capitalize rounded-lg text-subtitle-1 font-weight-medium"
        >
          Change Password
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
    show: false,
    show1: false,
    show2: false,

    oldPassword: "",
    oldPasswordRules: [
      (v) => !!v || "Old Password is required",
      (v) =>
        (v && v.length >= 6) ||
        "Old Password must be greater than 6 characters",
    ],
    newPassword: "",
    newPasswordRules: [
      (v) => !!v || "New Password is required",
      (v) =>
        (v && v.length >= 6) ||
        "New Password must be greater than 6 characters",
    ],
    confirmPassword: "",
    confirmPasswordRules: [(v) => !!v || "Password is required"],
  }),
  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      loading: "authentication/getLoading",
    }),
    passwordConfirmationRule() {
      return () =>
        this.newPassword === this.confirmPassword || "Password must match";
    },
  },
  methods: {
    ...mapActions({
      initAlert: "controller/initAlert",
      updatePassword: "authentication/updatePassword",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        if (this.oldPassword === this.user.password) {
          this.updatePassword(this.newPassword);
          this.clear();
        } else {
          this.initAlert({
            is: true,
            type: "error",
            message: "Old Password is not correct",
          });
        }
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
