<template>
  <d-container fluid>
    <div class="mt-4">
      <h6 class="text-dark title text-capitalize m-1">
        Announcements
      </h6>
    </div>
    <d-row class=" mt-5">
      <div
        v-if="announcements.length > 0 || announcements === null"
        class="col-lg-12"
      >
        <div class="row">
          <div
            class="col-md-3"
            v-for="(announcement, idx) in recentAnnouncement"
            :key="idx"
          >
            <d-card
              @click="
                $router.push({
                  name: 'coach-single-announcement',
                  params: { id: announcement._id }
                })
              "
              :style="
                'height: 120px!important;' +
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
                {{ announcement.engagements + " Responses " }}
              </small>
            </div>
            <p class="d-flex flex-column">
              <span
                style=" max-width: 200px;!important; word-wrap: break-word!important;"
                class="title-card  text-capitalize text-truncate text-bold font-open-sans "
              >
                {{ announcement.title }}
              </span>
              <span class="d-flex">
                <small class=" mr-1 flex-row" v-if="announcement.tags">{{
                  announcement.tags
                }}</small>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="col">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any announcements</span
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
      ref_data: "content",
      recentAnnouncement: [],
      sortedAnnouncement: undefined
    };
  },
  computed: {
    ...mapGetters({
      announcements: "app/getAnnouncements"
      // maps courses to current computed resource
    }),

    getMostEngaged() {
      return this.announcements
        .slice()
        .sort(helper.GetSortOrder("engagements"));
    }
  },
  methods: {
    ...mapActions("app/", ["getAllAnnouncements"])

    //vuex call to get all courses
  },
  async mounted() {
    await this.getAllAnnouncements();
    this.announcements.forEach(res => {
      this.recentAnnouncement.push(res);
    });
    this.recentAnnouncement.sort(helper.GetSortOrder("createdAt")).reverse();
    this.sortedAnnouncement = this.announcements.sort(
      helper.GetSortOrder("title")
    );
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
