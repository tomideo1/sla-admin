<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-row no-gutters class="page-header py-4">
      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <d-form>
          <d-input
            size="lg"
            class="mb-3"
            placeholder="Announcement Title"
            v-model="formData.title"
          />
          <editor v-model="formData.rich_details" />
          <multiselect
            size="lg"
            class="mb-3"
            v-model="formData.list_category"
            placeholder="Category"
            :multiple="true"
            :taggable="true"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
            :options="categories"
          >
          </multiselect>
          <multiselect
            size="lg"
            class="mb-3"
            v-model="formData.list_tags"
            placeholder="Tags"
            :multiple="true"
            :taggable="true"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
            :options="options"
            @tag="addTag"
          >
          </multiselect>
          <p class="font-poppins text-bold" style="font-weight: bold">
            Recipients
          </p>
          <div class="form-group mt-3 mb-3 ">
            <d-select v-model="formData.recepients" class="col-md-3">
              <option selected value="everyone">To Everyone</option>
              <option value="participant">Participant</option>
              <option value="admin">Admins</option>
              <option value="coaches">Coaches</option>
            </d-select>
          </div>
        </d-form>
      </d-col>

      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <vue-dropzone
          v-model="formData.cover_image"
          :options="dropzoneOptions"
          id="dropZone"
          :useCustomSlot="true"
          class="mx-auto"
          ref="courseImage"
          :style="
            'width: 300px; height: 300px;' +
              'backgroundImage:url(' +
              formData.cover_image +
              '); ' +
              ' background-size:cover; background-position:center'
          "
        >
          <h3 class="p-2 mt-5"><icon size="lg" name="camera" /></h3>
          <div class="subtitle p-2 mt-3">Click to add cover image</div>
          <div class="subtitle p-2 text-danger">
            Image must be 300x300px
          </div>
        </vue-dropzone>

        <div class="text-center">
          <br />
          <p
            class="font-open-sans"
            style="color: #0087DB; cursor: pointer; font-size: 14px;"
            @click="scheduleModal = true"
          >
            SCHEDULE
          </p>
          <sla-button
            type="outline"
            size="md"
            :text="buttons.text1"
            class=" btn   p-3   col-md-6 m-1 "
            @click="handleSubmit('save')"
          >
          </sla-button>
          <sla-button
            type="filled"
            size="md"
            :text="buttons.text"
            class=" btn   p-3 mt-4  col-md-6  m-1"
            @click="handleSubmit('publish')"
            :disabled="buttons.isLoading"
          >
          </sla-button>
        </div>
      </d-col>
    </d-row>
    <d-modal v-if="scheduleModal" @close="scheduleModal = false" size="lg">
      <d-modal-header class="text-center">
        <d-modal-title class="font-poppings text-black">
          What time and Date do you want to Schedule?
        </d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-input-group class="justify-content-center m-2 ">
          <d-select v-model="time.schedule.days" class="col-md-2 mr-2">
            <option :value="undefined">Day:</option>
            <option :value="i" v-for="i in 31">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2" v-model="time.schedule.month">
            <option :value="undefined">Month:</option>
            <option :value="i" v-for="i in 12">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2 " v-model="time.schedule.year">
            <option :value="undefined">Year:</option>
            <option v-for="year in years" :value="year">{{ year }}</option>
          </d-select>
          <input
            class="col-md-3 form-control"
            type="time"
            v-model="time.schedule.hour"
          />
          <input type="hidden" v-model="scheduleDate" />
        </d-input-group>
      </d-modal-body>
    </d-modal>
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
        // url:' url:  'localhost',',
        url: "http://localhost:8000/api/image",
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
    SlaButton: () => import("@/components/SlaButton")
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
      if (typeof this.formData.category !== "undefined") {
        this.formData.category = this.formData.list_category.join();
      }
      if (typeof this.formData.tags !== "undefined") {
        this.formData.tags = this.formData.list_tags.join();
      }
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
      this.options.push(newTag);
      let token = store.state.auth.token;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/tag/admin/create`,
          { name: newTag },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.options.push(newTag);
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
      };
    });
    const self = this;
    axios
      .get(`${process.env.VUE_APP_API}/tag/admin/list`, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        let tags_list = res.data.data.tags;
        tags_list.forEach(tag => {
          self.options.push(tag.name);
        });
      })
      .catch(ex => {});
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
