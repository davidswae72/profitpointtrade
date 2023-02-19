<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat color="transparent" class="text-center">
          <v-card-title class="text-subtitle-1">
            Redirecting to Dashboard...
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  layout: 'dashboard',
  data: () => ({}),
  computed: {},
  created () {
    // const token = this.$route.query.token
    // this.confirmAccount(token)
    // console.log(token)

    this.$router.push('/dashboard/home')
  },
  methods: {}

}
</script>

<style>

</style>
