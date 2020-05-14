<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <carousel refs="content">
          <div class="scroll m-2" v-for="(course, idx) in courses" :key="idx">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  course.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <p
              class="title  text-capitalize mt-2 text-bold "
              style="max-width: 50%!important;"
            >
              {{ course.title }}
            </p>
            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              {{ course.tags }}
            </p>
          </div>
        </carousel>
      </div>
    </d-row>
    <!-- Page Header -->
    <!-- Using the slider component -->
    <!-- slideritem wrapped package with the components you need -->
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
export default {
  name: "course-home",
  data() {
    return {
      ref_data: "content",
      courseProgram: []
    };
  },
  computed: {
    ...mapGetters({
      courses: "app/getCourses"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllCourses"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllCourses();
    this.courses.filter(course => {
      if (course.saved === false) {
        return course;
      }
    });
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css"></style>
