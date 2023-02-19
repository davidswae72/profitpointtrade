<template>
  <v-data-table
    :search="search"
    :loading="loading.transactions"
    loading-text="Loading... Please wait"
    :headers="Head"
    :items="transactions"
    sort-by="date"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="text-subtitle-1 d-flex align-center">
          Transactions <v-chip class="ml-1" color="primary" small label outlined>
            {{ transactions.length }}
          </v-chip>
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer />
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip
        small
        depressed
        outlined
        :color="getColor(item.status)"
        class="text-uppercase"
      >
        {{ item.status }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  props: {
    transactions: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    search: '',
    Head: [
      {
        text: 'Investor',
        align: 'start',
        sortable: false,
        value: 'investor'
      },
      {
        text: 'Amount',
        value: 'displayAmount'
      },
      {
        text: 'Description',
        value: 'description'
      },

      {
        text: 'Reference',
        value: 'tref'
      },
      {
        text: 'Date',
        value: 'date'
      },
      {
        text: 'Status',
        value: 'status'
      }
    ]

  }),

  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' })
  },

  methods: {
    getColor (type) {
      if (type.toLowerCase() === 'pending') {
        return 'secondary'
      } else {
        return 'success'
      }
    }
  }

}
</script>

<style>

</style>
