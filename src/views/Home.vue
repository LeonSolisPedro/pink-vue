<template>
  <div>
    <b-carousel id="carousel-1" :interval="4000" controls indicators>
      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="../assets/one.jpg"
        alt="Carousel One"
      >
        <h1>Welcome to Pink</h1>
        <p>Aenean malesuada nisi ut commodo semper.</p>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="../assets/two.jpg"
        alt="Carousel One"
      >
        <h1>Introducing pink</h1>
        <p>Aenean malesuada nisi ut commodo semper, Sit amet sagittis dolor.</p>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="../assets/three.jpg"
        alt="Carousel One"
      >
        <h1>Wofff</h1>
        <p>Commodo semper sit amet sagittis dolor.</p>
      </b-carousel-slide>
    </b-carousel>

    <b-container class="explanation">
      <b-row>
        <b-col cols="12" class="text-center">
          <h2 class="mb-3">Lorem Ipsum is simply dummy</h2>
          <p v-if="isAuthenticated">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed
            placerat tortor. Etiam egestas iaculis leo quis ullamcorper. Sed non
            lectus mattis, molestie eros sed
          </p>
          <p v-if="!isAuthenticated">
            Please, <router-link to="/login/">login first</router-link> to get started
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="isAuthenticated">
      <b-row>
        <b-col md="3" class="d-flex justify-content-center mb-3">
          <div class="circleBase circle-blue">
            <font-awesome-icon class="mx-2" :icon="['fas', 'ticket-alt']" />
            <h5>Tickets</h5>
          </div>
        </b-col>
        <b-col md="3" class="d-flex justify-content-center mb-3">
          <div class="circleBase circle-green">
            <font-awesome-icon class="mx-2" :icon="['fas', 'camera']" />
            <h5>Camera</h5>
          </div>
        </b-col>
        <b-col md="3" class="d-flex justify-content-center mb-3">
          <div class="circleBase circle-red">
            <font-awesome-icon class="mx-2" :icon="['fas', 'font']" />
            <h5>Text</h5>
          </div>
        </b-col>
        <b-col md="3" class="d-flex justify-content-center mb-3">
          <div class="circleBase circle-orange">
            <font-awesome-icon class="mx-2" :icon="['fas', 'tablet-alt']" />
            <h5>Devices</h5>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="isAuthenticated" class="explanation py-4">
      <b-row v-for="post in posts" :key="post.id" class="row py-4">
        <b-col md="3">
          <b-img
            :src="`${post.imgbanner}`"
            fluid
            alt="Responsive image"
          ></b-img>
        </b-col>
        <b-col md="9">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<style>
.carousel-caption h1 {
  font-size: 60px;
  font-family: "OpenSans-SemiBold";
  text-transform: uppercase;
  font-weight: 600;
}

.explanation {
  padding: 40px 90px;
}

.circleBase {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}

.circle-blue {
  background-color: #4eb9f4;
}

.circle-green {
  background-color: #6fc125;
}

.circle-red {
  background-color: #ff5649;
}

.circle-orange {
  background-color: #e48f23;
}

.circleBase svg {
  font-size: 50px;
}

.carousel-item img {
  width: 100% !important;
  height: 70vh !important;
}
</style>

<script>
import { mapState } from "vuex"
import { BCarousel, BCarouselSlide } from "bootstrap-vue"

export default {
  data() {
    return {
      posts: null,
    }
  },

  async mounted() {
    if (this.isAuthenticated) {
      const result = await this.axios.get("/api/posts")
      this.posts = result.data
    }
  },

  computed: mapState(["isAuthenticated"]),

  components: {
    BCarousel,
    BCarouselSlide
  }
}
</script>