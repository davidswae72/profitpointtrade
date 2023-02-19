<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row class="ma-0" v-if="show">
      <v-col cols="12" class="py-0">
        <v-select
          v-model="document"
          large
          color="secondary"
          :items="['Passport', 'Driver\'s License', 'ID Card']"
          filled
          class="text-subtitle-2 font-weight-light rounded-lg"
          :rules="[(v) => !!v || 'This field is required']"
          label="Document"
          required
        />
      </v-col>
      <v-col cols="12" class="">
        <div class="text-caption warning--text">
          Make sure the document shows your photo, full name, date of birth and
          date of issue.
        </div>
      </v-col>
      <v-col v-if="document" cols="12" class="py-0">
        <v-file-input
          v-model="file1"
          type="file"
          filled
          large
          accept="image/*"
          color="secondary"
          :label="`Upload ${document} Front `"
          :rules="[(v) => !!v || `${document} is required`]"
          class="text-subtitle-2 mx-1 font-weight-light rounded-lg"
          @change="onFileChange"
          prepend-icon=""
          prepend-inner-icon="mdi-file"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="secondary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col v-if="showImage" cols="12" class="py-0">
        <v-sheet height="120" filled class="position rounded">
          <v-img height="100%" cover :src="showImage" />
          <div />
        </v-sheet>
      </v-col>
      <v-col v-if="document" cols="12" class="py-0">
        <v-file-input
          v-model="file2"
          type="file"
          filled
          large
          accept="image/*"
          color="secondary"
          :label="`Upload ${document} Back `"
          :rules="[(v) => !!v || `${document} is required`]"
          class="text-subtitle-2 mx-1 font-weight-light rounded-lg"
          @change="onFileChange2"
          prepend-icon=""
          prepend-inner-icon="mdi-file"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="secondary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col v-if="showImage2" cols="12" class="py-0">
        <v-sheet height="120" filled class="position rounded">
          <v-img height="100%" cover :src="showImage2" />
          <div />
        </v-sheet>
      </v-col>
      <v-col cols="12" class="py-2 mb-4">
        <v-btn
          type="submit"
          depressed
          block
          large
          :loading="loading.verify"
          color="secondary dark--text"
          class="text-subtitle-2 font-weight-medium text-capitalize rounded-lg"
        >
          Submit Document
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-else justify="center" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-icon :color="getColor(verificationStatus)" size="60">
          mdi-account-convert
        </v-icon>

        <div
          :class="`${getColor(verificationStatus)}--text`"
          class="text-cation mt-1 text--capitalize"
        >
          {{ verificationStatus }}
        </div>

        <v-btn
          v-if="verificationStatus === 'failed'"
          @click="show = true"
          depressed
          color="secondary dark--text"
          class="rounded-lg text-subtitle-2 mt-2 text-capitalize"
          >Try again</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    document: "",
    file1: null,
    file2: null,
    showImage: "",
    showImage2: "",

    show: false,
  }),
  computed: {
    ...mapGetters({
      loading: "controller/getLoading",
      user: "authentication/getUser",
      state: "controller/getState",
    }),

    verificationStatus() {
      let status;
      const arr = this.state("verifications");
      arr &&
        arr.forEach((el) => {
          if (el.doc.toLowerCase() === "identity") {
            status = el.status.toLowerCase();
          }
        });

      return status;
    },
  },

  async created() {
    this.show = (await this.verificationStatus) ? false : true;
  },

  methods: {
    ...mapActions({
      verificationFN: "controller/verificationFN",
    }),

    onFileChange() {
      if (this.file1) {
        const file = this.file1;
        this.showImage = URL.createObjectURL(file);
      } else {
        this.showImage = null;
      }
    },
    onFileChange2() {
      if (this.file1) {
        const file = this.file2;
        this.showImage2 = URL.createObjectURL(file);
      } else {
        this.showImage2 = null;
      }
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          doc: "identity",
          type: this.document,
          front: this.file1,
          back: this.file2,
          status: "Pending",
          id: "",
          userID: this.user && this.user.userID,
        };
        console.log(payload);
        this.verificationFN(payload);
      }
      //   this.checkIfDone()
    },

    getColor(status) {
      const colors = {
        pending: "warning",
        failed: "error",
        approved: "secondary",
        success: "secondary",
      };

      return colors[status];
    },
  },
};
</script>
  
  <style>
</style>
  