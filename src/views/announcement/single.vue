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
        style="border:1px solid #E7E6E6; min-width: 703px; min-height: 502px; box-sizing: border-box"
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
        <div
          class="m-2"
          :style="
            'width: inherit!important; height: inherit!important;' +
              'backgroundImage:url(' +
              Announcement.cover_image +
              '); ' +
              ' background-size:cover; background-position:center'
          "
        ></div>
      </div>
      <div></div>
    </d-row>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import Multiselect from "vue-multiselect";
import store from "@/store/index";
import "quill-emoji/dist/quill-emoji.css";
import quill from "quill";
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
      CategoryIds: []
    };
  },
  components: {
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
    }
  },
  mounted() {
    this.Announcement = this.$route.params.single_announcement;
    this.$refs.courseImage.dropzone.on("addedfile", file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const self = this;
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        self.formData.cover_image = "data:image/jpg/png;base64," + encoded;
        self.Announcement.cover_image = null;
      };
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
</style>
