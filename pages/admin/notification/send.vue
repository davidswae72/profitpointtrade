<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="8">
        <v-card dark flat rounded="xl" color="primary pa-0 pb-6">
          <v-card-text class="light--text pa-0">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row justify="center" class="ma-0">
                <v-col cols="12" class="d-flex align-center">
                  <v-btn @click="$router.go(-1)" fab icon color="secondary">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>

                  <span
                    class="text-subtitle-1 white--text text-sm-h6 font-weight-bod"
                    >New Notification</span
                  >
                  <v-spacer></v-spacer>

                  <v-btn
                    depressed
                    small
                    :outlined="!selectAll"
                    @click="selectFN"
                    color="warning dark--text"
                    class="text--subtitle-2 text-capitalize"
                    >{{ selectAll ? "Unselect Users" : "Select All" }}
                  </v-btn>
                </v-col>
                <v-col v-if="!selectAll" cols="12" class="py-0">
                  <v-autocomplete
                    v-model="users"
                    filled
                    multiple
                    small-chips
                    name="users"
                    label="Send to"
                    required
                    clearable
                    deletable-chips
                    color="secondary"
                    :items="allUsers"
                    item-text="name"
                    item-value="name"
                    return-object
                    class="text-subtitle-2 secondary--text font-weight-medium rounded-lg"
                    :rules="[(v) => !!v || 'This field is required']"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col
                  v-else
                  cols="12"
                  class="text-subtitle-1 text-sm-h6 warning--text font-weight-bold pt-0"
                >
                  {{ users && users.length }} Selected
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="title"
                    type="text"
                    name="title"
                    filled
                    color="secondary"
                    label="Title"
                    :rules="[(v) => !!v || 'Title is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-textarea
                    v-model="message"
                    name="message"
                    type="text"
                    rows="2"
                    filled
                    color="secondary"
                    :rules="[(v) => !!v || 'Title is required']"
                    required
                    class="text-subtitle-2 font-weight-medium rounded-lg"
                    label="Message"
                  />
                </v-col>

                <v-col cols="12" class="py-0 d-flex align-center">
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.notification"
                    large
                    color="secondary dark--text"
                    class="text-capitalize rounded-lg text-subtitle-2 font-weight-regular"
                  >
                    Send Message
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "admin",

  data: () => ({
    valid: true,
    selectAll: false,

    users: "",
    title: "",
    message: "",
  }),

  computed: {
    ...mapGetters({
      loading: "admin/getLoading",
      state: "admin/getState",
    }),

    allUsers() {
      return this.state("users");
    },
  },

  methods: {
    ...mapActions({
      notificationFN: "admin/notificationFN",
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        let to = [];
        this.users.forEach((el) => {
          to.push({ user: el, open: false });
        });

        const payload = {
          title: this.title,
          message: this.message,
          date: this.getDate("current"),
          id: "",
          to,
        };

        console.log(payload);
        this.notificationFN(payload);
      }
    },

    selectFN() {
      if (!this.selectAll) {
        this.users = this.allUsers;
        this.selectAll = true;
      } else {
        this.users = [];
        this.selectAll = false;
      }
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
