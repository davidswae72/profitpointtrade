<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row v-if="show" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-avatar height="100" width="100" tile class="light">
          <v-img contain height="100%" src="/img/face.png" />
        </v-avatar>

        <div class="d-flex flex-column mt-2 light--text">
          <span class="text-caption">
            <v-icon color="success" small> mdi-check</v-icon>
            Take a selfie of yourself with a neutral expression
          </span>
          <span class="text-caption">
            <v-icon color="success" small> mdi-check</v-icon>
            Make sure your whole face is visible, centred, and your eyes are
            open
          </span>
          <span class="text-caption">
            <v-icon color="error" small> mdi-close</v-icon>
            Do not crop your ID or use screenshots of your ID
          </span>
          <span class="text-caption">
            <v-icon color="error" small> mdi-close</v-icon>
            Do not hide or alter parts of your face (No hats/beauty
            images/filters/headgear)
          </span>
        </div>
      </v-col>

      <v-col cols="12" class="pb-0">
        <v-file-input
          v-model="file"
          type="file"
          large
          filled
          capture="user"
          accept="image/*"
          :label="`Upload Photo`"
          color="secondary"
          prepend-icon=""
          :rules="[(v) => !!v || `This field is required`]"
          class="text-subtitle-2 mx-1 font-weight-light rounded-md"
          @change="onFileChange"
          prepend-inner-icon="mdi-camera"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="secondary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col v-if="showImage" cols="12" class="py-0">
        <v-sheet height="120" outlined class="dark position rounded">
          <v-img height="100%" contain :src="showImage" />
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
          class="text-subtitle-2 font-weight-light rounded-lg text-capitalize"
        >
          Submit Document
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-else justify="center" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-icon :color="getColor(verificationStatus)" size="60">
          mdi-account-box
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
    photo: "",
    file: null,
    showImage: "",

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
          if (el.doc.toLowerCase() === "selfie") {
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
      if (this.file) {
        const file = this.file;
        this.showImage = URL.createObjectURL(file);
      } else {
        this.showImage = null;
      }
    },

    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = {
          doc: "selfie",
          photo: this.file,
          status: "Pending",
          id: "",
          userID: this.user && this.user.userID,
        };
        console.log(payload);
        this.verificationFN(payload);
        this.clear();
      }
    },
    clear() {
      this.reset();
      this.resetValidation();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
  