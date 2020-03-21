<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Courses</h3>
      </d-col>
    </d-row>

    <d-row>
      <d-col
        v-for="(course, idx) in courses"
        :key="idx"
        lg="3"
        md="6"
        sm="12"
        class="mb-4"
      >
        <d-card class="card-small card-post card-post--1">
          <div
            class="card-post__image"
            :style="{ backgroundImage: 'url(\'' + course.cover_image + '\')' }"
          >
            <div class="card-post__author d-flex">
              <!--              <a href="#" class="card-post__author-avatar card-post__author-avatar&#45;&#45;small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by {{ post.author }}</a>-->
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a href="#" class="text-fiord-blue">{{ course.title }}</a>
            </h5>
            <router-link to="/courses">
              <d-badge pill :class="['card-post__category']">View More</d-badge>
            </router-link>
            <p class="card-text d-inline-block mb-3">{{ course.details }}</p>
            <br />
            <span class="text-muted"
              >{{ course.updatedAt | moment(" MMMM Do YYYY") }}
            </span>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "course-home",
  data() {
    return {
      PostsListOne
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
  }
};
</script>
