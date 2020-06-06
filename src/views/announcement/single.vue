<template>
  <d-container fluid class="main-content-container px-4">
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
        <div class="d-flex flex-row align-items-center chatbox m-3 mr-2  ">
          <span
            @click.exact="pickEmoji($event)"
            ref="emojiPicker"
            class=" text-grey-500 "
          >
            <icon class="" size="lg" name="smile" />
          </span>

          <textarea
            :value="value"
            ref="chatArea"
            @change="emitValue($event)"
            @input="
              emitValue($event);
              resize();
            "
            @keydown.enter.exact="emitEnter"
            placeholder="Type your comment"
            class="text-bold text-grey-500 w-100 m-2"
            type="text"
          >
          </textarea>
        </div>
      </div>
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
      value: ""
    };
  },
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton"),
    Top: () => import("@/components/top")
  },
  watch: {
    scheduleDate: {
      handler: "watchSchedule"
    },
    value: function(newVal, oldVal) {
      if (newVal == "") {
        this.$refs.chatArea.style.height = `55px`;
      }
    }
  },
  computed: {
    categories: () => {
      const token = store.state.auth.token;
      let tags = [];
      const self = this;
      let res = axios
        .get(`${process.env.VUE_APP_API}/category/admin/list`, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          let categories = res.data.data.categories;
          categories.forEach(category => {
            // self.CategoryIds.push({category});
            tags.push(category.name);
          });
          return tags;
        })
        .catch(ex => {});
      return tags;
    },
    scheduleDate() {
      if (
        this.time.schedule.days !== undefined &&
        this.time.schedule.year !== undefined &&
        this.time.schedule.month !== undefined &&
        this.time.schedule.hour !== undefined
      ) {
        this.time.schedule.final_date =
          this.time.schedule.year +
          "-" +
          this.time.schedule.month +
          "-" +
          this.time.schedule.days +
          " " +
          this.time.schedule.hour;
        this.formData.schedule = new Date(
          this.time.schedule.final_date
        ).toISOString();

        return this.time.schedule.final_date;
      }
    },
    years: () => {
      const year = new Date().getFullYear();
      return Array.from({ length: year }, (value, index) => year + index);
    }
  },
  methods: {
    async handleSubmit(type) {
      this.formData.normal_details = this.extractContent(
        this.formData.rich_details,
        true
      );
      this.formData.category = JSON.stringify(this.formData.list_category);
      const self = this;
      switch (type) {
        case "save":
          self.buttons.isLoading = true;
          self.buttons.text1 = "Loading.....";
          self.formData.status = "save";
          break;
        case "publish":
          self.formData.status = "publish";

          self.buttons.isLoading = true;
          self.buttons.text = "Loading.....";
          break;
        default:
          break;
      }

      let res = await axios
        .post(`${process.env.VUE_APP_API}/annoucement/create`, self.formData, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "SAVE";
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "PUBLISH";
              break;
            default:
              break;
          }
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            self.$router.push({ path: "/announcements/all" });
          }, 2000);

          this.formData = {};
        })
        .catch(ex => {
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "SAVE";
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "PUBLISH";
              break;
            default:
              break;
          }
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    },
    async addTag(newTag) {
      // this.options.push(newTag);
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/category/admin/create`,
          { name: newTag },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.formData.list_category.push(newTag);
          this.formData.list_rags.push(newTag);
        })
        .catch(ex => {
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message.message
              : "An error occured")
          );
        });
    },
    watchSchedule: function() {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      let value = this.time.schedule.final_date;

      if (new Date(value) < new Date(currentDate)) {
        this.$toast.error(
          (this.error.message =
            "You can not  input a  schedule date in the past!")
        );
        this.buttons.isLoading = true;
      } else {
        this.buttons.isLoading = false;
      }
    },
    extractContent: (s, space) => {
      let span = document.createElement("span");
      span.innerHTML = s;
      if (space) {
        let children = span.querySelectorAll("*");
        for (let i = 0; i < children.length; i++) {
          if (children[i].textContent) children[i].textContent += " ";
          else children[i].innerText += " ";
        }
      }
      return [span.textContent || span.innerText]
        .toString()
        .replace(/ +/g, " ");
    },
    emitEnter(e) {
      e.preventDefault();
      this.$emit("keyup");
    },
    pickEmoji(e) {
      this.picker.togglePicker(this.$refs.emojiPicker);
    },
    emitValue(e) {
      this.$emit("input", e.target.value);
    },
    resize() {
      if (this.$refs.chatArea.value == "") {
        this.$refs.chatArea.style.height = `55px`;
      }
      let h = parseInt(this.$refs.chatArea.scrollHeight, 10);
      if (h < 150) {
        this.$refs.chatArea.style.height = `auto`;
        this.$refs.chatArea.style.height = `${this.$refs.chatArea.scrollHeight}px`;
        return;
      } else if (h > 150) {
        this.$refs.chatArea.style.height = `150px`;
      }
    }
  },
  mounted() {
    this.Announcement = this.$route.params.single_announcement;
    this.picker.on("emoji", emoji => {
      let chatArea = this.$refs.chatArea;
      let cursorPosition = chatArea.selectionEnd;
      let currentChat = chatArea.value;
      let start = currentChat.substring(0, chatArea.selectionStart);
      let end = currentChat.substring(chatArea.selectionStart);
      chatArea.value = `${start}${emoji}${end}`;
      chatArea.focus();
      this.$nextTick(() => {
        chatArea.selectionEnd = cursorPosition + emoji.length;
      });
      this.$emit("input", chatArea.value);
    });
  },
  created() {
    this.picker = new EmojiButton({
      autoHide: false,
      position: "top-start",
      showVariants: false,
      rootElement: this.$refs.emojiPicker
    });
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
.chatbox {
  width: 80%;
  border-radius: 30px;
  background-color: #f4f4f4;

  textarea {
    max-height: 28px;
    border-radius: 30px;
    resize: none;
    font-size: 14px;
    background-color: #f4f4f4;
    border: none;
    padding-top: 1rem;
    font-family: "Open sans";
    margin-left: 1.8rem;

    &:focus {
      outline: none;
    }
  }
}
</style>
