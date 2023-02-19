<template>
  <v-container fluid>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" class="pa-0">
        <v-card dark color="dark">
          <v-card-title
            class="text-subtitle-1 d-flex align-center justify-space-between"
          >
            <v-btn fab small color="secondary" icon @click="$router.go(-1)">
              <v-icon size="20">mdi-arrow-left</v-icon>
            </v-btn>
            <span class="ml-2 text-h6 font-weight-bold">{{
              user && user.name
            }}</span>
            <v-chip
              small
              label
              class="ml-2"
              :color="user && user.account.status ? 'success' : 'error'"
              >{{
                user && user.account.status ? "Verified" : "Not Verified"
              }}</v-chip
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push(`/admin/user/edit/${user && user.userID}`)"
              text
              color="secondary"
              class="text-subtitle-2"
            >
              <span>Edit</span>
              <v-icon size="20">mdi-edit</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="font-weight-bold light--text">
            <v-row class="ma-0">
              <v-col
                cols="12"
                class="py-0 d-flex align-center text-subtitle-2 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Email</span>
                <span class="ml-2 secondary--text">{{
                  user && user.email
                }}</span>
              </v-col>
              <v-col
                cols="12"
                class="py-0 d-flex align-center text-subtitle-2 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Password</span>
                <span class="ml-2 secondary--text">{{
                  user && user.password
                }}</span>
              </v-col>
              <v-col
                cols="12"
                class="py-0 d-flex align-center text-subtitle-2 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Phone Number</span>
                <span class="ml-2 secondary--text">{{
                  user && user.phoneNumber
                }}</span>
              </v-col>
            </v-row>

            <hr class="primary my-4" />
            <v-row class="ma-0">
              <v-col
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Deposit</span>
                <span class="ml-2 secondary--text">{{
                  user && user.wallet.deposit | currency
                }}</span>
              </v-col>
              <v-col
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Profit</span>
                <span class="ml-2 secondary--text">{{
                  user && user.wallet.profit | currency
                }}</span>
              </v-col>
              <v-col
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Withdraw</span>
                <span class="ml-2 secondary--text">{{
                  user && user.wallet.withdraw | currency
                }}</span>
              </v-col>
              <v-col
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Investment</span>
                <span class="ml-2 secondary--text">{{
                  user && user.wallet.investment | currency
                }}</span>
              </v-col>
              <v-col
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Referral</span>
                <span class="ml-2 secondary--text">{{
                  user && user.wallet.referral | currency
                }}</span>
              </v-col>
              <v-col
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Trade-P</span>
                <span class="ml-2 secondary--text"
                  >{{ user && user.account.level }}%</span
                >
              </v-col>
            </v-row>

            <hr class="primary my-4" />
            <v-row class="ma-0">
              <v-col cols="12" class="d-flex align-center">
                Next of Kin
                <v-spacer></v-spacer>
                <v-icon color="light" @click="nextOfKin = !nextOfKin">{{
                  nextOfKin ? "mdi-chevron-down" : "mdi-chevron-right"
                }}</v-icon>
              </v-col>
              <v-col
                v-if="nextOfKin"
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Full Name</span>
                <span class="ml-2 secondary--text">{{
                  user && user.nextofkin.name
                }}</span>
              </v-col>
              <v-col
                v-if="nextOfKin"
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Email</span>
                <span class="ml-2 secondary--text">{{
                  user && user.nextofkin.email
                }}</span>
              </v-col>
              <v-col
                v-if="nextOfKin"
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Phone</span>
                <span class="ml-2 secondary--text">{{
                  user && user.nextofkin.phoneNumber
                }}</span>
              </v-col>
              <v-col
                v-if="nextOfKin"
                cols="6"
                class="d-flex align-center text-subtitle-2 py-0 text-sm-subtitle-1"
              >
                <span class="font-weight-bold">Relationship</span>
                <span class="ml-2 secondary--text">{{
                  user && user.nextofkin.relationship
                }}</span>
              </v-col>
            </v-row>

            <hr class="primary my-4" />
            <v-row v-if="user && user.trader" justify="center" class="ma-0">
              <v-col cols="12" class="d-flex align-center pa-0">
                <span>Copy Trader</span>
                <v-spacer></v-spacer>
                <!-- <v-btn depressed color="error" class="rounded-lg"> OFF </v-btn> -->
              </v-col>
              <v-col cols="12" class="px-0">
                <v-card flat color="primary" class="px-2" rounded="xl">
                  <v-card-text class="px-0">
                    <v-row justify="center" class="ma-0">
                      <v-col cols="12" sm="5" class="d-flex align-center">
                        <v-avatar color="secondary">
                          <v-img src="logo1.svg"></v-img>
                        </v-avatar>
                        <div
                          style="width: 100%"
                          class="light--text d-flex flex-column ml-2"
                        >
                          <div class="d-flex align-center">
                            <span class="text-h6 font-weight-bold">{{
                              user && user.trader.name
                            }}</span>
                            <v-spacer></v-spacer>
                            <v-chip
                              label
                              color="secondary dark--text"
                              class="text-caption"
                              >{{ user && user.trader.risk }} risk</v-chip
                            >
                          </div>
                          <span class="text-caption d-flex align-center mt-n1">
                            <v-icon x-small color="secondary" class="mr-1"
                              >mdi-star</v-icon
                            >
                            {{ user && user.trader.achiever }} achiever
                          </span>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="7"
                        class="d-flex align-center justify-space-around"
                      >
                        <div class="d-flex align-center justify-space-around">
                          <div class="d-flex flex-column">
                            <span class="light--text text-caption">Gain</span>
                            <span
                              class="secondary--text text-subtitle-1 text-sm-h6 mt-n1 font-weight-bold"
                              >+{{ user && user.trader.gain }}%</span
                            >
                          </div>
                          <div class="d-flex flex-column ml-3">
                            <span class="light--text text-caption"
                              >Coppiers</span
                            >
                            <span
                              class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                              >{{ user && user.trader.coppiers }}</span
                            >
                          </div>
                          <div class="d-flex flex-column ml-3">
                            <span class="light--text text-caption"
                              >Commission</span
                            >
                            <span
                              class="white--text text-subtitle-1 text-sm-h6 mt-n1"
                              >{{ user && user.trader.commission }}%</span
                            >
                          </div>
                        </div>

                        <div
                          class="ml-3 border-13 py-4 px-2"
                          style="
                            border: 1px solid #fcd435;
                            background-color: black;
                          "
                        >
                          <v-icon size="30" color="secondary" class="flashit"
                            >mdi-arrow-up</v-icon
                          >
                          <v-icon size="30" color="error" class="flashit"
                            >mdi-arrow-down</v-icon
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" class="mt-6">
        <v-btn
          dark
          @click="active = 'deposit'"
          :class="
            active === 'deposit'
              ? 'secondary dark--text'
              : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Deposit
        </v-btn>
        <v-btn
          dark
          @click="active = 'withdraw'"
          :class="
            active === 'withdraw'
              ? 'secondary dark--text'
              : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Withdraw
        </v-btn>
        <v-btn
          dark
          @click="active = 'investment'"
          :class="
            active === 'investment'
              ? 'secondary dark--text'
              : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Investment
        </v-btn>
        <v-btn
          dark
          @click="active = 'verification'"
          :class="
            active === 'verification'
              ? 'secondary dark--text'
              : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Verification
        </v-btn>
        <v-btn
          dark
          @click="active = 'loan'"
          :class="
            active === 'loan'
              ? 'secondary dark--text'
              : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Loan
        </v-btn>
      </v-col>

      <!-- Deposit -->
      <v-col v-if="active === 'deposit'" cols="12" md="10">
        <v-data-table
          dark
          color="secondary"
          class="dark"
          :search="searchD"
          :loading="loading.deposit"
          loading-text="Loading... Please wait"
          :headers="HeadD"
          :items="deposits"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Deposit
                <v-chip
                  class="ml-2 secondary--text"
                  color="primary"
                  small
                  label
                  outlined
                >
                  {{ deposits && deposits.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchD"
                prepend-icon="mdi-magnify"
                label="SearchD"
                single-line
                hide-details
              />
            </v-toolbar>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              v-if="item"
              small
              depressed
              outlined
              :color="getColor(item.status)"
              class="text-uppercase"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="depositFN('approve', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="secondary dark--text"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="depositFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error dark--text"
              class="text-caption"
            >
              Decline
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- Withdraw -->
      <v-col v-if="active === 'withdraw'" cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          class="dark"
          :search="searchW"
          :loading="loading.withdraw"
          loading-text="Loading... Please wait"
          :headers="HeadW"
          :items="withdraws"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Withdrawals
                <v-chip
                  class="ml-2 secondary--text"
                  color="primary"
                  small
                  label
                  outlined
                >
                  {{ withdraws && withdraws.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchW"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-toolbar>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              v-if="item"
              small
              depressed
              outlined
              :color="getColor(item.status)"
              class="text-uppercase"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="withdrawFN('approve', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="secondary dark--text"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="withdrawFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error dark--text"
              class="text-caption"
            >
              Decline
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- Loan -->
      <v-col v-if="active === 'loan'" cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          class="dark"
          :search="searchL"
          :loading="loading.loan"
          loading-text="Loading... Please wait"
          :headers="HeadL"
          :items="loans"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Loan
                <v-chip
                  class="ml-2 secondary--text"
                  color="primary"
                  small
                  label
                  outlined
                >
                  {{ loans && loans.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchL"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-toolbar>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              v-if="item"
              small
              depressed
              outlined
              :color="getColor(item.status)"
              class="text-uppercase"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="loanFN('approve', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="secondary dark--text"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="loanFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error dark--text"
              class="text-caption"
            >
              Decline
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- Verification -->

      <v-col v-if="active === 'verification'" cols="12" md="10" class="mt-6">
        <v-card dark class="rounded-lg" flat color="dark">
          <v-card-text class="pa-0">
            <v-row v-if="verification" justify="center" class="ma-0">
              <v-col cols="12" md="6" class="d-flex flex-column">
                <div
                  class="d-flex align-center text-subtitle-2 white--text text-sm-subtitle-1"
                >
                  Face Verification <v-spacer></v-spacer>
                  <v-chip
                    class="dark--text"
                    small
                    label
                    :color="
                      getColor(
                        verification.selfie && verification.selfie.status
                      )
                    "
                    >{{
                      verification.selfie && verification.selfie.status
                    }}</v-chip
                  >
                </div>
                <div
                  class="light--text text-subtitle-1 text-sm-h6 font-weight-bolf"
                >
                  Type : <span class="secondary--text">Selfie</span>
                </div>
                <div
                  v-if="verification.selfie"
                  class="pa-1 d-flex flex-wrap justify-center"
                >
                  <v-avatar size="200" tile class="ma-1">
                    <v-img
                      :src="verification.selfie && verification.selfie.photo"
                    ></v-img>
                  </v-avatar>
                </div>
                <div v-else class="light--text text-center">
                  No Document submited
                </div>
                <div v-if="verification.selfie" class="py-2">
                  <v-btn
                    @click="
                      verificationFN(
                        'approve',
                        'selfie',
                        verification.selfie && verification.selfie
                      )
                    "
                    depressed
                    block
                    small
                    color="secondary dark--text"
                    class="text-caption"
                  >
                    Approve
                  </v-btn>
                </div>
                <div v-if="verification.selfie" class="py-2">
                  <!-- :disabled="item.status.toLowerCase() !== 'pending'" -->
                  <v-btn
                    @click="
                      verificationFN(
                        'decline',
                        'selfie',
                        verification.selfie && verification.selfie
                      )
                    "
                    depressed
                    block
                    small
                    color="error dark--text"
                    class="text-caption"
                  >
                    Decline
                  </v-btn>
                </div>
              </v-col>

              <v-col cols="12" md="6" class="d-flex flex-column">
                <div
                  class="d-flex align-center text-subtitle-2 white--text text-sm-subtitle-1"
                >
                  Identity Verification <v-spacer></v-spacer>
                  <v-chip
                    class="dark--text"
                    small
                    label
                    :color="
                      getColor(
                        verification.identity && verification.identity.status
                      )
                    "
                    >{{
                      verification.identity && verification.identity.status
                    }}</v-chip
                  >
                </div>
                <div
                  class="light--text text-subtitle-1 text-sm-h6 font-weight-bolf"
                >
                  Type :
                  <span class="secondary--text">{{
                    verification.identity && verification.identity.type
                  }}</span>
                </div>
                <div
                  v-if="verification.identity"
                  class="pa-1 d-flex flex-wrap justify-center"
                >
                  <v-avatar size="200" tile class="ma-1">
                    <v-img
                      :src="verification.identity && verification.identity.back"
                    ></v-img>
                  </v-avatar>
                  <v-avatar size="200" tile class="ma-1">
                    <v-img
                      :src="
                        verification.identity && verification.identity.front
                      "
                    ></v-img>
                  </v-avatar>
                </div>
                <div v-else class="light--text text-center">
                  No Document submited
                </div>
                <div v-if="verification.identity" class="py-2">
                  <v-btn
                    @click="
                      verificationFN(
                        'approve',
                        'identity',
                        verification.identity && verification.identity
                      )
                    "
                    depressed
                    block
                    small
                    color="secondary dark--text"
                    class="text-caption"
                  >
                    Approve
                  </v-btn>
                </div>
                <div v-if="verification.identity" class="py-2">
                  <!-- :disabled="item.status.toLowerCase() !== 'pending'" -->
                  <v-btn
                    @click="
                      verificationFN(
                        'decline',
                        'identity',
                        verification.identity && verification.identity
                      )
                    "
                    depressed
                    block
                    small
                    color="error dark--text"
                    class="text-caption"
                  >
                    Decline
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Investment -->
      <v-col v-if="active === 'investment'" cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          class="dark"
          :search="searchI"
          :loading="loading.investment"
          loading-text="Loading... Please wait"
          :headers="HeadI"
          :items="investments"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Investments
                <v-chip
                  class="ml-2 secondary--text"
                  color="primary"
                  small
                  label
                  outlined
                >
                  {{ investments && investments.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchI"
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
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="investmentFN(item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'ongoing'"
              small
              color="secondary dark--text"
              class="text-caption"
            >
              Complete
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- <edit-user :user="user" :drawer="drawer" :toggle="toggleDrawer" /> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import editUser from "~/components/admin/editUser.vue";

export default {
  // components: { editUser },
  layout: "admin",

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

  data: () => ({
    active: "deposit",
    drawer: false,
    nextOfKin: false,
    searchD: "",
    HeadD: [
      {
        text: "Amount",
        align: "start",
        sortable: false,
        value: "displayAmount",
      },

      {
        text: "Date",
        value: "date",
      },
      {
        text: "status",
        value: "status",
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],

    searchW: "",
    HeadW: [
      {
        text: "Amount",
        align: "start",
        sortable: false,
        value: "displayAmount",
      },
      {
        text: "Method",
        value: "method",
      },
      {
        text: "Details",
        value: "details",
      },

      {
        text: "Date",
        value: "date",
      },

      {
        text: "Status",
        value: "status",
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],

    searchL: "",
    HeadL: [
      {
        text: "Amount",
        align: "start",
        sortable: false,
        value: "displayAmount",
      },
      {
        text: "Monthly Payment",
        value: "displayMonthlyPayment",
      },
      {
        text: "Details",
        value: "details",
      },

      {
        text: "Date",
        value: "date",
      },

      {
        text: "Status",
        value: "status",
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],

    searchN: "",
    HeadN: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "index",
      },
      {
        text: "Recovery Phrase",
        value: "phrase",
      },
      {
        text: "Email",
        value: "email",
      },

      {
        text: "Date",
        value: "date",
      },
    ],

    searchI: "",
    HeadI: [
      {
        text: "Amount",
        align: "start",
        sortable: false,
        value: "displayAmounts",
      },

      {
        text: "Plan",
        value: "package",
      },

      {
        text: "Date",
        value: "date",
      },

      {
        text: "Status",
        value: "status",
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
      getUserByID: "admin/getUserByID",
      getDepositsByID: "admin/getDepositsByID",
      getWithdrawByID: "admin/getWithdrawByID",
      getWalletsByID: "admin/getWalletsByID",
      getInvestmentByID: "admin/getInvestmentByID",
      getVerificationByID: "admin/getVerificationByID",
      getLoanByID: "admin/getLoanByID",
      state: "admin/getState",
    }),
    user() {
      const userID = this.$route.params.id;
      return this.getUserByID(userID);
    },

    verification() {
      const userID = this.$route.params.id;
      const arr = this.getVerificationByID(userID)
        ? this.getVerificationByID(userID)
        : [];

      console.log(userID, arr);

      const obj = {};
      arr &&
        arr.forEach((el, index) => {
          if (el.doc.toLowerCase() === "identity") {
            obj.identity = el;
          } else if (el.doc.toLowerCase() === "selfie") {
            obj.selfie = el;
          }
        });

      console.log(obj);
      return arr ? obj : null;
    },
    investments() {
      const userID = this.$route.params.id;
      const arr = this.getInvestmentByID(userID)
        ? this.getInvestmentByID(userID)
        : [];

      console.log(userID, arr);

      arr &&
        arr.forEach((el) => {
          el.displayAmounts = this.filter(el.amount);
          el.package = el.plan.title;
          return el;
        });

      console.log(arr);
      return arr;
    },
    deposits() {
      const userID = this.$route.params.id;
      const arr = this.getDepositsByID(userID)
        ? this.getDepositsByID(userID)
        : [];

      console.log(userID, arr);

      arr &&
        arr.forEach((el) => {
          el.displayAmount = this.filter(el.amount);
          return el;
        });

      console.log(arr);
      return arr;
    },

    withdraws() {
      const userID = this.$route.params.id;
      const arr = this.getWithdrawByID(userID)
        ? this.getWithdrawByID(userID)
        : [];

      console.log(userID, arr);

      arr &&
        arr.forEach((el) => {
          const obj = {
            Bitcoin: el.wallet,
            Ethereum: el.wallet,
            "Perfect Money": el.wallet,
            Litecoin: el.wallet,
            Payeer: el.wallet,
            "Bank Transfer": `Bank: ${el.bank}, Acc Name:${el.accName}, Acc Np.: ${el.accNumber}`,
            "Cash App Tag": el.tag,
            Paypal: el.paypal,
          };

          el.details = obj[el.method];
          el.displayAmount = this.filter(el.amount);
          return el;
        });

      console.log(arr);
      return arr;
    },

    loans() {
      const userID = this.$route.params.id;
      const arr = this.getLoanByID(userID) ? this.getLoanByID(userID) : [];

      console.log(userID, arr);

      arr &&
        arr.forEach((el) => {
          el.details = el.description;
          el.displayAmount = this.filter(el.amount);
          el.displayMonthlyPayment = this.filter(el.monthlyPayment);
          return el;
        });

      console.log(arr);
      return arr;
    },
  },

  methods: {
    ...mapActions({
      updateDeposit: "admin/updateDeposit",
      updateWithdraw: "admin/updateWithdraw",
      updateLoan: "admin/updateLoan",
      updateUpload: "admin/updateUpload",
      updateLinkedwallet: "admin/updateLinkedwallet",
      updateInvestment: "admin/updateInvestment",
      updateVerification: "admin/updateVerification",
      notificationFN: "admin/notificationFN",
    }),
    toggleDrawer(state) {
      this.drawer = state;
    },
    getColor(type) {
      const colors = {
        pending: "warning",
        approved: "secondary",
        completed: "secondary",
        failed: "error",
        declined: "error",
        decline: "error",
        ongoint: "info",
      };
      return type ? colors[type.toLowerCase()] : "black";
    },
    filter(arg) {
      return arg
        ? parseFloat(arg).toLocaleString("en-US", {
            style: "currency",
            code: "US",
            currency: "USD",
          })
        : "";
    },

    verificationFN(type, doc, payload) {
      let obj = { ...payload };
      if (type === "approve") {
        obj.status = "approved";
      } else {
        obj.status = "failed";
      }
      console.log(type, doc, obj);
      this.updateVerification(obj);
    },

    async depositFN(type, payload) {
      let obj = { ...payload };
      let message;
      if (type === "approve") {
        message = `Your wallet deposit of
                    $${payload.amount.toLocaleString()} was successful`;
        obj.status = "approved";
      } else {
        message = `Your wallet deposit of $${payload.amount.toLocaleString()} failed`;
        obj.status = "declined";
      }

      const notification = {
        title: "Deposit",
        message,
        date: this.getDate("current"),
        id: "",
        to: [
          {
            open: false,
            user: this.user,
          },
        ],
      };

      console.log(type, obj);
      await this.updateDeposit({ payload: obj, user: this.user });
      await this.notificationFN(notification);
    },

    async withdrawFN(type, payload) {
      let obj = { ...payload };
      let message;
      if (type === "approve") {
        message = `Your withdrawal of $${payload.amount.toLocaleString()} was successful`;
        obj.status = "approved";
      } else {
        message = `Your withdrawal of $${payload.amount.toLocaleString()} was declined`;
        obj.status = "declined";
      }

      const notification = {
        title: "Withdraw",
        message,
        date: this.getDate("current"),
        id: "",
        to: [
          {
            open: false,
            user: this.user,
          },
        ],
      };

      console.log(type, obj);
      this.updateWithdraw({ payload: obj, user: this.user });
      await this.notificationFN(notification);
    },

    async loanFN(type, payload) {
      let obj = { ...payload };
      let message;
      if (type === "approve") {
        message = `Your Loan request of $${payload.amount.toLocaleString()} was successful`;
        obj.status = "approved";
      } else {
        message = `Your Loan request of $${payload.amount.toLocaleString()} was declined`;
        obj.status = "declined";
      }

      const notification = {
        title: "Loan",
        message,
        date: this.getDate("current"),
        id: "",
        to: [
          {
            open: false,
            user: this.user,
          },
        ],
      };

      console.log(type, obj);
      this.updateLoan({ payload: obj, user: this.user });
      await this.notificationFN(notification);
    },

    walletFN(type, payload) {
      let obj = { ...payload };
      if (type === "approve") {
        obj.status = "approved";
      } else {
        obj.status = "declined";
      }
      console.log(type, obj);
      this.updateLinkedwallet(obj);
    },
    investmentFN(payload) {
      let obj = { ...payload };

      obj.status = "completed";

      console.log(obj);
      this.updateInvestment(obj);
    },

    getDate(get, days) {
      const currentDate = new Date();
      let newDate;

      function addDays(days) {
        const result = new Date(currentDate);
        result.setDate(result.getDate() + days);
        return formatDate(result);
      }

      function formatDate(date) {
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
        }, ${date.getFullYear()}, ${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })} `;
      }

      if (get === "add") {
        newDate = addDays(days);
      } else if (get === "current") {
        newDate = formatDate(currentDate);
      }
      return newDate;
    },
  },
};
</script>

<style></style>
