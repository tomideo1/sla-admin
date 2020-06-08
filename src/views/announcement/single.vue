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
        ></div>
        <div
          class="col-md-12  "
          style="max-height: 300px!important; overflow-y: auto"
        >
          <!--          <div class="col-md-12 " v-for="comment in Announcement.comments">-->
          <div class="d-flex flex-column" v-for="i in 10">
            <span class="ml-2 d-flex m-2 flex-row">
              <sla-avatar size="md" class="m-1" :user="{ name: 'TOMIDE' }" />
              <span class="m-2 mb-4">Tomide Aina</span>
            </span>
            <span class="ml-5 mt-n4 mb-3"
              >Donec sollicitudin molestie malesuada. Donec rutrum congue leo
              eget malesuada. Vestibulum ac diam sit amet quam vehicula
              elementum sed sit amet dui. Donec rutrum congue leo eget
              malesuada.
            </span>
            <div class="d-flex flex-row">
              <small class="text-grey-500 ml-5 mt-n2">7h</small>
              <small class="text-grey-500 ml-5 mt-n2">Like</small>
              <small class="text-grey-500 ml-5 mt-n2">Reply</small>
            </div>
          </div>
        </div>
        <div class="d-flex  flex-row flex-grow-1 w-100">
          <sla-avatar size="md" :user="{ name: 'Tomide' }" class=" mt-4 ml-5" />
          <chat-box
            @keyup="handleChat"
            class=""
            @send="handleChat"
            v-model="content"
          />
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
            name: 'edit-announcement',
            params: { single_announcement: Announcement }
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import Multiselect from "vue-multiselect";
import store from "@/store/index";
import "quill-emoji/dist/quill-emoji.css";
import EmojiButton from "@joeattardi/emoji-button";
import quill from "quill";
import Avatar from "../../components/avatar";
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
      dropzoneOptions: {
        // url:'localhost:8080',
        url: `${process.env.VUE_APP_API}`,
        // acceptedFiles: "images/*",
        // thumbnailMethod:'contain',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFileSizeInMB: 2, // MB
        maxNumberOfFiles: 1,
        preventDuplicates: true,
        resizeWidth: 300,
        resizeHeight: 300
        // resize: this.resize,
      },
      mockFile: {
        name: "Filename",
        size: 300
      },
      formData: {
        title: null,
        rich_details: "",
        normal_details: "",
        list_category: [],
        list_tags: [],
        recepients: "everyone",
        cover_image: ""
      },
      time: {
        schedule: {
          days: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          final_date: null
        }
      },
      CategoryIds: [],
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
    }
  },
  mounted() {
    this.Announcement = this.$route.params.single_announcement;
    this.isLoaded = true;
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
