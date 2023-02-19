<template>
  <v-row justify="center" class="ma-0">
    <v-col
      v-for="service in services"
      :key="service.name"
      :data-aos-delay="service.delay"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-easing="ease-in-out"

      cols="12"
      md="4"
    >
      <div class="hoverme rounded-md">
        <v-card flat rounded="md">
          <v-card-text class="pa-6 text-center py-6 d-flex flex-column align-center">
            <v-btn
              x-large
              outlined
              fab
              depressed
              color="blue lighten-4"
            >
              <v-icon large color="primary">
                {{ service.icon }}
              </v-icon>
            </v-btn>
            <div class="text2--text d-flex flex-column my-4">
              <span class="text-h6 text-md-h5 my-2 font-weight-medium">
                {{ service.name }}
              </span>
              <span class="text1--text text-sm-subtitle-1">
                {{ service.description }}
              </span>
            </div>
            <v-btn :to="service.link" text color="primary" class="mb-4 text-capitalize text-subtitle-1 font-weight-regular">
              Learn More
              <v-icon size="20" right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
            <div style="width:100px; height:4px" class=" primary mb-n6 mt-2" />
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {

  data: () => ({
    services: [
      {
        name: 'Business Grant',
        icon: 'fas fa-hand-holding-usd',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In.',
        link: '/services/business-grant',
        delay: 500
      },
      {
        name: 'Student Scholarship',
        icon: 'fas fa-user-graduate',
        description: 'Keal scholarship scheme aims to assist university students',
        link: '/services/student-scholarship',
        delay: 600
      },
      {
        name: 'Business Support',
        icon: 'fas fa-user-tie',
        description: 'We provide expert advice and support to grow your business',
        link: '/services/business-support',
        delay: 700
      }
    ]
  })

}
</script>

<style>

.hoverme, .hovershadow {
    transition: all 0.5s 0s ease-in-out;
    border-radius: 7px;
    box-shadow: 4px 4px 24px 4px rgba(0, 5, 65, 0.247);
    overflow: hidden;
}

.hoverme:hover {

    border:1px solid rgb(9, 41, 223);
}
.hoverOrange {
  border:1px solid rgb(253, 152, 0);
}
</style>
