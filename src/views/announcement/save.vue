<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div
        v-if="
          getSavedAnnouncements.length > 0 || getSavedAnnouncements === null
        "
        class="col-lg-12"
      >
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-if="announcement.schedule !== null"
            v-for="(announcement, idx) in getSavedAnnouncements"
            :key="idx"
          >
            <d-card
              @click="
                $router.push({
                  name: 'single-announcement',
                  params: { single_announcement: announcement }
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
            <div class="d-flex flex-row mt-2">
              <small class="font-open-sans text-grey-500">{{
                $moment(announcement.createdAt).format("YYYY/MM/DD")
              }}</small>

              <small class="font-open-sans text-grey-500 ml-5">
                {{
                  announcement.likes +
                    announcement.comments +
                    announcement.engagements +
                    " Responses "
                }}
              </small>
            </div>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card  text-capitalize mt-2  text-truncate text-bold font-open-sans "
              >
                {{ announcement.title }}
              </p>
            </div>

            <!--            <p class=" text-capitalize mt-n2 d-flex flex-row text-underline" style="color: #999999;" v-for="announcement_tag in announcement.tags.split(',')">-->
            <!--            {{ announcement_tag }}-->
            <!--            </p>-->
            <p
              class=" text-capitalize mt-n2 d-flex flex-row text-underline"
              style="color: #999999;"
            >
              {{ announcement.tags }}
            </p>
          </div>
        </carousel>
      </div>
      <div v-else class="col">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark text-center  justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any Saved announcements</span
        >
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
      ref_data: "content"
    };
  },
  computed: {
    ...mapGetters({
      announcements: "app/getAnnouncements"
      // maps courses to current computed resource
    }),
    getSavedAnnouncements() {
      return this.announcements.filter(announcement => {
        // let stuff =  announcement.status.toLowerCase() === "save";
        return announcement.status.toLowerCase() === "save";
      });
    }
  },
  methods: {
    ...mapActions("app/", ["getAllAnnouncements"])

    //vuex call to get all courses
  },
  async mounted() {
    await this.getAllAnnouncements();
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
