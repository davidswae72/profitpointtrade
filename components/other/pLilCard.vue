<template>
  <v-card outlined color=" rounded-lg">
    <v-card-text v-if="type && type.toLowerCase() === 'auto'" class="d-flex align-center pa-3">
      <div>
        <span class="font-weight-bold text1--text">Auto Save</span>
        <div class="d-flex align-center">
          <span class="secondary--text text-subtitle-1 font-weight-bold">
            {{ 1000 | currency }}
          </span>
          <span class="text-caption text-sm-body-2 ml-1">Daily</span>
        </div>
      </div>
      <v-spacer />
      <v-btn
        v-if="icon !== 'none' "
        depressed
        small
        fab
        :color="icon ? 'secondary' : 'grey grey--text lighten-2 text--lighten-1'"
        @click="toggle(true)"
      >
        <v-icon dark>
          <!-- @click="icon = !icon"  Change the icon on set complete -->
          {{ icon ? ' mdi-power-standby' : ' mdi-power-off' }}
        </v-icon>
      </v-btn>
    </v-card-text>
    <v-card-text v-if="type && type.toLowerCase() === 'date'" class="d-flex  pa-3">
      <div>
        <span class="font-weight-bold text1--text">{{ name }}</span>
        <div>
          <span class="text-body-2">{{ withdrawalDate }}</span>
        </div>
      </div>
      <v-spacer />
      <v-btn
        v-if="icon !== 'none' "
        small
        fab
        depressed
        color="secondary"
        @click="toggle(true)"
      >
        <v-icon dark>
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
    },
    title (val) {
      return val.split('-').join(' ')
    }
  },
  props: {
    type: {
      type: String,
      default: 'auto'
    },
    name: String,
    withdrawalDate: String,
    icon: {
      type: [String, Array, Object],
      default: 'mdi-calendar'
    },
    toggle: {
      type: Function,
      default: () => {
        console.log('clicked')
      }
    }
  },
  data: () => ({
    icon: true
  })
}
</script>

<style>

</style>
