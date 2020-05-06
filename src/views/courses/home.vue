<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <div class="scrolling-wrapper" id="content" ref="content">
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
                @click="swipeLeft"
              />
            </span>
          </div>
          <div class="scroll m-2" v-for="i in 30">
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
          <div
            class="nav-circle "
            slot="next"
            style="position: absolute; right: 0%; top: 40%;"
          >
            <span class="next">
              <icon name="arrow-right" size="lg" @click="swipeRight" />
            </span>
          </div>
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
    ...mapActions("app/", ["getAllCourses"]),
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      // Condition to check if scrolling is required
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0) &&
          (element.clientWidth + scrollPos === element.scrollWidth ||
            scrollPixels < 0)
        )
      ) {
        // Get the start timestamp
        const startTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();

        function scroll(timestamp) {
          //Calculate the timeelapsed
          const timeElapsed = timestamp - startTime;
          //Calculate progress
          const progress = Math.min(timeElapsed / duration, 1);
          //Set the scrolleft
          element.scrollLeft = scrollPos + scrollPixels * progress;
          //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
          if (timeElapsed < duration) {
            //Request for animation
            window.requestAnimationFrame(scroll);
          } else {
            return;
          }
        }
        //Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(scroll);
      }
    },

    swipeLeft() {
      const content = this.$refs.content;
      this.scrollTo(content, -300, 800);
    },
    swipeRight() {
      const content = this.$refs.content;
      this.scrollTo(content, 300, 800);
    }
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

  .nav-circle {
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    z-index: 100 !important;
  }
}
</style>
