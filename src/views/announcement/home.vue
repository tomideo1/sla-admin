<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(announcement, idx) in announcements"
            :key="idx"
          >
            <d-card
              @click="
                $router.push({
                  name: 'single-announcement',
                  params: { announcement: announcement }
                })
              "
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  announcement.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card  text-capitalize mt-2  text-bold font-open-sans "
              >
                {{ announcement.title }}
              </p>
            </div>

            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
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
      ref_data: "content"
    };
  },
  computed: {
    ...mapGetters({
      announcements: "app/getAnnouncements"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllAnnouncements"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllAnnouncements();
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css">
.title-card {
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.15px;

  color: #333333;
}
</style>
