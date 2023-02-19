<template>
  <p-side-bar :loading="loading" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span>
          Notifications
        </span>
        <span class="text-caption text-h6">
          My Notifications
        </span>
      </div>
    </template>
  </p-side-bar>
</template>

<script>
import PSideBar from '../other/pSideBar.vue'

export default {
  name: 'ViewInvestment',
  components: { PSideBar },
  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })
      } else {
      }
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },

  data: () => ({

  }),

  methods: {

  }
}
</script>

<style>

</style>
