<template style="overflow-x: hidden;">
  <div>
    <div class="container-fluid  ">
      <d-row class=" mt-5">
        <d-col class="col-md-12 ">
          <h6 class="text-dark title text-capitalize m-1">
            Alphabetical Order (A -Z)
          </h6>
          <carousel
            :autoplay="false"
            :nav="false"
            :options="options"
            :responsive="options.responsive"
            class=""
            style="max-width: 100%;"
          >
            <div
              class="nav-circle"
              slot="prev"
              style="position: absolute; left: 0%; top: 40%;  "
            >
              <span class="prev">
                <icon
                  name="arrow-right"
                  size="lg"
                  style="transform: rotate(180deg);"
                />
              </span>
            </div>
            <div v-for="(course, idx) in courses" :key="idx">
              <div>
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

            <div
              class="nav-circle "
              slot="next"
              style="position: absolute; right: 0%; top: 40%;"
            >
              <span class="next">
                <icon name="arrow-right" size="lg" />
              </span>
            </div>
          </carousel>
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
    return {
      options: {
        loop: false,
        // autoWidth:'inherit',
        responsiveClass: true,
        dots: false,
        responsive: {
          0: {
            items: 2,
            nav: false,
            dots: false,
            margin: 15,
            loop: false,
            stagePadding: 10
          },
          600: {
            items: 3,
            nav: false,
            loop: false,
            margin: 10,
            dots: false
          },
          768: {
            items: 3,
            nav: false,
            loop: false,
            margin: 10,
            stagePadding: 10,

            dots: false
          },
          1000: {
            items: 6,
            stagePadding: 10,
            dots: false,
            loop: false
          },
          1024: {
            items: 5.5,
            stagePadding: 10,
            dots: false,
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
    carousel,
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="scss">
* {
  /*background: linear-gradient(100.01deg, #FFFFFF 52.71%, rgba(255, 255, 255, 0) 96.84%) !important;*/
}
.x-flow {
  &::-webkit-scrollbar {
    display: none;
  }
  & > :not(:last-child) {
    margin-right: 12px !important;
  }
  & > *:last-child {
    padding-right: 12px !important;
  }
}
.nav-circle {
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 100 !important;
}
</style>
