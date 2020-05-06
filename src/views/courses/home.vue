<template style="overflow-x: hidden;">
  <div>
    <div class="container-fluid  ">
      <d-row class=" mt-5">
        <d-col class="col-md-12 ">
          <h6 class="text-dark title text-capitalize m-1">
            Alphabetical Order (A -Z)
          </h6>
          <div class="scrolling-wrapper">
            <div class="scroll" v-for="(course, idx) in courses" :key="idx">
              <d-card
                :style="
                  'width:200px;height: 120px;' +
                    'backgroundImage:url(' +
                    course.cover_image +
                    ');' +
                    ' background-size:cover; background-position:center'
                "
              >
              </d-card>
              <h6
                class="title text-capitalize w-75 text-dark mt-1 font-open-sans text-wrap"
              >
                {{ course.title }}
              </h6>
              <p class=" text-capitalize " style="color: #999999;">
                {{ course.tags }}
              </p>
            </div>
            <br />
          </div>
        </d-col>
      </d-row>
      <!-- Page Header -->
      <!-- Using the slider component -->
      <!-- slideritem wrapped package with the components you need -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import carousel from "vue-owl-carousel";
export default {
  name: "course-home",
  data() {
    return {};
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
    carousel,
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="scss">
.nav-circle {
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 100 !important;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  .scroll {
    display: inline-block;
  }
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .scroll {
    flex: 0 0 auto;
  }
}
.scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}
.scrolling-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
