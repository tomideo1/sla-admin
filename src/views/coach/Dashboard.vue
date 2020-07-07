<!--suppress ALL -->
<template>
  <div>
    <beat-loader
      class="loader centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-container fluid class="main-content-container" v-if="isLoaded">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-4 my-4">
        <div class="col-md-10 col-lg-10 col-12">
          <d-col col sm="12" class="text-center text-sm-left mb-4 mb-sm-0">
            <h3 class="page-title font-poppings text-black">Dashboard</h3>
          </d-col>
          <d-col sm="10" class="">
            <h5 class="font-poppings mt-5  m-5 text-black">Announcement</h5>
            <div
              class="col-md-12 col-lg-12 col-12"
              v-for="(announcement, index) in announcements"
              :key="index"
            >
              <div class=" m-lg-1 m-0 m-md-1 py-4">
                <div style="border: 1px solid #e7e6e6; box-sizing: border-box;">
                  <h5 class="text-black font-open-sans m-3 ">
                    {{ announcement.title }}
                  </h5>
                  <!--<span
                    class=" font-open-sansz text-dark"
                    v-html="announcement.annoucement.rich_details"
                  ></span>-->
                  <div>
                    <div class="announcement-image-holder">
                      <img
                        class="p-3 announcement-image border-bottom"
                        :src="announcement.cover_image"
                      />
                    </div>

                    <div class="border-bottom p-2 d-flex flex-row">
                      <span class="ml-3">
                        <icon name="wave" size="xs" />
                        <icon name="thumbs" size="xs" />
                        <small class="font-open-sans"
                          >&nbsp;{{ announcement.likes + " likes" }}</small
                        >
                      </span>
                      <span class="mr-3 ml-auto">
                        <small class="font-open-sans">{{
                          announcement.comments + " Comments"
                        }}</small>
                      </span>
                    </div>
                    <div class="d-flex flex-row m-3">
                      <span class="mr-3 ml-3">
                        <icon
                          v-if="announcement.liked"
                          name="thumb-filled"
                          size="sm"
                        />
                        <icon
                          v-else
                          name="thumb-unfilled"
                          @click="likeAnnouncement(announcement)"
                          size="sm"
                        />
                        <span class="text-primary justify-content-center"
                          >&nbsp;&nbsp;&nbsp;Like</span
                        >
                      </span>
                      <span
                        class="mr-3 ml-3"
                        style="cursor:pointer"
                        @click="
                          $router.push(
                            `coach/announcement/single/${announcement._id}`
                          )
                        "
                      >
                        <icon name="comment" size="sm" />
                        <span class="justify-content-center"
                          >&nbsp;&nbsp;&nbsp;Comment</span
                        >
                      </span>
                    </div>
                  </div>
                  <!-- comments com here -->
                </div>
              </div>
            </div>
          </d-col>
          <d-col sm="10">
            <h5 class="font-poppings text-black m-5">Surveys</h5>
            <div class="mx-auto m-3">
              <div
                v-if="latest_survey.length > 0"
                class="col-md-12 col-12 col-lg-12  m-2"
              >
                <div
                  class="p-3"
                  style="border:1px solid #E7E6E6; box-sizing:border-box;"
                >
                  <h6 class=" font-open-sans tex-black">
                    l{{ latest_survey[0].survey.title }}
                    <span class="float-right"
                      ><small>{{
                        latest_survey[0].survey.createdAt | chatTime
                      }}</small></span
                    >
                  </h6>

                  <img
                    class="p-3 w-100 h-100 border-bottom"
                    :src="latest_survey[0].survey.survey_image"
                  />
                </div>

                <sla-button
                  type="filled"
                  class="btn m-3 col-md-6 float-right"
                  size="md"
                  text="TAKE SURVEY"
                  @click="
                    $router.push({
                      path: 'coach/survey/single/' + latest_survey[0].survey._id
                    })
                  "
                />
              </div>
              <div class="col" v-else>
                <icon name="empty" class="m-3" size="retain" />
                <span
                  class="font-poppings text-dark justify-content-center d-flex"
                  style="font-size: 16px;"
                  >You don’t have any surveys</span
                >
              </div>
            </div>
          </d-col>
        </div>
        <div class="col-md-2">
          <h5 class="font-poppings text-black">Your Groups</h5>
          <div v-for="(group, index) in Groups" :key="index">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  group.group.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card text-truncate text-capitalize mt-2 text-bold font-open-sans"
              >
                {{ group.group.title }}
              </p>
            </div>

            <p class="text-capitalize mt-n4" style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
            </p>
          </div>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
