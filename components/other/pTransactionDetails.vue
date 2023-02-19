<template>
  <div>
    <v-dialog
      v-model="modal"
      persistent
      width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card :tile="$vuetify.breakpoint.xsOnly" class="py-2 rounded-sm-lg">
        <v-card-title class="text3--text font-weight-regular text-h6  py-4">
          Transaction
          <v-chip outlined label small :color="getColor(transaction && transaction.status)" class="mx-2">
            {{ transaction && transaction.status }}
          </v-chip>
          <v-spacer />
          <v-icon color="text3" @click="close()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider :class="getColor(transaction && transaction.type)" />
        <v-card-text class="text1--text">
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Reference
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.tref }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Amount
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.amount | currency }}
            </v-col>
          </v-row>
          <v-divider />
          <!-- <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Balance
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.balance | currency }}
            </v-col>
          </v-row>
          <v-divider /> -->
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Type
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              <v-chip label small :color="getColor(transaction && transaction.type)" class="">
                {{ transaction && transaction.type }}
              </v-chip>
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Date
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.date }}
            </v-col>
          </v-row>
          <v-divider />
          <!-- <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Response
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.response }}
            </v-col>
          </v-row>
          <v-divider /> -->
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Description
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.description }}
            </v-col>
          </v-row>
          <!-- <v-divider /> -->
          <v-row no-gutters class="mt-4 d-block d-md-none">
            <v-col cols="12" class=" d-flex">
              <v-spacer />
              <v-btn depressed color="primary" class="text-subtitle-2 font-weight-normal" @click="close()">
                Okay
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetails',
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
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
    modal: {
      type: Boolean,
      default: false
    },
    toggle: Function,
    transaction: {
      type: Object,
      default: () => ({
        id: 'nill',
        reference: 'nill',
        response: 'nill',
        type: 'nill',
        status: 'nill',
        shortDescription: 'nill',
        longDescription: 'nill',
        amount: 'nill',
        balance: 'nill',
        date: 'nill'
      })
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    getColor (type) {
      if (type && type.toLowerCase() === 'debit') {
        return 'error'
      } else if ((type && type.toLowerCase() === 'credit') || (type && type.toLowerCase() === 'successful')) {
        return 'success'
      } else if (type && type.toLowerCase() === 'pending') {
        return 'secondary'
      } else {
        return 'primary'
      }
    },
    close () {
      this.toggle(null, false)
    }
  }

}
</script>

<style>

</style>
