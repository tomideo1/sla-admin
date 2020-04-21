<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <!-- Using the slider component -->
    <!-- slideritem wrapped package with the components you need -->
    <d-row>
      <carousel
        :autoplay="false"
        :options="options"
        :responsive="options.responsive"
      >
        <div v-for="(course, idx) in courses" :key="idx">
          <img :src="course.cover_image" width="202" height="117" />
        </div>
      </carousel>
    </d-row>
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import carousel from "vue-owl-carousel";
export default {
  name: "course-home",
  data() {
    return {
      options: {
        loop: false,
        margin: 10,
        nav: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 5,
            nav: false
          },
          1000: {
            items: 6,
            nav: true,
            loop: false
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      courses: "app/getCourses"
    })
  },
  methods: {
    ...mapActions("app/", ["getAllCourses"])
  },
  async mounted() {
    this.getAllCourses();
  },
  components: {
    carousel
  }
};
</script>
