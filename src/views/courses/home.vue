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
      <d-col v-for="(course, idx) in courses" :key="idx" lg="3" md="6" sm="12" class="mb-4">
        <d-card class="card-small card-post card-post--1">
          <div class="card-post__image" :style="{ backgroundImage: 'url(\'' + course.cover_image + '\')' }">

            <div class="card-post__author d-flex">
<!--              <a href="#" class="card-post__author-avatar card-post__author-avatar&#45;&#45;small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by {{ post.author }}</a>-->
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a href="#" class="text-fiord-blue">{{ course.title }}</a>
            </h5>
            <router-link to="/login">
              <d-badge pill :class="['card-post__category']">View More</d-badge>
            </router-link>
            <p class="card-text d-inline-block mb-3">{{ course.details }}</p>
            <br/>
            <span class="text-muted">{{ course.updatedAt |  moment(" MMMM Do YYYY") }}
            </span>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>
<script>
// First Row of Posts
const PostsListOne = [{
  backgroundImage: require('@/assets/images/content-management/1.jpeg'),
  category: 'Business',
  categoryTheme: 'dark',
  author: 'Anna Kunis',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'Conduct at an replied removal an amongst',
  body: 'However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...',
  date: '28 February 2019',
}, {
  backgroundImage: require('@/assets/images/content-management/2.jpeg'),
  category: 'Travel',
  categoryTheme: 'info',
  author: 'James Jamerson',
  authorAvatar: require('@/assets/images/avatars/2.jpg'),
  title: 'Off tears are day blind smile alone had ready',
  body: 'Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...',
  date: '29 February 2019',
}, {
  backgroundImage: require('@/assets/images/content-management/3.jpeg'),
  category: 'Technology',
  categoryTheme: 'royal-blue',
  author: 'Jimmy Jackson',
  authorAvatar: require('@/assets/images/avatars/2.jpg'),
  title: 'Difficult in delivered extensive at direction',
  body: 'Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...',
  date: '29 February 2019',
}, {
  backgroundImage: require('@/assets/images/content-management/4.jpeg'),
  category: 'Business',
  categoryTheme: 'warning',
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/3.jpg'),
  title: 'It so numerous if he may outlived disposal',
  body: 'How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...',
  date: '29 February 2019',
}];

import { mapActions, mapGetters } from "vuex"

export default {
  name: "course-home",
	data () {
		return {
			PostsListOne
		}
	},
  computed: {
    ...mapGetters({
      courses: "app/getCourses"
    })
  },
  methods: {
    ...mapActions("app/", [
      "getAllCourses"
    ])
  },
  async mounted() {
   this.getAllCourses();
  }
}
</script>
