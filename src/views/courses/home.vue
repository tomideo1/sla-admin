<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
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
              class="title  text-capitalize mt-3 text-bold "
              style="max-width: 50%!important;"
            >
              {{ course.title }}
            </p>
            <p class=" text-capitalize mt-1 " style="color: #999999;">
              {{ course.tags }}
            </p>
          </div>
        </carousel>
      </div>
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Categories
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in courses"
            :key="idx"
          ></div>
        </carousel>
      </div>
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Most Recent
        </h6>
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
              class="title  text-capitalize mt-3 text-bold "
              style="max-width: 50%!important;"
            >
              {{ course.title }}
            </p>
            <p class=" text-capitalize mt-1 " style="color: #999999;">
              {{ course.tags }}
            </p>
          </div>
        </carousel>
      </div>
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Most Engaged
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in engagedCourses"
            :key="idx"
          >
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  course.course.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <p
              class="title  text-capitalize mt-3 text-bold "
              style="max-width: 50%!important;"
            >
              {{ course.course.title }}
            </p>
            <p class=" text-capitalize mt-1 " style="color: #999999;">
              {{ course.course.tags }}
            </p>
          </div>
        </carousel>
      </div>
      <div v-for="(course, idx) in courseProgram" :key="idx" class="col-lg-12">
        <div>
          <h6 class="text-dark title text-capitalize m-1">
            <carousel refs="content">
              <div
                class="scroll m-2"
                v-for="tags in course.courses.course"
                v-if="course.courses.course.length > 0"
              >
                <d-card
                  :style="
                    'width:200px!important;height: 120px!important;' +
                      'backgroundImage:url(' +
                      tags.cover_image +
                      ');' +
                      ' background-size:cover; background-position:center'
                  "
                >
                </d-card>
                <p
                  class="title  text-capitalize mt-3 text-bold "
                  style="max-width: 50%!important;"
                >
                  {{ tags.title }}
                </p>
                <p class=" text-capitalize mt-1 " style="color: #999999;">
                  {{ tags.tags }}
                </p>
              </div>
            </carousel>
          </h6>
        </div>
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
      courses: "app/getCourses",
      engagedCourses: "app/getEngagedCourses",
      Categories: "app/getCategories"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", [
      "getAllCourses",
      "getAllEngagedCourses",
      "getAllCategories"
    ]),

    async getCoursePrograms(program) {
      const token = store.state.auth.token;
      let tags = await axios
        .get(`${process.env.VUE_APP_API}/course/` + program, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          this.courseProgram.push({ courses: res.data.data });
        })
        .catch();
    }
    //vuex call to get all courses
  },
  async mounted() {
    this.getAllCourses();
    this.getAllEngagedCourses();
    this.getAllCategories();
    this.Categories.forEach(category => {
      this.getCoursePrograms(category.name);
    });
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css"></style>
