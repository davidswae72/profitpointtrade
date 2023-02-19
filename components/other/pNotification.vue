<template>
  <div v-if="show">
    <v-btn
      fab
      text
      size="20"
      class=""
      @click="toggle(true)"
    >
      <v-badge
        :content="2"
        :value="2"
        color="error"

        overlap
      >
        <v-icon :color="color">
          fas fa-bell
        </v-icon>
      </v-badge>
    </v-btn>
    <p-view-notifications :drawer="drawer" :toggle="toggle" />
  </div>
</template>

<script>
import pViewNotifications from './pViewNotifications.vue'
export default {
  components: { pViewNotifications },
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  data: () => ({
    drawer: false,
    show: false
  }),

  methods: {
    toggle (state) {
      this.drawer = state
    }
  }

}
</script>

<style>

</style>