import helper from "@/helpers/helper";
export default {
  name: "Dashboard",
  data() {
    return {
      individual_announcement: [],
      isLoaded: false,
      error: {
        status: null,
        message: null
      },
      latest_survey: []
    };
  },
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon"),
    SlaButton: () => import("@/components/SlaButton"),
    Top: () => import("@/components/top"),
    ChatBox: () => import("@/components/chatBox"),
    glowCard: () => import("@/components/glowCard")
  },
  computed: {
    ...mapGetters({
      Groups: "app/getCoachGroups",
      announcements: "app/getAnnouncements",
      Admin: "auth/getAdmin",
      surveys: "app/getCoachSurveys"
    })
  },
  methods: {
    ...mapActions("app/", [
      "getCoachesGroups",
      "getAllAnnouncements",
      "getAnnouncementDetails",
      "getAllCoachSurveys"
    ]),

    async sendComment(commentObj) {
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/comment/admin/create/`, commentObj, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.$toast.success((self.error.message = res.data.message));
          return true;
        })
        .catch(ex => {
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
          return false;
        });
    },

    async likeAnnouncement(announcement) {
      console.log(announcement);
      const self = this;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/annoucement/admin/like`,
          { _id: announcement._id },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.$toast.success((self.error.message = res.data.message));
          announcement.likes++;
          announcement.isLiked = true;
          return true;
        })
        .catch(ex => {
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
          return false;
        });
    },
    handleComment(announcement, current_comments) {
      console.log(announcement);
      if (announcement.content === undefined || announcement.content == "") {
        return;
      }
      this.processComment(announcement, current_comments);
    },
    processComment(announcement, current_comments) {
      let comment = {
        admin: this.Admin,
        user: null,
        // id: this.$store.state.user.data._id,
        annoucement: announcement._id,
        content: announcement.content,
        // groupId: this.group._id,
        createdAt: new Date()
        // groupSlug: this.group.slug
      };

      let send = this.sendComment(comment);
      if (send) {
        current_comments.push(comment);
        announcement.comments++;
      } else {
        return;
      }
      announcement.content = "";
    }
  },
  async mounted() {
    await this.getCoachesGroups();
    await this.getAllAnnouncements();
    await this.getAllCoachSurveys();
    const self = this;
    let latest_survey = null;
    if (this.surveys.length > 0) {
      latest_survey = this.surveys
        .sort(helper.GetSortOrder("createdAt"))
        .reverse()[0];
    }

    if (latest_survey !== null) {
      await axios
        .get(
          `${process.env.VUE_APP_API}/survey/coach/` +
            latest_survey._id +
            `/questions/list`,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.latest_survey.push(res.data.data);
          self.isLoaded = true;
        })
        .catch(ex => {});
    } else {
      self.isLoaded = true;
    }
  }
};
</script>

<style lang="css" scoped>
hr.style1 {
  border-top: 1px solid #ababab !important;
}
.card-number {
  font-weight: 300;
  font-size: 30px;
}
.legend_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legend_block > span,
.legend_block > p {
  display: inline-block;
}
.shadow-effect {
  box-shadow: 0px 1px 13px rgba(0, 135, 219, 0.62);
  border-radius: 5px;
}

.selected {
  background: rgba(0, 135, 219, 0.04);
  border-radius: 0px 50px 50px 0px;
  width: 100%;
  padding: 2px;
}

.scorecard-selected {
  background-color: #e7e6e6;
  opacity: 0.6;
}
.btn-primary {
  background: rgba(0, 135, 219, 0.16) !important;
  border: none;
}
.btn-warning {
  background: #ffdea3 !important;
}
.announcement-image {
  max-width: 100%;
  max-height: auto;
  position: relative;
  vertical-align: middle;
  left: 50%;
  transform: translate(-50%);
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.announcement-image-holder {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  display: inline-block;
}
</style>
