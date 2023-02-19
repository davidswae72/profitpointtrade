<template>
  <div>
    <v-dialog
      v-model="modal"
      persistent
      width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card
        dark
        :tile="$vuetify.breakpoint.xsOnly"
        class="py-2 dark light--text rounded-sm-lg"
      >
        <v-card-title class="light--text font-weight-medium text-h6 py-4">
          {{ transaction && transaction.title }}
          <v-spacer />
          <v-icon color="light" @click="close()"> mdi-close </v-icon>
        </v-card-title>
        <v-divider :class="getColor(transaction && transaction.status)" />
        <v-card-text class="light--text">
          <v-row v-if="user && user.role === 'admin'" no-gutters class="py-2">
            <v-col cols="4" class="py-1"> User </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ getClientName(transaction && transaction.userID) }}
            </v-col>
          </v-row>
          <v-divider v-if="user && user.role === 'admin'" />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Reference </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.id }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Amount </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ currency }}{{ transaction && transaction.amount | currency }}
            </v-col>
          </v-row>
          <v-row
            v-if="transaction && transaction.type == 'loan'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Monthly Payment </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ currency
              }}{{ transaction && transaction.monthlyPayment | currency }}
            </v-col>
          </v-row>
          <v-divider />

          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Status </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              <v-chip
                label
                small
                :color="`${getColor(transaction && transaction.status)}`"
                class="dark--text"
              >
                {{ transaction && transaction.status }}
              </v-chip>
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Type </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              <span
                :color="`${getColor(transaction && transaction.type)}--text`"
                class=""
              >
                {{ transaction && transaction.type }}
              </span>
            </v-col>
          </v-row>
          <v-divider />
          <!-- Withdrawal Payment Methods -->
          <v-row
            v-if="transaction && transaction.method"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Payment Method </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.method }}
            </v-col>
          </v-row>
          <!-- Paypal Withdrawal Method -->
          <v-divider v-if="transaction && transaction.method" />
          <v-row
            v-if="transaction && transaction.method === 'Paypal'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Paypal Address </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.paypalAddress }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Paypal'" />
          <v-row
            v-if="transaction && transaction.method === 'Cash App'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Cash App Tag </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.cashAppTag }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Cash App'" />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row
            v-if="transaction && transaction.method === 'Bank Transfer'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Bank Name </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.bank }}
            </v-col>
          </v-row>
          <v-divider
            v-if="transaction && transaction.method === 'Bank Transfer'"
          />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row
            v-if="transaction && transaction.method === 'Bank Transfer'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Account Name </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.accName }}
            </v-col>
          </v-row>
          <v-divider
            v-if="transaction && transaction.method === 'Bank Transfer'"
          />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row
            v-if="transaction && transaction.method === 'Bank Transfer'"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Account Number </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.accNumber }}
            </v-col>
          </v-row>
          <v-divider
            v-if="transaction && transaction.method === 'Bank Transfer'"
          />

          <!-- Other Withdrawal Methods -->
          <v-row
            v-if="
              (transaction &&
                transaction.method !== 'Paypal' &&
                transaction.method !== 'Cash App' &&
                transaction.method !== 'Bank Transfer' &&
                transaction.type === 'deposit') ||
              transaction.type === 'withdraw'
            "
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1">
              {{ transaction && transaction.method }} Address
            </v-col>
            <v-col
              cols="8"
              class="py-1 text-right text-subtitle-2 text-capitalize"
            >
              {{ transaction && transaction.wallet }}
            </v-col>
          </v-row>
          <v-divider
            v-if="
              transaction &&
              transaction.method !== 'Paypal' &&
              transaction.method !== 'Cash App Tag' &&
              transaction.method !== 'Bank Transfer'
            "
          />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Date </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.date }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row
            v-if="transaction && transaction.message"
            no-gutters
            class="py-2"
          >
            <v-col cols="4" class="py-1"> Message </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.message }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1"> Description </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.description }}
            </v-col>
          </v-row>
          <!-- <v-divider /> -->
          <v-row no-gutters class="mt-4 d-block d-md-none">
            <v-col cols="12" class="d-flex">
              <v-spacer />
              <v-btn
                depressed
                large
                color="secondary dark--text"
                class="text-subtitle-2 font-weight-normal rounded-lg"
                @click="close()"
              >
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
import { mapGetters } from "vuex";
export default {
  name: "TransactionDetails",
  filters: {
    currency(val) {
      if (val) {
        val = parseFloat(val);
        return val.toLocaleString();
      } else {
      }
    },
  },
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    toggle: Function,
    transaction: {
      type: Object,
      default: () => ({
        id: "nill",
        reference: "nill",
        response: "nill",
        type: "nill",
        status: "nill",
        shortDescription: "nill",
        longDescription: "nill",
        amount: "nill",
        balance: "nill",
        date: "nill",
      }),
    },
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      user: "authentication/getUser",
      state: "controller/getState",
      getUserByID: "admin/getUserByID",
    }),

    currency() {
      const arr = this.state("currency");
      let currency;
      if (this.user) {
        arr &&
          arr.forEach((el) => {
            if (
              this.user &&
              this.user.currency.toLowerCase() === el.name.toLowerCase()
            ) {
              currency = el.symbol;
            }
          });
      } else {
        currency = "$";
      }
      return currency;
    },
  },
  methods: {
    getColor(type) {
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

      return obj[type ? type.toLowerCase() : ""];
    },
    getClientName(id) {
      const user = this.getUserByID(id);
      return `${user && user.firstName} ${user && user.lastName}`;
    },
    close() {
      this.toggle(null, false);
    },
    rateAmount(payload) {
      console.log(this.user);
      const arr = this.state("currency");
      let amount;
      if (this.user) {
        arr &&
          arr.forEach((el) => {
            if (
              this.user &&
              this.user.currency.toLowerCase() === el.name.toLowerCase()
            ) {
              amount = parseFloat(parseFloat(payload) / el.rate);
            }
          });
      } else {
        amount = payload;
      }

      console.log(amount);
      return amount;
    },
  },
};
</script>

<style></style>
