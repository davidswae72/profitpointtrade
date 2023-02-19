<template>
  <v-container fluid class="pa-0 overflow py-16">
    <v-row
      justify="center"
      class="bg-contact align-center px-md-16 px-4 py-16 primary ma-0"
    >
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class="text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Contact Us
        </div>
        <div class="text-h6 light--text font-weight-light mt-5">
          We love to listen and we are eagerly waiting to talk to you
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="white text2--text py-16 px-4 px-md-10">
      <v-col cols="12" md="11" class="px-4">
        <div class="elfsight-app-20b6c439-9d69-4bd0-9281-d8bd6053933c"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Contact",
  scrollToTop: true,
  data: () => ({}),

  methods: {},
  created() {
    window.scrollTo(0, 0);
  },
  head() {
    return {
      title: "Contact Us",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Have any questions or feedback? Please get in touch with us by filling the contact form below and our support will get back to you within 24 hours",
        },
      ],
      script: [
        {
          src: "https://apps.elfsight.com/p/platform.js",
        },
      ],
    };
  },
};
</script>

<style>
.bg-contact {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.8) 47%,
      rgba(0, 0, 0, 0.8) 87%
    ),
    url("/bg/bg-5.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width: 100vw;
  overflow: hidden;
}
</style>
