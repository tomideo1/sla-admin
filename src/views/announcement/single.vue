<template>
  <d-container fluid class="main-content-container px-4" v-if="isLoaded">
    <!-- Page Header -->
    <top :heading="Announcement.title" />
    <small class="text-uppercase text-grey-500 font-open-sans ml-4">{{
      Announcement.category
    }}</small>
    <br />
    <div class="d-flex flex-row ml-4 mt-3 ">
      <small
        class="ml-2 "
        style="text-decoration: underline"
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
            $moment(Announcement.createdAt)
          }}</small>
        </div>
        <p class="m-3 font-open-sans text-dark">
          {{ Announcement.normal_details }}
        </p>
        <div>
          <img
            class="p-3 w-100 h-100 border-bottom"
            :src="Announcement.cover_image"
          />
          <div class="d-flex flex-row m-3">
            <span class="mr-3 ml-3">
              <icon name="fb-like" size="sm" />
              <span class="text-primary justify-content-center"
                >&nbsp;&nbsp;&nbsp;Like</span
              >
            </span>
            <span class="mr-3 ml-3" @click="comments = !comments">
              <icon name="comment" size="sm" />
              <span class=" justify-content-center"
                >&nbsp;&nbsp;&nbsp;Comment</span
              >
            </span>
            <span class="mr-3 ml-auto">
              <small class="font-open-sans">{{
                Announcement.comments + " Comments"
              }}</small>
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
            <div class="d-flex flex-column" v-for="comment in AllComments">
              <span class="ml-2 d-flex m-2 flex-row">
                <div v-if="comment.user !== null">
                  <sla-avatar
                    class="avatar m-1 "
                    v-if="comment.user.image === null"
                    size="md"
                    :user="{ name: comment.first_name }"
                  />
                  <sla-avatar
                    class="avatar m-1"
                    v-else
                    size="md"
                    :user="{ image: comment.user.image }"
                  />
                  <span class="m-2 mb-4">{{ comment.user.first_name }}</span>
                </div>
                <div v-else>
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
                  <span class="m-2 mb-4">{{ comment.admin.first_name }}</span>
                </div>
              </span>
              <span class="ml-5 mt-n4 mb-3">
                {{ comment.content }}
              </span>
              <div class="d-flex flex-row">
                <small class="text-grey-500 ml-5 mt-n2">{{
                  getTimeDiff(comment.createdAt) + " h"
                }}</small>
                <!--                <small class="text-grey-500 ml-5 mt-n2">Like</small>-->
                <!--                <small class="text-grey-500 ml-5 mt-n2">Reply</small>-->
              </div>
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
              @keyup="handleChat"
              class="col-md-10 col-lg-10 col-10"
              @send="handleChat"
              v-model="content"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-12"></div>
    </d-row>
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
            path: 'edit/' + Announcement._id
          })
        "
      />
      <p
        class="font-open-sans float-right m-4"
        style="color: #FF4133; cursor: pointer; font-size: 14px;"
        @click="deleteModal = true"
      >
        DELETE
      </p>
    </footer>
  </d-container>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
const token = store.state.auth.token;
export default {
  name: "create",
  data() {
    return {
      isLoaded: false,
      error: {
        status: null,
        message: null
      },
      Announcement: undefined,
      comments: false,
      AllComments: undefined,
      Admin: null,
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
    ChatBox: () => import("@/components/chatBox")
  },

  methods: {
    handleChat() {
      if (this.chat == "") {
        return;
      }
      this.processChat();
    },
    processChat() {
      // let chatObject = {
      //   username: this.$store.state.user.data.first_name,
      //   id: this.$store.state.user.data._id,
      //   message: this.chat,
      //   groupId: this.group._id,
      //   createdAt: Date.now(),
      //   groupSlug: this.group.slug
      // };
      //
      // this.sendChat(chatObject);
      //
      // this.chats.push(chatObject);
      // this.chat = "";
      alert(this.content);
    },
    getTimeDiff(date) {
      let now = moment(new Date()); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let hours = duration.asHours();
      return parseInt(hours);
    }
  },
  mounted() {
    const token = store.state.auth.token;
    const self = this;
    axios
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
