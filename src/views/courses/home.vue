<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="content">
          <div class="scroll m-2" v-for="i in 20">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  'https://res.cloudinary.com/dwpu7jpku/image/upload/v1558709246/samples/imagecon-group.jpg' +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>

            <h6
              class="title text-capitalize w-75 text-dark mt-1 font-open-sans text-wrap"
            >
              Title
            </h6>
            <p class=" text-capitalize " style="color: #999999;">
              Tag 1, Tag2 , Tag 3
            </p>
          </div>

          <!--            <div class="scroll" v-for="(course, idx) in courses" :key="idx">-->
          <!--              <d-card-->
          <!--                :style="-->
          <!--                  'width:200px;height: 120px;' +-->
          <!--                    'backgroundImage:url(' +-->
          <!--                    course.cover_image +-->
          <!--                    ');' +-->
          <!--                    ' background-size:cover; background-position:center'-->
          <!--                "-->
          <!--              >-->
          <!--              </d-card>-->
          <!--              <h6-->
          <!--                class="title text-capitalize w-75 text-dark mt-1 font-open-sans text-wrap"-->
          <!--              >-->
          <!--                {{ course.title }}-->
          <!--              </h6>-->
          <!--              <p class=" text-capitalize " style="color: #999999;">-->
          <!--                {{ course.tags }}-->
          <!--              </p>-->
          <!--            </div>-->
        </carousel>
      </div>
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="courses">
          <div class="scroll m-2" v-for="i in 20">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  'https://res.cloudinary.com/dwpu7jpku/image/upload/v1558709246/samples/imagecon-group.jpg' +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>

            <h6
              class="title text-capitalize w-75 text-dark mt-1 font-open-sans text-wrap"
            >
              Title
            </h6>
            <p class=" text-capitalize " style="color: #999999;">
              Tag 1, Tag2 , Tag 3
            </p>
          </div>

          <!--            <div class="scroll" v-for="(course, idx) in courses" :key="idx">-->
          <!--              <d-card-->
          <!--                :style="-->
          <!--                  'width:200px;height: 120px;' +-->
          <!--                    'backgroundImage:url(' +-->
          <!--                    course.cover_image +-->
          <!--                    ');' +-->
          <!--                    ' background-size:cover; background-position:center'-->
          <!--                "-->
          <!--              >-->
          <!--              </d-card>-->
          <!--              <h6-->
          <!--                class="title text-capitalize w-75 text-dark mt-1 font-open-sans text-wrap"-->
          <!--              >-->
          <!--                {{ course.title }}-->
          <!--              </h6>-->
          <!--              <p class=" text-capitalize " style="color: #999999;">-->
          <!--                {{ course.tags }}-->
          <!--              </p>-->
          <!--            </div>-->
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
export default {
  name: "course-home",
  data() {
    return {
      ref_data: "content"
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
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>
