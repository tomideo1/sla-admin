<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container px-4" v-if="isLoaded">
      <!-- Page Header -->
      <top :heading="Announcement.title" />
      <small class="text-uppercase text-grey-500 font-open-sans ml-4">{{
        Announcement.category
      }}</small>
      <br />
      <div class="d-flex flex-row ml-4 mt-1 ">
        <small
          class=" "
          v-if="Announcement.tags.length > 0"
          v-for="tag in Announcement.tags.split(',')"
          >{{ tag }}</small
        >
        <small class="ml-2" v-else>{{ Announcement.tags }}</small>
      </div>

      <Toasts
        :show-progress="false"
        :rtl="false"
        :max-messages="5"
        :time-out="4000"
        :closeable="false"
      ></Toasts>
      <d-row no-gutters class="page-header py-4">
        <div
          class="col-md-8 "
          style="border:1px solid #E7E6E6;  box-sizing: border-box"
        >
          <div class="d-flex flex-row">
            <h5 class="font-open-sans text-black m-3">
              {{ Announcement.title }}
            </h5>
            <small class="font-open-sans text-grey-500 ml-auto m-4">{{
              $moment(Announcement.createdAt).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )
            }}</small>
          </div>
          <p
            class="m-3 font-open-sans text-dark"
            v-html="Announcement.rich_details"
          ></p>
          <div>
            <img
              class="p-3 w-100 h-100 border-bottom"
              :src="Announcement.cover_image"
            />
            <div class="border-bottom p-2  d-flex flex-row">
              <span class="ml-3 ">
                <icon name="wave" size="xs" />
                <icon name="thumbs" size="xs" />
                <small class="font-open-sans"
                  >&nbsp;{{
                &nbsp;Announcement.likes + " likes"
                  }}</small
                >
              </span>
              <span class="mr-3 ml-auto">
                <small class="font-open-sans">{{
                  Announcement.comments + " Comments"
                }}</small>
              </span>
            </div>
            <div class="d-flex flex-row m-3">
              <span class="mr-3 ml-3">
                <icon v-if="isLiked" name="thumb-filled" size="sm" />
                <icon
                  v-else
                  name="thumb-unfilled"
                  @click="likeAnnouncement"
                  size="sm"
                />
                <span class="text-primary justify-content-center"
                  >&nbsp;&nbsp;&nbsp;Like</span
                >
              </span>
              <span
                class="mr-3 ml-3"
                style="cursor: pointer"
                @click="comments = !comments"
              >
                <icon name="comment" size="sm" />
                <span class=" justify-content-center"
                  >&nbsp;&nbsp;&nbsp;Comment</span
                >
              </span>
            </div>
          </div>
          <div
            class="m-3"
            v-show="comments"
            style="border:1px solid #E7E6E6;  box-sizing: border-box; border-top: none;max-height: 300px;!important;"
          >
            <div
              class="col-md-12  "
              style="max-height: 300px!important; overflow-y: auto"
            >
              <!--          <div class="col-md-12 " v-for="comment in Announcement.comments">-->
              <div
                class="d-flex flex-column"
                v-for="(comment, idx) in AllComments"
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
                @keyup="handleComment"
                class="col-md-112 col-lg-12 col-12"
                @send="handleComment"
                v-model="content"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4 col-lg-4 mt-5 mt-lg-0 mt-md-4 col-12">
          <glow-card class="col-md-8 col-lg-6 col-6  m-3 ">
            <div class="d-flex flex-row ">
              <h4 class="text-white">
                {{ Announcement.engagements }}
              </h4>
              <span class="ml-3 mt-n1 "
                ><icon name="arrow-up-white" size="xs" />
              </span>
            </div>
            <span class="text-white">Total Responses</span>
          </glow-card>
        </div>
      </d-row>
      <d-modal v-if="modalStatus" @close="modalStatus = false" size="lg">
        <div style="border-top: 4px solid #0087DB;" class="modal-header"></div>
        <h6 class="text-center m-2 text-bold text-dark font-poppings">
          Are you sure you want to delete this announcement?
        </h6>
        <d-modal-body>
          <div class="text-center">
            <sla-button
              class="m-2 col-md-12"
              type="filled"
              size="md"
              text="YES, DELETE"
              @click="handleDelete(Announcement._id)"
            />
            <sla-button
              class="m-2 col-md-12"
              type="outline"
              size="md"
              :text="'CANCEL'"
              @click="modalStatus = false"
            />
          </div>
        </d-modal-body>
      </d-modal>
      <footer class="border-top m-5 ">
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          :text="'EXPORT'"
          type="filled"
          size="sm"
        />
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          :text="'EDIT'"
          type="outline"
          size="sm"
          @click="
            $router.push({
              path: '/announcements/edit/' + Announcement._id
            })
          "
        />
        <p
          class="font-open-sans float-right m-4"
          style="color: #FF4133; cursor: pointer; font-size: 14px;"
          @click="modalStatus = true"
        >
          DELETE
        </p>
      </footer>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import helper from "@/helpers/helper";
const token = store.state.auth.token;
export default {
  name: "create",
  data() {
    return {
      isLoaded: false,
      isLiked: false,
      modalStatus: false,
      error: {
        status: null,
        message: null
      },
      Announcement: undefined,
      comments: false,
      AllComments: undefined,
      scheduleModal: false,
      buttons: {
        publish: false,
        published: false,
        save: false,
        isLoading: false,
        text: "PUBLISH",
        text1: "SAVE"
      },
      options: [],

      picker: "",
      content: ""
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

  methods: {
    ...mapActions("app/", ["deleteAnnouncement"]),
    handleComment() {
      if (this.content == "") {
        return;
      }
      this.processComment();
    },
    processComment() {
      let comment = {
        admin: this.Admin,
        user: null,
        // id: this.$store.state.user.data._id,
        annoucement: this.Announcement._id,
        content: this.content,
        // groupId: this.group._id,
        createdAt: new Date()
        // groupSlug: this.group.slug
      };

      let send = this.sendComment(comment);
      if (send) {
        this.AllComments.push(comment);
        this.Announcement.comments++;
      } else {
        return;
      }
      this.content = "";
    },
    getTimeDiff(date) {
      let now = moment(new Date()); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let hours = duration.asHours();
      return parseInt(hours);
    },

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
    async handleDelete(id) {
      let res = await this.deleteAnnouncement({
        id: id
      });
      if (res) {
        this.$toast.success("announcement deleted successfully");
        this.$router.go(-1);
      } else {
        this.$toast.error("something went wrong ");
      }
    },

    async likeAnnouncement() {
      const self = this;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/annoucement/admin/like`,
          { _id: self.Announcement._id },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.$toast.success((self.error.message = res.data.message));
          self.Announcement.likes++;
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
    }
  },
  async mounted() {
    const token = store.state.auth.token;
    const self = this;
    await axios
      .get(
        `${process.env.VUE_APP_API}/annoucement/admin/get/` +
          self.$route.params.id,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.Announcement = res.data.data.annoucement;
        self.AllComments = res.data.data.comments;
        self.isLoaded = true;
        self.isLiked = res.data.data.isLiked;
      })
      .catch(ex => {});
  },
  computed: {
    ...mapGetters({
      Admin: "auth/getAdmin"
    })
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
.dropzone {
  width: 330px;
  height: 330px;
}
</style>
