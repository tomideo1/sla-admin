<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div v-if="courses.length > 0" class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in sortedCourses"
            :key="idx"
          >
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  course.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
              @click="
                $router.push({
                  path: 'single/' + course._id
                })
              "
            >
            </d-card>
            <p class="d-flex flex-column">
              <span
                class="title  text-truncate  text-capitalize mt-2 text-bold "
                style="max-width: 200px;"
              >
                {{ course.title }}
              </span>

              <span class=" text-capitalize mt-1 " style="color: #999999;">
                {{ course.tags }}
              </span>
            </p>
          </div>
        </carousel>
      </div>
      <div v-else class="col mb-4">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any C=vourses</span
        >
      </div>
      <div v-if="Categories.length > 0" class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Categories
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(category, idx) in Categories"
            :key="idx"
          >
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  getCategoryBackground +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
              <p
                class="category-text text-uppercase text-truncate  truncate-3 mx-auto my-auto"
                style="max-width: 200px!important;"
              >
                {{ category.name }}
              </p>
            </d-card>
          </div>
        </carousel>
      </div>
      <div v-else class="col mb-4">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any categories</span
        >
      </div>
      <div v-if="courses.length > 0" class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Most Recent
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in recentCourses"
            :key="idx"
          >
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
            <p class="d-flex flex-column">
              <span
                class="title  text-truncate  text-capitalize mt-2 text-bold "
                style="max-width: 200px;"
              >
                {{ course.title }}
              </span>

              <span class=" text-capitalize mt-1 " style="color: #999999;">
                {{ course.tags }}
              </span>
            </p>
          </div>
        </carousel>
      </div>
      <div v-else class="col mb-4">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any recent courses</span
        >
      </div>
      <div v-if="courses.length > 0" class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Most Engaged
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in engagedCourses"
            :key="idx"
            v-if="course.course !== null"
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
            <p class="d-flex flex-column">
              <span
                class="title  text-truncate  text-capitalize mt-2 text-bold "
                style="max-width: 200px;"
              >
                {{ course.course.title }}
              </span>

              <span class=" text-capitalize mt-1 " style="color: #999999;">
                {{ course.course.tags }}
              </span>
            </p>
          </div>
        </carousel>
      </div>
      <div v-else class="col-lg-12">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any most engaged courses</span
        >
      </div>
      <div
        v-for="(course, idx) in courseProgram"
        :key="idx"
        class="col-lg-12"
        v-if="course.courses.course.length > 0"
      >
        <div>
          <h6 class="text-dark title text-capitalize m-1">
            {{ course.courses.tag }}
          </h6>
          <carousel refs="content">
            <div class="scroll m-2" v-for="tags in course.courses.course">
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
              <p class="d-flex flex-column">
                <span
                  class="title  text-truncate  text-capitalize mt-2 text-bold "
                  style="max-width: 200px;"
                >
                  {{ tags.title }}
                </span>

                <span class=" text-capitalize mt-1 " style="color: #999999;">
                  {{ tags.tags }}
                </span>
              </p>
            </div>
          </carousel>
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
import helper from "@/helpers/helper";
export default {
  name: "course-home",
  data() {
    return {
      ref_data: "content",
      courseProgram: [],

      sortedCourses: [],
      recentCourses: undefined
    };
  },
  computed: {
    ...mapGetters({
      courses: "app/getCourses",
      engagedCourses: "app/getEngagedCourses",
      Categories: "app/getCategories"

      // maps courses to current computed resource
    }),

    getCategoryBackground() {
      let categoryImages = [
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589458917/Rectangle_309_fwpz7p.png",
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589808813/Rectangle_529_apeq0b.png",
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589808832/Rectangle_530_iw8pgd.png"
      ];
      const num = Math.floor(Math.random() * categoryImages.length);
      return categoryImages[num];
    }
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
    await this.getAllCourses();
    await this.getAllEngagedCourses();
    await this.getAllCategories();
    this.courses.forEach(res => {
      this.sortedCourses.push(res);
    });
    for (let category of this.Categories) {
      let split_category = category;
      this.getCoursePrograms(split_category.name.split(" ")[0]);
    }

    // this.sortedCourses.sort(helper.GetSortOrder("createdAt"))
    this.sortedCourses.sort(helper.GetSortOrder("title"));
    this.recentCourses = this.courses
      .sort(helper.GetSortOrder("createdAt"))
      .reverse();
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css">
.category-text {
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #ffffff;
}
</style>
