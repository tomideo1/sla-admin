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
            <h5 class="font-poppings mt-5  text-black">Announcement</h5>
            <div
              class="col-md-12 col-lg-12"
              v-for="(announcement, index) in individual_announcement"
              :key="index"
            >
              <div class="row m-1 py-4">
                <div style="border: 1px solid #e7e6e6; box-sizing: border-box;">
                  <p
                    class="m-3 font-open-sans text-dark"
                    v-html="announcement.annoucement.rich_details"
                  ></p>
                  <div>
                    <img
                      class="p-3 w-100 h-100 border-bottom"
                      :src="announcement.annoucement.cover_image"
                    />
                    <div class="border-bottom p-2 d-flex flex-row">
                      <span class="ml-3">
                        <icon name="wave" size="xs" />
                        <icon name="thumbs" size="xs" />
                        <small class="font-open-sans"
                          >&nbsp;{{
                            announcement.annoucement.likes + " likes"
                          }}</small
                        >
                      </span>
                      <span class="mr-3 ml-auto">
                        <small class="font-open-sans">{{
                          announcement.annoucement.comments + " Comments"
                        }}</small>
                      </span>
                    </div>
                    <div class="d-flex flex-row m-3">
                      <span class="mr-3 ml-3">
                        <icon
                          name="fb-like"
                          @click="likeAnnouncement(announcement.annoucement)"
                          size="sm"
                        />
                        <span class="text-primary justify-content-center"
                          >&nbsp;&nbsp;&nbsp;Like</span
                        >
                      </span>
                      <span class="mr-3 ml-3">
                        <icon name="comment" size="sm" />
                        <span class="justify-content-center"
                          >&nbsp;&nbsp;&nbsp;Comment</span
                        >
                      </span>
                    </div>
                  </div>
                  <div
                    class="col-md-12"
                    style="max-height: 300px !important; overflow-y: auto;"
                  >
                    <div
                      class="d-flex flex-column"
                      v-for="(comment, idx) in announcement.comments"
                      :key="idx"
                    >
                      <span
                        v-if="comment.user !== null"
                        class="ml-2 d-flex  flex-row"
                      >
                        <sla-avatar
                          class="avatar m-1"
                          size="md"
                          v-if="comment.user.image === null"
                          :user="{ name: comment.user.first_name }"
                        />
                        <sla-avatar
                          class="avatar m-1"
                          v-else
                          size="md"
                          :user="{ image: comment.user.image }"
                        />
                        <p class="  m-2 d-flex flex-column ">
                          <span class="d-flex flex-row">
                            <span class="mt-3 text-bold text-black">
                              {{ comment.user.first_name }}
                            </span>
                            <span class="text-grey-500  mt-3 ml-3 ">
                              <small>{{ comment.createdAt | chatTime }}</small>
                            </span>
                          </span>
                          <span class=" mb-1">
                            {{ comment.content }}
                          </span>
                        </p>
                      </span>
                      <span
                        v-else-if="comment.admin !== null"
                        class="ml-2 d-flex m-2 flex-row"
                      >
                        <sla-avatar
                          class="avatar m-1"
                          size="md"
                          v-if="comment.admin.image === null"
                          :user="{ name: comment.admin.first_name }"
                        />
                        <sla-avatar
                          class="avatar m-1"
                          v-else
                          size="md"
                          :user="{ image: comment.admin.image }"
                        />
                        <p class="  m-1 d-flex flex-column ">
                          <span class="d-flex flex-row">
                            <span class="mt-3 text-bold text-black">
                              {{
                                comment.admin.first_name +
                                  "  " +
                                  (comment.admin.type === "coach"
                                    ? "(Coach)"
                                    : "(Admin)")
                              }}
                            </span>
                            <span class="text-grey-500  mt-3 ml-3 ">
                              <small>{{ comment.createdAt | chatTime }}</small>
                            </span>
                          </span>
                          <span class=" mb-1">
                            {{ comment.content }}
                          </span>
                        </p>
                        <!--                <small class="text-grey-500 ml-5 mt-n2">Like</small>-->
                        <!--                <small class="text-grey-500 ml-5 mt-n2">Reply</small>-->
                      </span>
                    </div>
                  </div>
                  <div class="d-flex flex-lg-row w-100 mt-3">
                    <sla-avatar
                      size="md"
                      v-if="Admin.image === null"
                      :user="{ name: Admin.first_name }"
                      class="ml-5  mt-4  "
                    />
                    <sla-avatar
                      size="md"
                      v-else
                      :user="{ image: Admin.image }"
                      class="ml-5  mt-4  "
                    />
                    <chat-box
                      @keyup="
                        handleComment(
                          announcement.annoucement,
                          announcement.comments
                        )
                      "
                      class="col-md-112 col-lg-12 col-12"
                      @send="
                        handleComment(
                          announcement.annoucement,
                          announcement.comments
                        )
                      "
                      v-model="announcement.annoucement.content"
                    />
                  </div>
                </div>
              </div>
            </div>
          </d-col>
          <d-col sm="10">
            <h5 class="font-poppings text-black">Surveys</h5>
            <div class="mx-auto m-3">
              <div class="col-md-10 col-10 col-lg-10  m-2">
                <div
                  class="p-3"
                  style="border:1px solid #E7E6E6; box-sizing:border-box;"
                >
                  <div
                    :style="
                      'height: 120px!important;' +
                        'backgroundImage:url(' +
                        latest_survey.survey.survey_image +
                        ');' +
                        ' background-size:cover; background-position:center'
                    "
                  ></div>
                </div>

                <sla-button
                  type="filled"
                  class="btn m-3 col-md-6 float-right"
                  size="md"
                  text="TAKE SURVEY"
                  @click="
                    $router.push({
                      path: 'coach/survey/single/' + latest_survey.survey._id
                    })
                  "
                />
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
                  group.cover_image +
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
                {{ group.title }}
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
      surveys: "app/getSurveys"
    })
  },
  methods: {
    ...mapActions("app/", [
      "getCoachesGroups",
      "getAllAnnouncements",
      "getAnnouncementDetails",
      "getAllSurveys"
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
    await this.getAllSurveys();
    const self = this;
    await this.announcements.forEach(res => {
      let data = this.getAnnouncementDetails({ id: res._id });
      data.then(res => {
        self.individual_announcement.push(res);
      });
    });
    let latest_survey = this.surveys
      .sort(helper.GetSortOrder("createdAt"))
      .reverse()[0];
    await axios
      .get(
        `${process.env.VUE_APP_API}/survey/` +
          latest_survey._id +
          `/questions/list`,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.latest_survey = res.data.data;
        self.isLoaded = true;
      })
      .catch(ex => {});
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
</style>
