<template>
  <w-container noGutter dark :tile="tile" :title="title" class="">
    <template v-slot:header>
      <v-chip outlined label color="secondary" class="">{{
        transactions && transactions.length
      }}</v-chip>
    </template>
    <v-row
      v-if="transactions && transactions.length"
      justify="center"
      class="ma-0"
    >
      <v-col
        cols="12"
        class="cursor-pointer"
        v-for="(item, i) in transactions"
        :key="i"
        @click="viewTransaction(item)"
      >
        <div class="d-flex align-center">
          <div class="d-flex flex-column">
            <span
              class="text-subtitle-2 text--truncate text-sm-subtitle-1 font-weight-medium secondary--text"
              >{{ item.title }}</span
            >
            <span class="text-caption"> {{ item.date }}</span>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex flex-column align-end">
            <span
              :class="`${getStatusColor(item.status)}--text`"
              class="text-caption text-uppercase font-weight-bold"
              >{{ item.status }}</span
            >
            <span
              class="text-subtitle-1 text-sm-h6 font-weight-bold white--text"
            >
              {{ item.amount | currency }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-icon size="100" color="dark">mdi-file</v-icon>
        <div class="text--capitalize light--text text-subtitle-2">
          No {{ type }} yet
        </div>
      </v-col>
    </v-row>

    <w-transaction-details
      :transaction="transaction"
      :modal="modal"
      :toggle="toggle"
    />
  </w-container>
</template>

<script>
import { mapGetters } from "vuex";
import wContainer from "./wContainer.vue";
import wTransactionDetails from "./wTransactionDetails.vue";
export default {
  components: { wContainer, wTransactionDetails },

  filters: {
    currency(val) {
      if (val) {
        val = parseFloat(val);
        return val.toLocaleString("en-US", {
          style: "currency",
          code: "US",
          currency: "USD",
        });
      } else {
        return "$0.00";
      }
    },
  },

  props: {
    type: {
      type: String,
      default: "deposit",
    },
    title: {
      type: String,
      default: "Transactions",
    },
    tile: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    modal: false,
    transaction: {},
  }),
  computed: {
    ...mapGetters({ state: "controller/getState" }),
    transactions() {
      const arr = {
        deposit: this.state("deposits"),
        withdraw: this.state("withdraws"),
        investment: this.state("investments"),
        loan: this.state("loans"),
      };

      // arr && arr.sort((a, b) => new Date(b.date) - new Date(a.date));

      return arr[this.type];
    },
  },

  methods: {
    getStatusColor(status) {
      const obj = {
        pending: "warning",
        success: "secondary",
        fail: "error",
        decline: "error",
        declined: "error",
        approved: "secondary",
        ongoing: "info",
        completed: "secondary",
      };

      return obj[status ? status.toLowerCase() : ""];
    },

    getDate(payload) {
      const date = new Date(payload);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return `${date.getDate()} ${
        months[date.getMonth()]
      }, ${date.getFullYear()}; ${new Date(payload).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    },

    viewTransaction(payload) {
      this.transaction = payload;
      console.log(payload);
      this.toggle(true);
    },

    toggle(state) {
      this.modal = state;
    },
  },
};
</script>

<style></style>
