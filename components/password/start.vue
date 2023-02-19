<template>
  <v-card flat max-width="450" class="rounded-lg px-md-4 py-2">
    <v-card-title class=" justify-center font-weight-light text-subtitle-1 text-md-h6 my-2">
      <div class="font-weight-medium  primary--text text-h5">
        Forgot Password
      </div>
      <div class="text-subtitle-1 text1--text my-1 font-weight-light">
        Enter your email address to reset your password
      </div>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-row no-gutters>
          <v-col cols="12" class="py-0 mb-n1">
            <v-text-field
              v-model="email"
              type="email"
              name="email"
              dense
              outlined
              color="primary"
              label="Email"
              :rules="emailRules"
              class="text-subtitle-2 font-weight-light rounded-md"
            />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-btn type="submit" depressed block color="primary" class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular">
              Next
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            class="py-1 mt-2 text-center"
          >
            <div>
              Back to?
              <nuxt-link to="/login" tag="a" class="font-weight-bold">
                Login
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  layout: 'welcome',
  props: ['update', 'setForm'],
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert'
    })
  },

  methods: {
    ...mapMutations({ setRegistration: 'authentication/setRegistration' }),
    ...mapActions({ initAlert: 'controller/initAlert' }),
    submit () {
      if (this.email.trim() !== '') {
        // Update the email for password otp
        this.update('email', this.email)
        this.setForm('Password')
      } else {
        this.initAlert({
          is: true,
          type: 'error',
          message: 'Email not be empty'
        })
      }
    },

    clear () {
      this.reset()
      this.resetValidation()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }

}
</script>

<style>

</style>
