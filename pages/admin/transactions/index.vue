<template>
  <v-container fluid>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" class="mt-6">
        <v-btn
          dark
          @click="active = 'deposit'"
          :class="
            active === 'deposit' ? 'secondary' : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Deposit - {{ deposits && deposits.length }}
        </v-btn>
        <v-btn
          dark
          @click="active = 'withdraw'"
          :class="
            active === 'withdraw' ? 'secondary' : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Withdraw - {{ withdraws && withdraws.length }}
        </v-btn>
        <v-btn
          dark
          @click="active = 'nft'"
          :class="active === 'nft' ? 'secondary' : 'dark ligthen-4 text1--text'"
          class="rounded-md text-subtitle-2 ma-1"
        >
          NTFs - {{ uploads && uploads.length }}
        </v-btn>
        <v-btn
          dark
          @click="active = 'wallet'"
          :class="
            active === 'wallet' ? 'secondary' : 'dark ligthen-4 text1--text'
          "
          class="rounded-md text-subtitle-2 ma-1"
        >
          Wallets - {{ wallets && wallets.length }}
        </v-btn>
      </v-col>

      <!-- Deposit -->
      <v-col v-if="active === 'deposit'" cols="12" md="10">
        <v-data-table
          dark
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
                <v-chip class="ml-2" color="primary" small label outlined>
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
              color="success"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="depositFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error"
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
                <v-chip class="ml-2" color="primary" small label outlined>
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
              color="success"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="withdrawFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error"
              class="text-caption"
            >
              Decline
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- Linked Wallets -->

      <v-col v-if="active === 'wallet'" cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          class="dark"
          :search="searchN"
          :loading="loading.wallet"
          loading-text="Loading... Please wait"
          :headers="HeadN"
          :items="wallets"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                Linked Wallets
                <v-chip class="ml-2" color="primary" small label outlined>
                  {{ wallets && wallets.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchN"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>

      <!-- Uploads -->
      <v-col v-if="active === 'nft'" cols="12" md="10" class="mt-6">
        <v-data-table
          dark
          class="dark"
          :search="searchU"
          :loading="loading.upload"
          loading-text="Loading... Please wait"
          :headers="HeadU"
          :items="uploads"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar dark flat color="dark">
              <v-toolbar-title
                class="text-subtitle-1 d-flex align-center text-uppercase"
              >
                NFTs Upload
                <v-chip class="ml-2" color="primary" small label outlined>
                  {{ uploads && uploads.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <v-text-field
                v-model="searchU"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
              <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
            </v-toolbar>
          </template>
          <template v-slot:item.nft="{ item }">
            <v-avatar size="100" tile>
              <v-img :src="item.nft" :alt="item.name"></v-img>
            </v-avatar>
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
              @click="uploadFN('approve', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="success"
              class="text-caption"
            >
              Approve
            </v-btn>
            <v-btn
              @click="uploadFN('decline', item)"
              depressed
              :disabled="item.status.toLowerCase() !== 'pending'"
              small
              color="error"
              class="text-caption"
            >
              Decline
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
      }
    },
  },

  data: () => ({
    active: "deposit",
    drawer: false,
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
        text: "email",
        value: "email",
      },
      {
        text: "Method",
        value: "type",
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

    searchU: "",
    HeadU: [
      {
        text: "Collection Name",
        align: "start",
        sortable: false,
        value: "collectionName",
      },

      {
        text: "NFT",
        value: "nft",
      },

      {
        text: "Bid Price",
        value: "displayAmount",
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
      state: "admin/getState",
    }),
    // user() {
    //   const userID = this.$route.params.id;
    //   return this.getUserByID(userID);
    // },

    wallets() {
      const arr = this.state("linkedwallets")
        ? this.state("linkedwallets")
        : [];

      console.log(arr);

      arr &&
        arr.forEach((el, index) => {
          el.index = index + 1;
          return el;
        });

      console.log(arr);
      return arr;
    },
    uploads() {
      const arr = this.state("uploads") ? this.state("uploads") : [];

      console.log(arr);

      arr &&
        arr.forEach((el) => {
          el.displayAmount = this.filter(el.price);
          return el;
        });

      console.log(arr);
      return arr;
    },
    deposits() {
      const arr = this.state("deposits") ? this.state("deposits") : [];

      console.log(arr);

      arr &&
        arr.forEach((el) => {
          el.displayAmount = this.filter(el.amount);
          return el;
        });

      console.log(arr);
      return arr;
    },

    withdraws() {
      const arr = this.state("withdraws") ? this.state("withdraws") : [];

      console.log(arr);

      arr &&
        arr.forEach((el) => {
          const obj = {
            wallet: `${el.walletName} - ${el.walletAddress}`,
            bank: `${el.bankName} - ${el.bankAddress}`,
          };
          el.details = obj[el.type];
          el.displayAmount = this.filter(el.amount);
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
      updateUpload: "admin/updateUpload",
      updateLinkedwallet: "admin/updateLinkedwallet",
    }),
    toggleDrawer(state) {
      this.drawer = state;
    },
    getColor(type) {
      const colors = {
        pending: "warning",
        approved: "success",
        failed: "error",
        declined: "error",
        decline: "error",
      };
      return colors[type.toLowerCase()];
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
    depositFN(type, payload) {
      let obj = { ...payload };
      if (type === "approve") {
        obj.status = "approved";
      } else {
        obj.status = "declined";
      }
      console.log(type, obj);
      this.updateDeposit(obj);
    },
    withdrawFN(type, payload) {
      let obj = { ...payload };
      if (type === "approve") {
        obj.status = "approved";
      } else {
        obj.status = "declined";
      }
      console.log(type, obj);
      this.updateWithdraw(obj);
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
    uploadFN(type, payload) {
      let obj = { ...payload };
      if (type === "approve") {
        obj.status = "approved";
      } else {
        obj.status = "declined";
      }
      console.log(type, obj);
      this.updateUpload(obj);
    },
  },
};
</script>

<style>
</style>