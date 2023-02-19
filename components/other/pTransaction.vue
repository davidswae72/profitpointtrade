<template>
  <p-container
    :tile="tile"
    :border="border"
    :loading="loading"
    :title="'Transactions'"
    :styles="'px-0'"
  >
    <template v-slot:header>
      <div>
        <v-btn
          depressed
          small
          :text="active === 'all' ? false : true"
          class=""
          :color="active === 'all' ? 'secondary' : 'grey'"
          @click="active = 'all'"
        >
          All
        </v-btn>
        <v-btn
          depressed
          small
          :text="active === 'credit' ? false : true"
          class=""
          :color="active === 'credit' ? 'success' : 'grey'"
          @click="active = 'credit'"
        >
          Credit
        </v-btn>
        <v-btn
          depressed
          small
          :text="active === 'debit' ? false : true"
          class=""
          :color="active === 'debit' ? 'error' : 'grey'"
          @click="active = 'debit'"
        >
          Debit
        </v-btn>
      </div>
    </template>
    <div style="max-height: 600px; overflow: auto">
      <v-slide-x-transition group>
        <template v-for="(trans, i) in pTransactions">
          <v-card
            :key="trans.id"
            flat
            tile
            :color="background(i)"
            @click="toggleTransaction(trans, true)"
          >
            <v-card-text class="px-2">
              <v-row no-gutters class="ma-0">
                <v-col cols="9" class="pa-0 d-flex align-center">
                  <v-icon :color="getColor(trans.type)" class="mr-2 mx-md-2">
                    mdi-circle-slice-8
                  </v-icon>
                  <div style="width: 100%" class="d-flex flex-column">
                    <span
                      class="
                        text-subtitle-2 text-md-subtitle-1
                        font-weight-medium
                        text3--text
                      "
                      >{{ trans.description }}</span
                    >
                    <span
                      class="text-caption text-sm-subtitle-2 font-weight-light"
                      >{{ trans.date }}</span
                    >
                  </div>
                </v-col>
                <v-col
                  cols="3"
                  class="pa-0 d-flex align-center justify-end pr-md-2"
                >
                  <div
                    :class="
                      trans.status !== 'Pending'
                        ? getColor(`${getColor(trans.type)}--text`)
                        : 'secondary--text'
                    "
                    class="
                      text-subtitle-2 text-md-subtitle-1
                      font-weight-medium
                      d-flex
                      flex-column
                    "
                  >
                    <span class="mb-n1 text-right text-capitalize">{{
                      trans.status.toLowerCase() !== "pending"
                        ? trans.type.toLowerCase() === "credit"
                          ? "+"
                          : "-"
                        : trans.status
                    }}</span>
                    <span> {{ trans.amount | currency }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-slide-x-transition>
      <v-card v-if="!transactions.length" flat>
        <v-card-text class="text-center">
          <v-icon size="50" color="grey lighten-1"> fas fa-folder-open </v-icon>
          <div class="my-2">No Transaction yet</div>
        </v-card-text>
      </v-card>
    </div>
    <p-transaction-details
      :transaction="transaction"
      :modal="transactionModal"
      :toggle="toggleTransaction"
    />
  </p-container>
</template>

<script>
import { mapGetters } from "vuex";
import wContainer from "./wContainer.vue";
import PTransactionDetails from "./pTransactionDetails.vue";
export default {
  components: { wContainer, PTransactionDetails },
  filters: {
    currency(val) {
      if (val) {
        val = parseFloat(val);
        return val.toLocaleString("en-NG", {
          style: "currency",
          code: "NG",
          currency: "NGN",
        });
      } else {
        return "$0.00";
      }
    },
  },

  props: {
    transactions: {
      type: Object,
      default: () => [],
    },
    border: {
      type: Boolean,
      default: true,
    },
    tile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    active: "all",
    loading: false,
    transactionModal: false,
    transaction: null,
  }),
  computed: {
    ...mapGetters({ state: "controller/getState" }),
    pTransactions() {
      const arr = [];
      this.transactions &&
        this.transactions.forEach((el) => {
          if (this.active === "all") {
            el.date = this.getDate(el.createdAt);
            arr.push(el);
          } else if (el.type.toLowerCase() === this.active) {
            arr.push(el);
          }
        });
      return arr;
    },
  },
  methods: {
    background(i) {
      if (i % 2 === 1) {
        return "#f8f8f8";
      } else {
        return "";
      }
    },

    getColor(type) {
      if (
        (type && type.toLowerCase() === "debit") ||
        (type && type.toLowerCase() === "ongoing")
      ) {
        return "error";
      } else if (
        (type && type.toLowerCase() === "credit") ||
        (type && type.toLowerCase() === "successful")
      ) {
        return "success";
      } else if (type && type.toLowerCase() === "pending") {
        return "secondary";
      } else {
        return type;
      }
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

    toggleTransaction(transaction, state) {
      this.transaction = transaction;
      this.transactionModal = state;
      console.log(state);
    },
  },
};
</script>

<style>
</style>
